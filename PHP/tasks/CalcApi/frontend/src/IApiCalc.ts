import ICalcSettings from "./ICalcSettings";

export default interface IApiCalc {
    init: (settings: ICalcSettings) => void,
}