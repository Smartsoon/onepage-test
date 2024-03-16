import React from 'react';
import { IconsProps } from "./types";
import { ReactComponent as JustifyCenter } from '../../assets/icons/justifyCenter.svg';
import { ReactComponent as AlignCenter } from '../../assets/icons/alignCenter.svg';
import { ReactComponent as JustifyEnd } from '../../assets/icons/right.svg';
import { ReactComponent as JustifyStart } from '../../assets/icons/left.svg';
import { ReactComponent as AlignStart } from '../../assets/icons/top.svg';
import { ReactComponent as AlignEnd } from '../../assets/icons/bottom.svg';

export const Icons: React.FC<IconsProps> = ({ name }) => {
    switch (name) {
        case 'justify-start':
            return <JustifyStart />;
        case 'justify-center':
            return <JustifyCenter />;
        case 'justify-end':
            return <JustifyEnd />;
        case 'align-start':
            return <AlignStart />;
        case 'align-center':
            return <AlignCenter />;
        case 'align-end':
            return <AlignEnd />;
        default:
            return <></>
    }
};