const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

async function generateInterfaceDescriptions() {
    const projectFiles = await fg(["**/*.ts", "!node_modules/**"], { dot: true });

    const namedUnions = new Map();

    for (const file of projectFiles) {
        const sourceText = fs.readFileSync(file, "utf8");
        const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ESNext, true);

        ts.forEachChild(sourceFile, node => {
            if (ts.isTypeAliasDeclaration(node) && ts.isUnionTypeNode(node.type)) {
                const typeName = node.name.getText(sourceFile);
                const typeValues = node.type.types.map(typeNode => typeNode.getText(sourceFile).replace(/^"(.*)"$/, '$1'));
                namedUnions.set(typeName, typeValues);
            }
        });
    }

    const files = await fg("src/components-blocks/**/types.ts");

    for (const file of files) {
        const sourceText = fs.readFileSync(file, "utf8");
        const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ESNext, true);

        ts.forEachChild(sourceFile, node => {
            if (ts.isInterfaceDeclaration(node)) {
                const commentRanges = ts.getLeadingCommentRanges(sourceText, node.pos);

                if (commentRanges) {
                    for (const range of commentRanges) {
                        const commentText = sourceText.substring(range.pos, range.end);
                        if (commentText.includes("@entrie")) {
                            const entries = commentText.match(/@entrie\s+(\w+)/);
                            if (entries) {
                                const jsonFileName = entries[1];
                                const properties = node.members.map(member => {
                                    let label = "", control = "input";
                                    let value = undefined;
                                    const propCommentRanges = ts.getLeadingCommentRanges(sourceText, member.pos);

                                    if (propCommentRanges) {
                                        for (const range of propCommentRanges) {
                                            const commentText = sourceText.substring(range.pos, range.end);
                                            const labelMatch = commentText.match(/@propLabel\s+(.+)/);
                                            const valueMatch = commentText.match(/@defaultValue\s+(.+)/);
                                            const controlMatch = commentText.match(/@control\s+(.+)/);

                                            if (labelMatch) label = labelMatch[1].trim();
                                            if (valueMatch) value = valueMatch[1].trim();
                                            if (controlMatch) control = controlMatch[1].trim();
                                        }
                                    }

                                    let type = member.type ? member.type.getText(sourceFile) : "any";
                                    let options = null;
                                    if (type.includes("|") || namedUnions.has(type)) {
                                        options = namedUnions.has(type) ? namedUnions.get(type) : type.split("|").map(t => t.trim().replace(/'/g, "").replace(/^"(.*)"$/, '$1'));
                                    }

                                    return {
                                        name: member.name.getText(sourceFile),
                                        label,
                                        ...(options ? { options } : {}),
                                        ...(value !== undefined ? { value } : {}),
                                        control,
                                    };
                                });

                                const blocksDir = path.resolve("src/blocks");
                                if (!fs.existsSync(blocksDir)) {
                                    fs.mkdirSync(blocksDir, { recursive: true });
                                }

                                const outputPath = path.resolve(blocksDir, `${jsonFileName}.json`);
                                fs.writeFileSync(outputPath, JSON.stringify(properties, null, 2));
                                console.log(`Generated ${outputPath}`);
                            }
                        }
                    }
                }
            }
        });
    }
}

generateInterfaceDescriptions().catch(err => {
    console.error("Error generating descriptions:", err);
});