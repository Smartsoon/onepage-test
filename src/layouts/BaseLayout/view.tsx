import React from "react";
import {BaseLayoutProp} from "./types";
import './index.scss'

export const BaseLayout: React.FC<BaseLayoutProp> = ({
    children
}) => {
    return <div className={'base-layout'}>
        {children}
    </div>
}