import React from "react";
import {WithLabelProps} from "./types";
import './index.scss'

export const WithLabel: React.FC<WithLabelProps> = ({
    label,
    children,
}) => {
    return <div className={'with-label'}>
        <span>{label}</span>
        {children}
    </div>
}