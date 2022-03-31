const express = require('express')
const router = express.Router()
const UserSchema = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊表單內容
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 檢查使用者輸入表單內容
  if ( !email || !password || !confirmPassword) {
    errors.push({ message: '除了名字以外其他所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 判斷是否已經註冊  
  UserSchema.findOne({ email })
    .then(user => {
      // 如果已經註冊 => 返回原本頁面並跳提醒文字
      if(user) {
        res.render('register', {
          name, email, password, confirmPassword
        })
      } else{
        // 如果還沒註冊 => 寫入資料庫
        return UserSchema.create({name, email, password})
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))  
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router