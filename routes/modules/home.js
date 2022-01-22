const express = require('express')
const router = express.Router()
const RestaurantSchema = require('../../models/Restaurant')

router.get('/', (req, res) => {
  RestaurantSchema.find()
    .lean()
    .sort()
    .then(Restaurant => res.render('index', { Restaurant }))
    .catch(error => console.log(error))
})

router.get('/sort/:sort', (req, res) => {
  const sort = req.params.sort
 
  RestaurantSchema.find()
    .lean()
    .sort(`${sort}`)
    .then(Restaurant => res.render('index', { Restaurant }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  RestaurantSchema.find({})
    .lean()
    .then(Restaurant => {
      const filterdata = Restaurant.filter(
        data =>
        data.name.toLowerCase().includes(keyword) || 
        data.category.toLowerCase().includes(keyword)
      )
      res.render('index', { Restaurant: filterdata, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router