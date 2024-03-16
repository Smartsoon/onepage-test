import React from "react";
import {InBoxProps} from "./types";
import './index.scss'
import {IconButton} from "../IconButton";

export const InBox: React.FC<InBoxProps> = ({
    onChange,
    type,
    options,
    active,
}) => {
    switch (type) {
        case "justify":
            return <div className={'in-box'}>
                {options.map(option => {
                    return <IconButton key={option}
                                       name={`${type}-${option}`}
                                       active={active === option}
                                       onClick={() => {
                                           onChange(option)
                                       }}
                    />
                })}
            </div>
        case "align":
            return <div className={'in-box'}>
                {options.map(option => {
                    return <IconButton key={option}
                                       name={`${type}-${option}`}
                                       active={active === option}
                                       onClick={() => onChange(option)}
                    />
                })}
            </div>
        default:
            return <></>
    }
}