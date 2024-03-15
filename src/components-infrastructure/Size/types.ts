export interface SelectProps {
    options: string[]
    active: string
    onChange: (value: string) => void
}