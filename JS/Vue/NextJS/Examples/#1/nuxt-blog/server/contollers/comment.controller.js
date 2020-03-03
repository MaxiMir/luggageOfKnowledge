const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    const {name, text, postId} = req.body
    const comment = new Comment({name, text, postId})

    await comment.save()

    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()

    comment.save()

    req.status(201).json(comment)

    req.json()
  } catch (e) {
    req.status(500).json(e)
  }
}
