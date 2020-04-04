const uuid = require('uuid/v4')
const fs = require('fs')

class Course {
  constructor(title, price, img) {
    this.id = uuid()
    this.title = title
    this.price = price
    this.img = img
  }

  save() {
    const courses = await Course.getAll()
    courses.push(this.toObject())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        err => {
           if (err) {
             reject(err)
           }

           resolve()
        }
      )
    })
  }


  toObject() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img
    }
  }

  static async update(course) {
    const courses = await Course.getAll()
    const idx = courses.findIndex(c => c.id === course.id)
    courses[idx] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        err => {
           if (err) {
             reject(err)
           }

           resolve()
        }
      )
    })
  }

  static async getById(id) {
    const courses = await Course.getAll()

    return courses.find(c => c.id === id)
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          }

          resolve(JSON.parse(content))
        }
      )
    })
  }
}

module.exports = Course
