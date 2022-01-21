const express = require('express')
const exphbs = require('express-handlebars')
const { get, redirect } = require('express/lib/response')
const mongoose = require('mongoose')
const RestaurantSchema = require('./models/Restaurant')
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
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res)=>{
  RestaurantSchema.find()  
    .lean()    
    .sort()
    .then(Restaurant => res.render('index', { Restaurant })) 
    .catch(error => console.log(error))
})

// sort
app.get('/sort/:sort', (req, res)=>{
  const sort = req.params.sort
  // console.log('sort', sort)
 
  RestaurantSchema.find()  
    .lean()    
    .sort(`${sort}`)
    .then(Restaurant => res.render('index', { Restaurant })) 
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const data = req.body
  return RestaurantSchema.create( data )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res)=>{
  const id = req.params.id
  return RestaurantSchema.findById(id)
    .lean()
    .then(item => res.render('show',{ item }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantSchema.findById(id)
    .lean()
    .then(item => res.render('edit', { item }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const data = req.body
  return RestaurantSchema.findByIdAndUpdate(id, data)
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})

app.get('/search', (req, res)=>{
  const keyword = req.query.keyword.toLowerCase()
  RestaurantSchema.find({})
    .lean()
    .then( Restaurant => {
      const filterdata = Restaurant.filter(
        data =>
        data.name.toLowerCase().includes(keyword) ||  
        data.category.toLowerCase().includes(keyword)
      )
      res.render('index', {Restaurant: filterdata, keyword: keyword})
    })
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantSchema.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, ()=>(
  console.log(`this app is listen to http://localhost:${port}`)
))