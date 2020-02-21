import IContainerData from "./IContainerData";

export default interface RenderData {
    error?: string | null,
    containersData?: IContainerData[]
}