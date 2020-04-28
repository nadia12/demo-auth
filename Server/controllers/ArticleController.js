const { Article } = require('../models')

class ArticleController {
  // routes: GET http://localhost:3000/articles
  // list article milik owner/user yang sudah login
  // authentication
  static list(req, res) {
    // access_token
    console.log("article lists")
    const dataUserId = req.userData.id
    console.log(dataUserId)

    Article.findAll({
      where: {UserId: dataUserId}
    })
      .then((articles) => {
        res.status(200).json(articles)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message || 'internal error server' })
      })
  }

  // routes: POST http://localhost:3000/articles/
  // yang bisa create hanya user yang sudah login
  // authentication
  static create(req, res) {
    const { title, content } = req.body
    const dataUserId = req.userData.id

    Article.create({ title, content, UserId: dataUserId })
      .then((newArticle) => {
        res.status(201).json(newArticle)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message || 'internal error server' })
      })
  }

  // routes: DELETE http://localhost:3000/articles/:id
  // yang bisa delete hanya owner yang login
  // authentication, athorization
  static delete(req, res) {
    const { id } = req.params

    Article.destroy({
      where: { id },
    })
      .then((deletedData) => {
        if (!deletedData) throw { status: 404, message: 'Article not found!' }

        res.status(200).json({ message: 'Successfully delete article!' })
      })
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res
            .status(500)
            .json({ message: err.message || 'internal error server' })
        }
      })
  }
}

module.exports = ArticleController
