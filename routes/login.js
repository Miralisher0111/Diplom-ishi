const express=require('express');
const passport=require('passport')
const router=express.Router();
// Method GET
 router.get('/admins/login',(req,res,next)=>{
     res.render('login',{title: "Adminpanel"})
 })
    // Method POST
 router.post('/admins/login',(req,res,next)=>{
    
   // Pasport js bilan qo'shib nastroyka qilish kerak
   passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/admins/login',
    failureFlash: true })(req,res,next);
 })
router.get('/admins/logout',(req,res,next)=>{
   req.logout();
    req.flash('success',"Siz tizimdan muvofaqqiyatli chiqdingiz");
    res.redirect('/admins/login');
})
module.exports=router
