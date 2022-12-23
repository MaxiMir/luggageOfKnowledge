#### Initialization ####

```javascript
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1
}

const observer = new IntersectionObserver(cb, options)

observer.observe(elementToObserve)
```

**root**: The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the
target. Defaults to the browser viewport if not specified or if null.

**rootMargin**: This set of values serves to grow or shrink each side of the root element's bounding box before
computing intersections, the options are similar to those of margin in CSS.

**threshold**: Either a single number or an array of numbers which indicate at what percentage of the target's
visibility the observer's callback should be executed, ranges from 0 to 1.0, where 1.0 means every pixel is visible in
the viewport.
