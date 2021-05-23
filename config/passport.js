const bcrypt=require('bcryptjs');
const User = require('../model/Admin');
const LocalStrategy=require("passport-local").Strategy;
// const passport=require('passport')

module.exports=(passport)=>{

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username}, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Bazada bunday foydalanuvchi yo\'q.' });
        }
        else{
          bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
              throw err
            }
            if(!result){
              return done(null,false,{message:"Parol xato",})
            }
            else{
              return done(null ,user)
            }
          })
        }
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
} 