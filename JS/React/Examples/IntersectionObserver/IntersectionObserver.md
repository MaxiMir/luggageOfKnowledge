```jsx
const useElementOnScreen = (options) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const cb = (entries) => {
    const [entry] = etries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(cb, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [containerRef, options])
  
  return [containerRef, isVisible]
}

function App() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  })

  return (
    <div className="app">
      <div className="isVisible">{isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}</div>
      <div className="section"></div>
      <div className="box" ref={containerRef}>Observe me you filthy voyeur :S</div>
    </div>
  )
}
```

1. Start with a reference to the element we want to observe, use the react hook useRef.

2.Create a state variable isVisible, we are gonna use it to display a message whenever our box is in the viewport.

3. Declare a callback function that receives an array of IntersectionObserverEntries as a parameter, inside this
   function we take the first and only entry and check if is intersecting with the viewport and if it is then we call
   setIsVisible with the value of entry.isIntersecting (true/false).

4. Create the options object with the same values as the image.

5. Add the react hook useEffect and create an observer contructor using the callback function and the options we just
   created before, it's optional in our case but you can return a cleanup function to unobserve our target when the
   component unmounts.

6. Set the useRef variable on the element we want to observe.

```css
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #282c34;
}

.section {
    width: 100%;
    height: 100vh;
}

.box {
    display: flex;
    align-items: center;
    justify-content: center;
    background: cornflowerblue;
    color: rgb(32, 36, 41);
    font-weight: 900;
    font-size: 18px;
    width: 500px;
    height: 250px;
}

.isVisible {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    background: cornflowerblue;
    color: rgb(32, 36, 41);
    font-size: 20px;
    padding: 40px;
}
```

