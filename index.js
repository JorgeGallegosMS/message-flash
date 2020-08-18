const flash = (req, res, next) => {
  req.flash = (type, message) => {
    return new Promise((resolve, reject) => {
      if (!req.session) reject('You are not using express-session')

      if (type && message) {
        const newMessage = {
          type: type,
          text: message
        }
        req.session.message = newMessage
        resolve()
      } else if (type) {
        if (type === req.session.message.type) {
          const resolved = req.session.message.text
          req.session.message = null
          resolve(resolved)
        }
        reject(`No messages with type ${type}`)
      } else {
        const resolved = req.session.message
        req.session.message = null
        resolve(resolved)
      }
    })
  }
  next()
}

exports = module.exports = flash