### Get props of elements:

```ts
type InputProps = ComponentProps<'input'>
```

### Get props of an element with ref:

```ts
type InputPropsWithRef = ComponentPropsWithRef<'input'>
```

### Get props of a component:
```jsx
import React from 'react'

interface ButtonProps {
  name: string
  onClick: () => void
}

export function Button({ name, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{name}</button>
}
```

```jsx
import React, { ComponentProps } from 'react'

interface ButtonDisabledProps extends ComponentProps<typeof Button>  {
  disabled: boolean
}

export function ButtonDisabled({ disabled, name, onClick }: ButtonDisabledProps): JSX.Element {
  return <button disabled={disabled} onClick={onClick}>{name}</button>
}
```

