const { Router } = require('express')
const router = Router()
const ArticleController = require('../controllers/ArticleController')
const { Article } = require('../models')
const jwt = require('jsonwebtoken')
const secretKey = 'ini terserah mau apa'

// middlewares functions
const authentication = (req, res, next) => {
  // verify access_token dari req.headers 
  console.log("middlewares authentication")
  const { access_token } = req.headers
  

  if(!access_token) {
    res.status(404).json({ message: "token not found"})
  } else {
    try {
      const decoded = jwt.verify(access_token, secretKey)
      req.userData = decoded
      next()
    } catch (err) {
      res
        .status(401)
        .json({ message: err.message || 'User not authenticate' })
    }
  }
}

// cek apakah article berdasar req.params id adalah milik user yang sudah login
const authorization = (req, res, next) => {
  const { id } = req.params
  const userId = req.userData.id
  console.log(req.userData, "SUDAH DI AUTHORIZATION")
  console.log(id, userId)

  Article.findByPk(id)
  .then(article => {
    if(!article) {
      res.status(404).json({ message: "Article not found"})
    } else if (article.UserId !== userId) {
      res.status(403).json({ message: 'Forbidden access' })
    } else {
      next()
    }
  })
  .catch(err => {
    res.status(500).json({ message: err.message || 'internal error server'})
  })
}

router.use(authentication)

router.get('/', authorization, ArticleController.list)
router.post('/',  ArticleController.create)
router.delete('/:id', authorization, ArticleController.delete)

module.exports = router
