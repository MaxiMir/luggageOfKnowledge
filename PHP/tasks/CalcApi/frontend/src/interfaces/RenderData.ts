/// <reference path="IContainerData.ts" />

namespace calcApi {
    export interface RenderData {
        error?: string | null,
        containersData?: IContainerData[]
    }
}