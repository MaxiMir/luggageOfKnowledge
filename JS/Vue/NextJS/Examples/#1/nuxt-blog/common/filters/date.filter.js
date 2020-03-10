export default (value, type) => {
  const date = new Date(value)

  if (type === 'time') {
    return date.toLocaleTimeString()
  }

  return date.toLocaleDateString()
}
