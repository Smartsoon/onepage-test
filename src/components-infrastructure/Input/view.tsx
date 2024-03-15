import React from "react";
import {InputProps} from "./types";
import './index.scss'

export const Input: React.FC<InputProps> = ({
    onChange,
    value
}) => {
    const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange(e.target.value)
    }
    return <input className={'infrastructure-input'} type="text" value={value} onChange={onChangeValue}/>
}