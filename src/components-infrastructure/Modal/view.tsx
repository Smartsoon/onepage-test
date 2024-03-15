import React, {CSSProperties} from "react";
import {ModalProps} from "./types";
import './index.scss'
import {createPortal} from "react-dom";

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    anchorId,
    setIsModalOpen
}) => {
    const anchorElement = document.getElementById(anchorId);
    const anchorRect = anchorElement?.getBoundingClientRect();
    const modalStyle: CSSProperties  = anchorRect ? {
        position: 'absolute',
        top: `${anchorRect.top}px`,
        left: `${anchorRect.left - 320}px`,
        zIndex: 1000,
    } : {};
    function createModalRoot() {
        const newModalRoot = document.createElement('div');
        newModalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(newModalRoot);
        return newModalRoot;
    }
    const modalRoot = document.getElementById('modal-root') || createModalRoot();
    return createPortal(<div className={'modal'} style={modalStyle}>
        <div className={'modal__header'}>
            <h2>{title}</h2>
            <div onClick={() => setIsModalOpen(false)} className={'close-button'}/>
        </div>
        <div className={'modal__content'}>
            {children}
        </div>
    </div>, modalRoot)
}