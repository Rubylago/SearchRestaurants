const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const { get, redirect } = require('express/lib/response')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
port = 3000

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'LetMeIn',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)

app.listen(port, () => (
  console.log(`this app is listen to http://localhost:${port}`)
))