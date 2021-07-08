#### useHover

```jsx
export const useHover = (ref) => {
	const [isHovering, setHovering] = useState(false)

	const on = () => setHovering(true)
	const off = () => setHovering(false)

	useEffect(() => {
		if (!ref.current) {
			return
		}

		const node = ref.current

		node.addEventListener('mouseenter', on)
		node.addEventListener('mousemove', on)
		node.addEventListener('mouseleave', off)

		return function () {
			node.removeEventListener('mouseenter', on)
			node.removeEventListener('mousemove', on)
			node.removeEventListener('mouseleave', off)
		}
	}, [])

	return isHovering
}
```
#### useDebounce

```jsx
import {useCallback, useRef} from "react"

export const useDebounce = (callback, delay) => {
	const timer = useRef()

	return useCallback((...args) => {
		 if (timer.current) {
			 clearTimeout(timer.current)
		 }

		 timer.current = setTimeout(() => {
			 callback(...args)
		 }, delay)
	 }, [callback, delay])
}
```

#### useScroll

```jsx
import {useEffect, useRef} from "react"

export const useScroll = (parentRef, childRef, callback) => {
    const observer = useRef()

    useEffect(() => {
        const options = {
            root: parentRef.current, // то что отслеживаем
            rootMargin: '0px',
            threshold: 0
        }

        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) { // элемент появился в зоне видимости
                console.log('intersected')
                callback()
            }
        }, options)

        observer.current.observe(childRef.current)

        return () => {
            observer.current.unobserve(childRef.current)
        }
    }, [callback])
}

// Использование:
import React, {useEffect, useRef, useState} from 'react'
import useScroll from "../hooks/useScroll"

export const List = () => {
	const [todos, setTodos] = useState([])
	const [page, setPage] = useState(1)
	const limit = 20
	const parentRef = useRef()
	const childRef = useRef()
	const intersected = useScroll(parentRef, childRef, () => fetchTodos(page, limit))

	function fetchTodos(page, limit) {
		fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
			.then(response => response.json())
			.then(json => {
				setTodos(prev => [...prev, ...json])
				setPage(prev => prev + 1)
			})
	}

	return (
		<div ref={parentRef} style={{height: '80vh', overflow: 'auto'}}>
			{todos.map(todo =>
				<div key={todo.id} style={{padding: 30, border: '2px solid black'}}>
					{todo.id}. {todo.title}
				</div>
			)}
			<div ref={childRef} style={{height: 20, background: 'green'}}/>
		</div>
	)
}
```
