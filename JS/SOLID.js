// @ SINGLE RESPONSIBILITY PRINCIPLE:

class News {
  constructor(title, text) {
    this.title = title
    this.text = text
    this.modified = false
  }

  update(text) {
    this.text = text
    this.modified = true
  }
}


class NewsPrinter { // ответственность - вывод новости в определенном формате
  constructor(news) {
    this.news = news
  }

  html() {
    return `
            <div class="news">
                <h1>${this.news.title}</h1>
                <p>${this.news.text}</p>
            </div>
        `
  }

  json() {
    return JSON.stringify({
      title: this.news.title,
      text: this.news.text,
      modified: this.news.modified
    }, null, 2)
  }

  xml() {
    return `
            <news>
                <title>${this.news.title}</title>
                <text>${this.news.text}</text>
            </news>
        `
  }
}

const printer = new NewsPrinter(
  new News('JS', 'Amazing language!')
)

printer.html()
printer.json()
printer.xml()



// @ OPEN CLOSE PRINCIPLE:

class Square {
  constructor(size) {
    this.size = size
  }
}

class Circle {
  constructor(radius) {
    this.radius = radius
  }
}

class AreaCalculator {
  constructor(shapes = []) {
    this.shapes = shapes
  }

  sum() {
    return this.shapes.reduce((acc, spape) => {

    }, 0)
  }
}
