const mongoose = require('mongoose')

// 載入 Restaurant Schema Model
const RestaurantSchema = require('../Restaurant')

// 載入 restaurant.jason
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurants-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

//載入restaurant.json
db.once('open', () => {
  console.log('mongodb connecting')

  RestaurantSchema.create(restaurantList)
    .then(() => {
      console.log('restaurant insert done')
    })
    .catch(error => console.log('error'))
})
