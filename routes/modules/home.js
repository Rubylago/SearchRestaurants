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
  const keyword = req.query.keyword.toLowerCase().trim()

  // 用正則表達式.test 檢查非法字元
  if(/[~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(keyword)){   
    return
  }
  
  RestaurantSchema.find({ $or: [{name: {$regex: keyword, $options: 'i' }}, {name_en: {$regex: keyword, $options: 'i' }}, {category: {$regex: keyword, $options: 'i' }}]})
    .lean()
    .then(Restaurant => res.render('index', { Restaurant, keyword }))
    .catch(error => console.log(error))
})

module.exports = router