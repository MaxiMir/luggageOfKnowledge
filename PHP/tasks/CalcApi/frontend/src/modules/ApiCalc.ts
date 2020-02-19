import ICalcSettings from "./ICalcSettings";
import ApiCalcHelper from "./ApiCalcHelper";
import ApiCalcDOM from "./ApiCalcDOM";
import ApiCalcInterface from "./ApiCalcInterface";
import ApiResponse from "./ApiResponse";

((window) => {
    const calcWidget = (<any>window).calcWidget = {} as ApiCalcInterface;

    /**
     * Инициализация калькулятора
     *
     * @param {object} settings
     */
    calcWidget.initCalc = async (settings: ICalcSettings): Promise<void> => {
        const uri: string = 'https://slim.xppx.ru/work/src/';

        const apiDOMHelper = new ApiCalcDOM();
        const {isSuccess, data, msg} = await ApiResponse.get(uri, true, settings);

        apiDOMHelper.deactivateLoader();

        if (!isSuccess) {
            apiDOMHelper.showError(msg);
        }

        const containersData = ApiCalcHelper.sortContainers(data);
        apiDOMHelper.createContainers(containersData);
    };
})(window);
