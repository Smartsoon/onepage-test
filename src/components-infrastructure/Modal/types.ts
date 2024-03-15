import {Dispatch, ReactNode} from "react";

export interface ModalProps {
    title: string
    children: ReactNode
    anchorId: string
    setIsModalOpen: Dispatch<boolean>
}