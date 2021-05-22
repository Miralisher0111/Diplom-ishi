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
module.exports=router
