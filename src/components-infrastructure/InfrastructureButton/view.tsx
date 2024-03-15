import React from "react";
import {InfrastructureButtonProps} from "./types";
import './index.scss'

export const InfrastructureButton: React.FC<InfrastructureButtonProps> = ({
    onClick,
    label,
    variant,
    style
}) => {
    return <button style={style}
                   className={`infrastructure-button ${variant === 'danger' ? 'infrastructure-button--danger' : ''}`}
                   onClick={onClick}
    >
        {label}
    </button>
}