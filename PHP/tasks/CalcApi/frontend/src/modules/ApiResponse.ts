import ICalcSettings from "./ICalcSettings";
import IResponseData from "./IResponseData";

export default class ApiResponse {
    /**
     * Отправляет запрос на сервер
     *
     * @param {string} uri
     * @param {boolean} isPost
     * @param {object} data
     * @returns {Promise}
     */
    static async get(uri: string, isPost: boolean = false, data: ICalcSettings): Promise<IResponseData> {
        const settings = {
            method: isPost ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data)
        };

        const fetchResponse = await fetch(uri, settings);

        return await fetchResponse.json();
    };
}

