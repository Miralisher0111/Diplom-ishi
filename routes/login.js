const express=require('express')
const router=express.Router();
// Method GET
 router.get('/admins/login',(req,res,next)=>{
     res.render('login',{title: "Adminpanel"})
 })
    // Method POST
 router.post('/admins/login',(req,res,next)=>{
    
   // Pasport js bilan qo'shib nastroyka qilish kerak
    res.redirect('/')
 })
module.exports=router
