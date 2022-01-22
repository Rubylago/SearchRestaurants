const RestaurantSchema = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  RestaurantSchema.create(restaurantList)
    .then(() => {
      console.log('restaurant insert done')
    })
    .catch(error => console.log('error'))
})
