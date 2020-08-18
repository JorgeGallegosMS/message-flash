# message-flash
Adds a promise based function to the request object for flash messages. Uses [express-session]('https://www.npmjs.com/package/express-session') to store a message for one redirect cycle. 

```bash 
npm i message-flash
```

server.js

```javascript
const express = require('express')
const session = require('express-session')
const flash = require('message-flash')

const app = express()

// Set up session
app.use(session({
  secret: 'This is very secret',
  resave: false,
  saveUninitialized: true
}))

// Use the message-flash middleware
app.use(flash)

app.get('/', async (req, res) => {
  try {
    // call req.flash() with no parameters to return the current message in storage
    await req.flash() // --> {"type": "info", "message": "This is a flash message"}
  } catch (err) {
    console.error(err)
  }
})

app.get('/flash', (req, res) => {
  try {
    // Call req.flash with parameters
    // req.flash(type, message) stores the type and message in an object
    await req.flash('info', 'This is a flash message')
    res.redirect('/')
    // If you only want the message text, call req.flash() with only the type parameter
    // req.flash(type) --> 'This is a flash message'
  } catch (err) {
    console.error(err)
  }
})

app.listen(3000, () => console.log('Server running'))
```