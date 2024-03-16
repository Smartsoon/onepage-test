import {IconName} from "../Icons";

export interface IconButtonProps {
    name: IconName
    active?: boolean
    onClick: () => void
}