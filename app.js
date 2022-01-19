const express = require('express')
const exphbs = require('express-handlebars')
const { get } = require('express/lib/response')
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

// const restaurants = require('./restaurant.json')

//set template engine
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//告訴 Express 靜態檔案的資料夾位置
app.use(express.static('public'))

//set body-parser
app.use(express.urlencoded({ extended: true }))

//routes setting
app.get('/', (req, res)=>{
  RestaurantSchema.find()  //取出RestaurantSchema Model所有資料
    .lean()   //轉換成乾淨陣列   
    .then(Restaurant => res.render('index', { Restaurant })) //傳給index 樣板
    .catch(error => console.log(error))

  // res.render('index', {restaurant: restaurants.results})
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  // console.log('body', req.body)
  const data = req.body
  return RestaurantSchema.create( data )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res)=>{
  // get restaurant_id
  // console.log('restaurants id:', req.params.restaurant_id)

  // const restaurant = restaurants.results.find(restaurant =>
  //   restaurant.id.toString() === req.params.restaurant_id
  // )

  const id = req.params.id
  return RestaurantSchema.findById(id)
    .lean()
    // .then(item => console.log(item,'1'))
    .then(item => res.render('show',{ item }))
    .catch(error => console.log(error))
  
  // res.render('show', { restaurant: restaurant })
})

app.get('/restaurants/:id/edit', (req, res) => {
  // console.log('restaurants id:', req.params.id)
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
  // get queryString
  // console.log('query:', req.query.keyword)

  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurants.results.filter(restaurant => 
    restaurant.name.toLowerCase().includes(keyword) ||  
    restaurant.category.toLowerCase().includes(keyword)
    )
  
  res.render('index', {restaurant: restaurant, keyword: keyword})
})

app.listen(port, ()=>(
  console.log(`this app is listen to http://localhost:${port}`)
))