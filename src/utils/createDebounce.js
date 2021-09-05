const createDebounce = (func, wait) => {
  let timeoutId
  const clear = () => clearTimeout(timeoutId)
  const trigger = (...args) => {
    if (timeoutId !== undefined) {
      clear()
    }
    timeoutId = setTimeout(() => func(...args), wait)
  }
  return [trigger, clear]
}

export default createDebounce
