import IContainerData from "./IContainerData";

export default interface ResponseData {
    isSuccess: boolean,
    data: IContainerData[],
    msg: string
}