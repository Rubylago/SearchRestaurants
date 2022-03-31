const express = require('express')
const router = express.Router()
const RestaurantSchema = require('../../models/Restaurant')
const UserSchema = require('../../models/user')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body
  data.userId = req.user._id
  return RestaurantSchema.create( data )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantSchema.findOne({ _id, userId })
    .lean()
    .then(item => res.render('show',{ item }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantSchema.findOne({ _id, userId })
    .lean()
    .then(item => res.render('edit', { item }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  data.userId = req.user._id
  return RestaurantSchema.findByIdAndUpdate(id, data)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantSchema.findOne({_id, userId})
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router