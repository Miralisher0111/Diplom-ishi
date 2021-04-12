const express = require('express');
const router = express.Router();
const Faculty=require('../model/Faculty');
const Kafedra=require('../model/Kafedra');

/* GET users listing. */
router.get('/faculty',async (req, res, next)=>{
  await Faculty.find({},(err,facultets)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('faculty',{facultets })

    }
  })

});

router.post('/faculty',(req,res,next)=>{
  const {name,decan}=req.body;
 const newfaculty=new Faculty({
   name:name,
   decan:decan,
  //  author:req.user.id  Bu yerda facultetni kim qo'shgani kelishi kerak
 }).save()
 .then(()=>{
   res.redirect('/faculty')
 })
 .catch((err)=>{
   console.error("Ma'lumot kiritilmadi",err)
 })
})

router.get('/faculty/edit/:id',(req,res,next)=>{
  Faculty.find({},(err,facultets)=>{
    if(err){
      console.log(err);
    }
    else{
      const parametr=req.params.id;
      Faculty.findById(parametr,(err,facultybyid)=>{
        if(err){
          console.log(err);
        }
        else{
          
          res.render('faculty',{facultets ,facultybyid,isTrue:true,parametr})
        }
      })

    }
  }) 
})
router.post('/faculty/edit/:id',(req,res,next)=>{
    const {name,decan}=req.body
  promise=Faculty.findByIdAndUpdate(req.params.id,{name:name,decan:decan},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/faculty')
    }
  })
    
})

router.get('/faculty/delete/:id',(req,res,next)=>{
  const promise=Faculty.findByIdAndDelete(req.params.id);
promise.then(()=>{
 Kafedra.deleteMany({faculty_id:req.params.id},(err,then)=>{
   if(err){
     console.log(err);
   }
   else{

     res.redirect('/faculty')
   }
 });
})
.catch((err)=>{
  console.log(err);
})
})

module.exports = router;
