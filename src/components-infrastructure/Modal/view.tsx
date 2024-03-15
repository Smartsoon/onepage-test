import React, { CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './index.scss'

export const Modal: React.FC<{
    title: string;
    children: React.ReactNode;
    anchorId: string;
    setIsModalOpen: (open: boolean) => void;
}> = ({ title, children, anchorId, setIsModalOpen }) => {
    const [modalStyle, setModalStyle] = useState<CSSProperties>({});

    useEffect(() => {
        const anchorElement = document.getElementById(anchorId);
        const updateModalPosition = () => {
            const anchorRect = anchorElement?.getBoundingClientRect();
            if (anchorRect) {
                setModalStyle({
                    position: 'absolute',
                    top: `${anchorRect.top + window.scrollY - 250}px`,
                    left: `${anchorRect.left + window.scrollX - 320}px`,
                    zIndex: 1000,
                });
            }
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    updateModalPosition();
                }
            });
        });

        if (anchorElement) {
            observer.observe(anchorElement, {
                attributes: true,
                childList: true,
                subtree: true,
            });

            updateModalPosition();
        }

        return () => observer.disconnect();
    }, [anchorId]);

    function createModalRoot() {
        let modalRoot = document.getElementById('modal-root');
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', 'modal-root');
            document.body.appendChild(modalRoot);
        }
        return modalRoot;
    }

    const modalRoot = createModalRoot();

    return createPortal(
        <div className="modal" style={modalStyle}>
            <div className="modal__header">
                <h2>{title}</h2>
                <div onClick={() => setIsModalOpen(false)} className="close-button" />
            </div>
            <div className="modal__content">{children}</div>
        </div>,
        modalRoot
    );
};