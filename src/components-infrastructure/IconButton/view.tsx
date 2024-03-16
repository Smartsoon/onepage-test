import React from "react";
import {IconButtonProps} from "./types";
import './index.scss'
import {Icons} from "../Icons";

export const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    name,
    active
}) => {
    return <div onClick={onClick} className={`icon-button ${active ? 'icon-button--active' : ''}`}>
        <Icons name={name}/>
    </div>
}