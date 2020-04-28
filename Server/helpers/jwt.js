const jwt = require('jsonwebtoken')
const secretKey = 'ini terserah mau apa'

const generateToken = (user) => {
    return jwt.sign(
      { id: user.id, email: user.email },
      secretKey
    )
}

module.exports = {
  generateToken
}