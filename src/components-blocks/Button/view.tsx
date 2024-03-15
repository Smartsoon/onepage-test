import React from "react";
import {ButtonProps} from "./types";
import './index.scss'
import clsx from "clsx";
import {SharedBlock} from "../../types/blocks";

export const Button: React.FC<ButtonProps & SharedBlock> = ({
    id,
    onClick,
    label = 'Button',
    align,
    size,
    justify,
    action,
}) => {
    const classNames = clsx(
        'block-button',
        `block-button__size-${size}`,
        `block-button__justify-${justify}`,
        `block-button__align-${align}`
    );
    return <a id={id} onClick={onClick} className={classNames}>
        {label}
    </a>
}