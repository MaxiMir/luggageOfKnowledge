/// <reference path="ICalcSettings.ts" />
/// <reference path="IElementData.ts" />

namespace calcApi {
    export interface IContainerData {
        id?: number,
        title?: string,
        sort: number,
        header: string,
        table: keyof ICalcSettings,
        checkedID: number | null,
        type: 'section' | 'price',
        elements: IElementData[]
    }
}