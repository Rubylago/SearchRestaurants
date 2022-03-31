const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserSchema = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passReqToCallback: true }, 
    (req, email, password, done) => {
    UserSchema.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_msg', 'Wrong email'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('error_msg', 'Wrong password'))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id) 
  })
  passport.deserializeUser((id, done) => {
    UserSchema.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}