
```tsx
type CarBrand  = 'bmw' | 'audi'

interface CarBase {
    brand: CarBrand
    year: number
}

interface BmwBase extends CarBase {
    brand: 'bmw'
    climateControl: boolean
    model: 'x5' | 'x7'
}

interface BmwX5 extends BmwBase {
    value: string
    model: 'x5'
}

interface BmwX7 extends BmwBase {
    value: number
    model: 'x7'
}

type Bmw = BmwX5 | BmwX7

interface Audi extends CarBase {
    brand: 'audi'
    conditioner?: boolean
}

type Car = Bmw | Audi
```

### Exhautive check:
```tsx
function exhaustiveCheck(param: never) {
    console.log(`Обработайте значение ${param}`)
}

function todoSmthWithCar(car: Car) {
	switch (car) {
        case 'bmw':
        // todo
        default:
            exhaustiveCheck(car) // если будут необработанные значения - TS будет ругаться
	}
}
```

### Typeguard:

```tsx
function isBmwX5(car: Car): car is BmwX5 {
    return car.brand === 'bmw' && car.model === 'x5'
}

function todoSmthWithCar(car: Car) {
    if (isBmwX5(car)) {
        // todo
    }

    // todo
}
```

### Enums object:

```tsx
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const

type ValueOf<T> = T[keyof T]

type UserRole = ValueOf<typeof UserRole> // <-> typeof UserRole[keyof typeof UserRole]

function todoSmthWithRole(role: UserRole) {
  
}

todoSmthWithRole('user') // WORKS ✨
todoSmthWithRole(UserRole.USER) // WORKS ✨
```

### Params Return Types:

```tsx
function fn(arg: string) {
  return { id: 1, value: 'value', arg }
}

type FnResult = ReturnType<typeof fn> // -> { id: number, value: string, arg: string }
type FnParams = Parameters<typeof fn> // -> [string]
```

### Conditional:

```tsx
type Data = { value: string }
type Car = { model: string }
type DataOrCar = T extends string ? Data : Car

function todo<T>(arg: T): DataOrCar<T> {
    
}

const data = todo('1') // type Data
const car = todo(1) // type Car
```

### Immutable:

```tsx
interface User {
    name: string
}

const user: User = {
    name: "Max"
}

function userFn(user: Readonly<User>) {
    user.name = '1' // error 🛑
}
```

### Deep Partial:

```tsx
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T
```

###

```tsx
import { ChangeEvent, useMemo, useState } from 'react'

interface SelectOption<T extends string> {
    name: string
    value: T
}

interface SelectProps<T extends string> {
    options?: SelectOption<T>[]
    value?: T
    onChange: (value: T) => void
}

const Select = <T extends string>({ options, value, onChange }: SelectProps<T>) => {
    const handler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value as T)
    }

    return (
        <select value={value} onChange={handler}>
            {options.map(({ name, value }) => (
                <option value={value} key={value}>{name}</option>
            ))}
        </select>
    )

}



// Usage:

enum UserRole {
    ADMIN = 'ADMIN'
    USER = 'USER'
}

const items: SelectOption<UserRole>[] = [
    { name: 'Админ', value: UserRole.ADMIN },
    { name: 'Юзер', value: UserRole.USER },
]

const App = () => {
    const [role, setRole] = useState(UserRole.ADMIN)

    return (
        <Select<UserRole>
            value={role}
            onChange={setRole}
        />
    )
}
```
