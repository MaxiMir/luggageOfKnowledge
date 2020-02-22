/// <reference path="IContainerData.ts" />

namespace calcApi {
    export interface IResponseData {
        isSuccess: boolean,
        data: IContainerData[],
        msg: string
    }
}