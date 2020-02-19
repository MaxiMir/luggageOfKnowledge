import IContainerData from "./IContainerData";
import IElementData from "./IElementData";

export default class ApiCalcHelper {
    /**
     * Возвращает название для контейнера с элементами
     *
     * @param {array} elements
     * @param {string} header
     * @param {int|null} checkedID
     * @returns {string}
     */
    static getContainerTitle (elements: IElementData[], header: string, checkedID: number | null): string {
        if (!checkedID) {
            return header;
        }

        const checkedElement = elements.filter(item => item.id === checkedID)[0];

        return checkedElement.title;
    };

    /**
     * Возвращает отсортированный по ключу sort массив
     *
     * @param {array} containersData
     * @returns {array}
     */
    static sortContainers(containersData: IContainerData[]): IContainerData[] {
        if (containersData.length > 1) {
            containersData.sort((a, b) => {
                return a.sort - b.sort;
            });
        }

        return containersData;
    };
}