import {Alignment} from "../../types/blocks";

export interface InBoxProps {
    type: 'justify' | 'align'
    active: Alignment
    options: Alignment[]
    onChange: (value: Alignment) => void
}