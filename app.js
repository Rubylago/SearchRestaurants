const express = require('express')
const exphbs = require('express-handlebars')
const { get, redirect } = require('express/lib/response')
const mongoose = require('mongoose')
const RestaurantSchema = require('./models/Restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
port = 3000

mongoose.connect('mongodb://localhost/restaurants-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => (
  console.log(`this app is listen to http://localhost:${port}`)
))