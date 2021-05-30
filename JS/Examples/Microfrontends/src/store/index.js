export function createStore() {
  let count = 0
  const subscribers = []

  return {
    get count() {
      return count
    },
    subscribe(fn) {
      subscribers.push(fn)
    },
    increment() {
      count++
      subscribers.forEach((fn) => fn())
    },
  }
}
