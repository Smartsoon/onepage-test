import React from "react";
import {SelectProps} from "./types";
import './index.scss'

export const Select: React.FC<SelectProps> = ({
    onChange,
    options,
    active
}) => {
    return <div className={'infrastructure-select'}>
        {options.map((option) => {
            const activeClass = active === option && 'infrastructure-select__option--active'
            return <div key={option} onClick={() => onChange(option)} className={`infrastructure-select__option ${activeClass}`}>
                {option}
            </div>
        })}
    </div>
}