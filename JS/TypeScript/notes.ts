// @ Generics:
type UserType = {
    firstName: string,
    lastName: string,
    age: number
}

type PhotoType = {
    large: string,
    small: string
}

type ServerResponseType<D> = {
    errorCode: number
    messages: Array<string>,
    data: D
}

const responseWithUser: ServerResponseType<UserType> = {
    errorCode: 1,
    messages: ['it', 'ts'],
    data: {
        firstName: 'Neo',
        lastName: 'Anderson',
        age: 23
    }
}

const responseWithPhoto: ServerResponseType<PhotoType> = {
    errorCode: 1,
    messages: ['it', 'ts'],
    data: {
        large: '1.jpg',
        small: '1.min.jpg'
    }
}


// @ Infer type:
type Nullable<T> = null | T

const initial = {
    age: 10,
    name: "Max",
    user: null as Nullable<UserType>,
    photo: null as Nullable<PhotoType>
}

type StateType = typeof initial // создает тип на основании initial
//type ActionsTypes = ReturnType<typeof AgeActionCreator> | ReturnType<typeof FullNameActionCreator>
type ActionsTypes = ActionReturnType<typeof AgeActionCreator> | ActionReturnType<typeof FullNameActionCreator>
type ActionReturnType<T> = T extends (...args: any[]) => infer R ? R : any
// (...args: any[]) => infer R - тип функция
// возвращаемый тип проанализировать и записать в R если это функция, иначе any

const reducer = (state: StateType = initial, action: ActionsTypes) => {
    switch (action.type) {
        case "SET-AGE":
            return {...state, age: action.age}
        case "SET-NAMES":
            return {...state, firstName: action.firstName, lastName: action.lastName}
    }

    return state
}

const AgeActionCreator = (age: number) => ({type: "SET-AGE", age} as const)
const FullNameActionCreator = (firstName, lastName) => ({type: "SET-NAMES", firstName, lastName} as const)


const obj = {
    a: {name: 'Alex'},
    b: {age: 33},
    c: {site: {title: 'ya.ru'}}
}

type objType<T> = T extends {[key: string]: infer U} ? U : never
const someObj: objType<typeof obj> = {age: 18}



// @ Conditional Types:
type ConditionalType<T> = T extends 'user' ? UserType : PhotoType

const user: ConditionalType<'user'> = { // можно и <'user' | 'photo' >
    firstName: 'Max',
    lastName: 'Mirrev',
    age: 32
}

const photo: ConditionalType<'photo'> = {
    large: '1.jpg',
    small: '1.min.jpg'
}


