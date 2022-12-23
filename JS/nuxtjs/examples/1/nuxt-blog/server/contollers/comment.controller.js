const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    const { name, text, postId } = req.body
    const comment = new Comment({ name, text, postId })

    await comment.save()

    const post = await Post.findById(postId)
    post.comments.push(comment._id) // привязываем новый комментарий
    await post.save()

    res.status(201).json(comment)
  } catch (e) {
    res.status(500).json(e)
  }
}
