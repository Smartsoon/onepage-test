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
     * @propLabel Align
     * @control select
     * @defaultValue center
     */
    align?: 'start' | 'center' |  'end'
    /**
     * @propLabel Justify
     * @control select
     * @defaultValue center
     */
    justify?: 'start' | 'center' |  'end'
}