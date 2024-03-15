export interface SharedBlock {
    id: string
    onClick: () => void
}

export interface BlockGeneratedObject {
    name: string,
    label: string,
    control: "select" | 'input'
    options?: string[],
    value?: string,
}