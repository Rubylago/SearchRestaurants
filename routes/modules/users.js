const express = require('express')
const router = express.Router()
const UserSchema = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  // login
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊表單內容
  const { name, email, password, confirmPassword } = req.body
  // 判斷是否已經註冊  
  UserSchema.findOne({ email })
    .then(user => {
      // 如果已經註冊 => 返回原本頁面並跳提醒文字
      if(user) {
        console.log('已經註冊')
        res.render('register', {
          name, email, password, confirmPassword
        })
      } else{
        // 如果還沒註冊 => User create 寫入資料庫
        return UserSchema.create({name, email, password})
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))  
})



module.exports = router