import {CSSProperties} from "react";

export interface InfrastructureButtonProps {
    onClick?: () => void
    label: string
    variant?: 'success' | 'danger'
    style?: CSSProperties
}