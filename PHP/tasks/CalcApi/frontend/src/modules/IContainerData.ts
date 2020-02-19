import ICalcSettings from "./ICalcSettings";
import IElementData from "./IElementData";

export default interface IContainerData {
    id ?: number,
    title?: string,
    sort: number,
    header: string,
    table: keyof ICalcSettings,
    checkedID: number | null,
    type: 'section' | 'price',
    elements: IElementData[]
}