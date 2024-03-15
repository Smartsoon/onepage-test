const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

async function generateInterfaceDescriptions() {
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
                                    const propCommentRanges = ts.getLeadingCommentRanges(sourceText, member.pos);
                                    let label = "";
                                    let control = "input"; // Default control
                                    let defaultValue = undefined;
                                    let options = null;

                                    if (propCommentRanges) {
                                        for (const range of propCommentRanges) {
                                            const commentText = sourceText.substring(range.pos, range.end);
                                            const labelMatch = commentText.match(/@propLabel\s+(.+)/);
                                            const defaultValueMatch = commentText.match(/@defaultValue\s+(.+)/);
                                            const controlMatch = commentText.match(/@control\s+(.+)/);

                                            if (labelMatch) label = labelMatch[1].trim();
                                            if (defaultValueMatch) defaultValue = defaultValueMatch[1].trim();
                                            if (controlMatch) control = controlMatch[1].trim();
                                        }
                                    }

                                    let type = member.type ? member.type.getText(sourceFile) : "any";
                                    if (type.includes("|")) {
                                        options = type.split("|").map(t => t.trim().replace(/'/g, ""));
                                    }

                                    return {
                                        name: member.name.getText(sourceFile),
                                        label,
                                        ...(options ? { options } : {}),
                                        ...(defaultValue ? { value: defaultValue } : {}),
                                        control,
                                    };
                                });

                                // Убедитесь, что папка blocks существует
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