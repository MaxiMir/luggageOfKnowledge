import ICalcSettings from "./ICalcSettings";

export default interface ApiCalcInterface {
    initCalc: (settings: ICalcSettings) => void,
}