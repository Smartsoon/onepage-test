export interface SharedBlock {
    id: string
    onClick: () => void
}

export interface BlockGeneratedObject {
    name: string,
    label: string,
    control: "select" | 'input' | 'inbox'
    options?: string[],
    value?: string,
}

export type Alignment = "start" | "center" | "end"