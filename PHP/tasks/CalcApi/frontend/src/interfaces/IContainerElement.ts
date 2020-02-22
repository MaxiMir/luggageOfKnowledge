namespace calcApi {
    export interface IContainerElement extends HTMLElement {
        dataset: {
            table: string,
            checkedId: string
        }
    }
}
