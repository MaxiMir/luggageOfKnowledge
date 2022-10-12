```js
import { useEffect, useState } from "react"

export function useFetch(url) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const controller = new AbortController()

        setLoading(true)
        fetch(url, { signal: controller.signal })
            .then(setData)
            .then(setError)
            .finally(() => setLoading(false))            

        return () => {
            controller.abort()
        }    
    }, [url])

    return { loading, data, error }
}
```
