const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const RestaurantSchema = require('../Restaurant')
const UserSchema = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USERS = [
  { 
    name: 'user123',
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(0,3)
  },
  {
    name: 'user456',
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(3,6)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, seed_user => {
    return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seed_user.password, salt))
        .then(hash => UserSchema.create({
          name: seed_user.name,
          email: seed_user.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          seed_user.restaurants.forEach(restaurant => {
            restaurant.userId = userId
          })
          return RestaurantSchema.create(seed_user.restaurants)
        })
  }))
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(err => console.log(err))
})
