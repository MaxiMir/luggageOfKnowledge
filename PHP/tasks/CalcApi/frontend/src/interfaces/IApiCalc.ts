/// <reference path="ICalcSettings.ts" />

namespace calcApi {
    export interface IApiCalc {
        init: (settings: ICalcSettings) => void
    }
}
