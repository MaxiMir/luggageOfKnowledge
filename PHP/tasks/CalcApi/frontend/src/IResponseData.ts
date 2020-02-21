import IContainerData from "./IContainerData";

export default interface IResponseData {
    isSuccess: boolean,
    data: IContainerData[],
    msg: string
}