// require express
const express = require('express')
const app = express()
port = 3000
// require express-handlebars
const exphbs = require('express-handlebars')
// require restaurants list
const restaurants = require('./restaurant.json')

//set template engine
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//告訴 Express 靜態檔案的資料夾位置
app.use(express.static('public'))

//routes setting
app.get('/', (req, res)=>{
  res.render('index', {restaurant: restaurants.results})
})

app.get('/restaurants/:restaurant_id', (req, res)=>{
  // get restaurant_id
  // console.log('restaurants id:', req.params.restaurant_id)

  const restaurant = restaurants.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
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