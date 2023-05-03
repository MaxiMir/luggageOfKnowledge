const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: `/${ req.file.filename }` // путь до картинки после обработки multer (/static -> /)
  })

  try {
    await post.save()
    res.status(201).json(post) // 201 - объект создан
  } catch (e) {
    res.status(500).json(e) // 500 - серверная ошибка
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }) // все посты c сортировкой по дате (вначале новые)
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Post.findById(req.params.id).populate('comments').execPopulate((error, post) => { // + получаем список комментариев
      res.json(post)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = { // обновление данных поста
    text: req.body.text
  }

  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true } // вернуть обновленный объект
    )

    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    req.json({ message: 'Пост удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  }

  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set }
    )
    res.status(204).json() // контента нет, но все успешно
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAnalytics = async (req, res) => {
  try {
    const posts = await Post.find()

    const labels = posts.map(post => post.title)

    const json = {
      comments: {
        labels,
        data: posts.data(post => post.comments.length)
      },
      views: {
        labels,
        data: posts.data(post => post.views)
      }
    }

    res.json(json)
  } catch (e) {
    res.status(500).json(e)
  }
}

