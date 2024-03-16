import {Alignment} from "../../types/blocks";

//@entrie Button
export interface ButtonProps {
    /**
     * @propLabel Label
     * @control input
     * @defaultValue Button
     */
    label?: string
    /**
     * @propLabel Action
     * @defaultValue www.google.com
     * @control input
     */
    action?: string
    /**
     * @propLabel Size
     * @control select
     * @defaultValue M
     */
    size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
    /**
     * @propLabel Justify
     * @control inbox
     * @defaultValue center
     */
    justify?: Alignment
    /**
     * @propLabel Align
     * @control inbox
     * @defaultValue center
     */
    align?: Alignment
}