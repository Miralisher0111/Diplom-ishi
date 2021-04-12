const express=require('express');
const Kafedra=require('../model/Kafedra')
const Faculty=require('../model/Faculty');
const router=express.Router();
router.get('/kafedra', async(req,res,next)=>{
    await Faculty.aggregate([{
        $lookup:
        {
          from:'kafedrs',
          localField: '_id',
          foreignField: 'faculty_id',
          as: 'kafedra'
        }
    }],(err,results)=>{
        if (err) {
            console.log(err);
        }
        else{
            // res.json(results)
            res.render('kafedra',{results,})
        }
    })
    
})
router.post('/kafedra',(req,res,next)=>{
    const promise=new Kafedra(req.body)
    promise.save()
    .then(()=>{
        res.redirect('/managment/admins/add')
    })
    .catch((err)=>{
        console.log(err);
    })
    
})
router.get('/kafedra/delete/:id',(req,res,next)=>{
     Kafedra.findByIdAndDelete(req.params.id,(err)=>{
         if(err){
             console.log(err);
         }
         else{
             res.redirect('/kafedra')
         }
     })
   
})
router.get('/kafedra/edit/:id',async(req,res,next)=>{
    await Faculty.aggregate([{
        $lookup:
        {
          from:'kafedrs',
          localField: '_id',
          foreignField: 'faculty_id',
          as: 'kafedra'
        }
    }],(err,results)=>{
        if (err) {
            console.log(err);
        }
        else{
            const parametr=req.params.id;
            Kafedra.findById(parametr,(err,Cafedra)=>{
                if(err){
                    console.log(err);
                }
                else{

                        Faculty.findById(Cafedra.faculty_id,(err,data)=>{
                            if (err) {
                                console.log(err);
                            }
                            else{
                                    
                                     // res.json(results)
                                    const istrue=true;
                                    res.render('kafedra',{results,istrue,parametr,Cafedra,data})
                            }
                        })
                   
                }
            })
            
        }
    })
    
})

router.post('/kafedra/edit/:id',async(req,res,next)=>{
    const {name,boss,faculty_id}=req.body;
  await Kafedra.findByIdAndUpdate(req.params.id,{name:name,boss:boss,faculty_id:faculty_id},(err)=>{
      if(err){
          console.log(err);
      }
      else{
          res.redirect('/kafedra')
      }
  })
    
})
module.exports=router