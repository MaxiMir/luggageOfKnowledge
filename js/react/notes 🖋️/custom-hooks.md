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

#### useIntersectionObserver

```tsx
import { useEffect, useRef } from 'react'

/**

 root - Элемент который используется в качестве области просмотра для проверки видимости целевого элемента.
 Должен быть предком целевого элемента.
 По умолчанию используется область видимости браузера если не определён или имеет значение null.

 rootMargin - Отступы вокруг root.
 Могут иметь значения как свойство css margin: "10px 20px 30px 40px" (top, right, bottom, left).
 Значения можно задавать в процентах.
 По умолчанию все параметры установлены в нули.

 threshold - Число или массив чисел, указывающий, при каком проценте видимости целевого элемента должен сработать callback.
 Например, в этом случае callback функция будет вызываться при появлении в зоне видимости каждый 25% целевого элемента:  [0, 0.25, 0.5, 0.75, 1]
 Или 1.0 означает что функция будет вызвана при 100% пересечении объекта (за которым мы следим) с объектом root
*/

export const useIntersectionObserver = (element: Element | null, callback: () => void, options?: IntersectionObserverInit): void => {
	const observer = useRef<IntersectionObserver>()
	const { root = null, rootMargin = '0%', threshold = 0 } = options || {}

	useEffect(() => {
		const hasIOSupport = !!window.IntersectionObserver

		if (!hasIOSupport || !element) {
			return
		}

		observer.current = new IntersectionObserver(([target]) => target.isIntersecting && callback(), { threshold, root, rootMargin })
		observer.current.observe(element)

		return () => {
			observer.current?.unobserve(element)
		}
	}, [callback, element, root, rootMargin, threshold])
}

// Использование:
import React, {useEffect, useRef, useState} from 'react'
import { Card, Typography } from '../components'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const LIMIT = 20

export const List = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [page, setPage] = useState(1)
	const parentRef = useRef(null)
	const childRef = useRef(null)
	useIntersectionObserver(childRef.current, () => fetchTodos(page, LIMIT), { root: parentRef.current })

	function fetchTodos(page, limit) {
		fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
			.then((response) => response.json())
			.then((json) => {
				setTodos((prev) => [...prev, ...json])
				setPage((prev) => prev + 1)
			})
	}

	return (
		<div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
			{todos.map((todo) => (
				<Card key={todo.id} variant="outlined" style={{ backgroundColor: '#FDDB99', padding: 20 }}>
					<Typography variant="Body2-Medium">
						<b>{todo.id}. </b> {todo.title}
					</Typography>
				</Card>
			))}
			<div ref={childRef}>
				<Card variant="outlined" style={{ padding: 20, background: '#FF7A7A', color: 'white' }}>
					Долистай до меня и я дерну fetchTodos
				</Card>
			</div>
		</div>
	)
}
```

### useFocus

```tsx
import { MutableRefObject, useRef } from 'react'

export default function useFocus(): [MutableRefObject<HTMLInputElement | null>, () => void] {
	const htmlElRef = useRef<HTMLInputElement | null>(null)

	const setFocus = () => {
		const length = htmlElRef.current?.value.length || 0

		htmlElRef.current?.focus()
		htmlElRef.current?.setSelectionRange(length, length)
	}

	return [htmlElRef, setFocus]
}
```
