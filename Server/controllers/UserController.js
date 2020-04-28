const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController {
  static register(req, res) {
    const { name , email, password } = req.body

    User.create({
      name, email, password
    })
    .then(user => res.status(201).json(user))
    .catch(err => {
      res.status(500).json({
        message: err.message || 'internal error server'
      })
    })
  }

  // { access_token: 'xxx'}
  static login(req, res) {
    const { email, password } = req.body
    const errorMessage = { status: 400, message: 'Invalid Email / Password' }

    User.findOne({
      where: { email }
    })
    .then(user => {
      if(!user || !bcrypt.compareSync(password, user.password)) {
        throw errorMessage
      } 

      return user
    })
    .then(user => {
      const access_token = generateToken(user)
      res.status(200).json({ access_token })
    })
    .catch(err => {
      if(err.status) {
        res.status(err.status).json({message: err.message})
      }
      res.status(500).json({ message: err.message || 'internal error server' })
    })
  }
}

module.exports = UserController
