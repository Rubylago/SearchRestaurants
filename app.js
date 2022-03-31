const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const { get, redirect } = require('express/lib/response')

const RestaurantSchema = require('./models/Restaurant')
const methodOverride = require('method-override')
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

app.use(routes)

app.listen(port, () => (
  console.log(`this app is listen to http://localhost:${port}`)
))