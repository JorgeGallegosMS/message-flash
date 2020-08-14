const flash = (req, res, next) => {
  req.flash = (type, message) => {
    const msg = {}
    return new Promise((resolve, reject) => {
      if (type && message) {
        const message = {
          type,
          message
        }
        msg = message
        resolve()
      } else if (type) {
        if (type === msg.type) {
          resolve(msg)
        }
        reject(`No messages with type ${type}`)
      } else {
        reject()
      }
    })
  }
  next()
}

exports = flash