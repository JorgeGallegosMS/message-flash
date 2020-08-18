// Sample integration with Semantic UI. Can be used with other css libraries like bootstrap
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('../src/index')

const app = express()

const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use('/static', express.static('public'))

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
    const message = await req.flash()
    res.render('index', {message})
  } catch (err) {
    console.error(err)
  }
})

app.get('/success', async (req, res) => {
  try {
    await req.flash('success', 'This is a success message')
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
})

app.get('/info', async (req, res) => {
  try {
    await req.flash('info', 'This is an info message')
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
})

app.get('/error', async (req, res) => {
  try {
    await req.flash('error', 'This is an error message')
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
})

const port = 3000

app.listen(port, () => console.log(`Server started on port ${port}`))