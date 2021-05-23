const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const router=express.Router();
const StudentWork=require('../model/StudentWork');
const eA=require('../middleware/middleware')


const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'public/uploads/')
   },
   filename:(req,file,cb)=>{
      cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
   }
})
const upload=multer({
   storage:storage,
   limits:{fileSize:25*1024*1024},
   fileFilter:(req,file,cb)=>{
      const extname=path.extname(file.originalname);
      if(extname!=='.doc' && extname!=='.docx' && extname!=='.pdf'  && extname!=='.ppt' && extname!=='.ppt'){
         const err=new Error('ushbu yuklanilayotgan fayl formati yaroqsiz')
         err.status=404;
         return cb(err)
      }
      else{
         cb(null,true)
      }
   }
}).single('file')



router.get(`/students/:id`,eA,(req,res,next)=>{
   var parametr=req.params.id;
   StudentWork.find({'group_id':`${parametr}`},(err,students)=>{
      if(err){
         console.log(err);
      }
      else{
         res.render('student',{parametr,students})
      }
   })
   
         
      
})
router.post(`/students/:id`,eA,upload,(req,res,next)=>{
   const id=req.params.id
   const file=req.file
   if(file.size>=2*1024*1024){
      fs.unlink(path.join(`public/uploads/`,file.filename),(err)=>{
         if(err){
            console.log(err);
         }
         
            req.flash('warning','yuklayotgan faylingiz 2 MB dan katta');
            res.redirect('back')
      })
   }
   else{
   const author=req.body.author
   const name=req.body.name
   const ball=parseInt(req.body.ball)
   const getTask=req.body.getTask
   const practice=req.body.practice
   const protection=req.body.protection
   const yearFinished=parseInt(req.body.yearFinished)
   const countApplication=parseInt(req.body.countApplication)
   const countPage=parseInt(req.body.countPage)
   const countPicture=parseInt(req.body.countPicture)
   const countTable=parseInt(req.body.countTable)
   const countSource=parseInt(req.body.countSource)
   const teacher=req.body.teacher
   const consultant=req.body.consultant
   const retsenzent=req.body.retsenzent
   const texConsultant=req.body.texConsultant
   const consultantBjd=req.body.consultantBjd

  const work=new StudentWork({
         author:author,
         name:name,
         ball:ball,
         getTask:getTask,
         practice:practice,
         protection:protection,
         yearFinished:yearFinished,
         countApplication:countApplication,
         countPage:countPage,
         countPicture:countPicture,
         countTable:countTable,
         countSource:countSource,
         teacher:teacher,
         consultant:consultant,
         retsenzent:retsenzent,
         texConsultant:texConsultant,
         consultantBjd:consultantBjd,
         file:file.filename,
         group_id:id
      })
      work.save()
      .then(()=>{
         res.redirect(`/students/${id}`)
      })
      .catch((err)=>{
         console.error('malumot yuklanmadi',err);
      })
   }
   
})
router.get('/back',(req,res,next)=>{
   
      res.redirect('back')
   
})
router.get('/students',eA,(req,res,next)=>{
   res.send('hello world')
})
router.get('/students/full/:id',(req,res,next)=>{
   StudentWork.findById(req.params.id,(err,data)=>{
      if(err){
         console.log(err);
      }
      else{
         res.render('full',{data})
      }
   })
})

router.get('/students/edit/:id',eA,async(req,res,next)=>{
   await StudentWork.findById(req.params.id,(err,data)=>{
      if(err){
         console.log(err);
      }
      else{
         function convert(params) {
            let d=new Date(params)
            let date=d.toISOString()
            let str=new String(date);
            let conv=str.substr(0,10)
            return conv
       }
       const getTask=convert(data.getTask) ;
       const practice=convert(data.practice) ;
       const protection=convert(data.protection);
       
      res.render('studentEdit',{data,getTask,practice,protection})
   }
   })
})
router.get('/students/delete/:id',(req,res,next)=>{
   StudentWork.findById(req.params.id,(err,data)=>{
      if(err){
         console.log(err);
      }
      if(data){
         fs.unlink(path.join(`public/uploads/`,data.file),(err)=>{
            if(err){
               console.log(err);
            }
            else{
               StudentWork.deleteOne(data,(err)=>{
                  if(err){
                     console.log(err);
                  }
                  else{
                     res.redirect(`back`)
                  }
               })
            }
         })
      }
   })
})
router.post('/students/edit/:id',upload,(req,res,next)=>{
   if(req.file){
      StudentWork.findById(req.params.id,(err,data)=>{
         if(err){
            console.log(err);
         }
         else{
            fs.unlink(path.join(`public/uploads`,data.file),(err)=>{
               if(err){
                  console.log(err);
               }
               else{
                  let promise=StudentWork.findByIdAndUpdate(req.params.id,{
                     name:req.body.name,
                     author:req.body.author,
                     ball:req.body.ball,
                     getTask:req.body.getTask,
                     practice:req.body.practice,
                     protection:req.body.protection,
                     yearFinished:req.body.yearFinished,
                     countApplication:req.body.countApplication,
                     countPage:req.body.countPage,
                     countPicture:req.body.countPicture,
                     countTable:req.body.countTable,
                     countSource:req.body.countSource,
                     teacher:req.body.teacher,
                     consultant:req.body.consultant,
                     retsenzent:req.body.retsenzent,
                     texConsultant:req.body.teacher,
                     consultantBjd:req.body.consultantBjd,
                     file:req.file.filename
               });
            promise.then(()=>{
               res.redirect(`/students/full/${req.params.id}`);
            })
            .catch((err)=>{
               console.log(err);
            })
               
               }
            })
         }
      }) 
   }
   else{
      
      let promise=StudentWork.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            author:req.body.author,
            ball:req.body.ball,
            getTask:req.body.getTask,
            practice:req.body.practice,
            protection:req.body.protection,
            yearFinished:req.body.yearFinished,
            countApplication:req.body.countApplication,
            countPage:req.body.countPage,
            countPicture:req.body.countPicture,
            countTable:req.body.countTable,
            countSource:req.body.countSource,
            teacher:req.body.teacher,
            consultant:req.body.consultant,
            retsenzent:req.body.retsenzent,
            texConsultant:req.body.teacher,
            consultantBjd:req.body.consultantBjd
      });
   promise.then(()=>{
      res.redirect(`/students/full/${req.params.id}`);
   })
   .catch((err)=>{
      console.log(err);
   })
      
   }
})
module.exports=router;