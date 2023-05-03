```typescript
import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: ReactNode
}

export default function Portal({ children }: PortalProps): JSX.Element {
  const [container] = useState(() => document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}
```
