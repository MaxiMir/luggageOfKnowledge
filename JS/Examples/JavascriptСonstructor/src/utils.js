export function row(content, styles = '') {
  const style = `margin: 0; ${styles}`
  return `<div class="row" style="${style}">${content}</div>`
}

export function col(content) {
  return `<div class="col-sm">${content}</div>`
}

export function css(styles = {}) {
  const toString = key => `${key}: ${styles[key]}`
  return Object.keys(styles).map(toString).join(';')
}