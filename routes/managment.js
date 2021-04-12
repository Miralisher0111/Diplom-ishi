const express=require("express");
const bcrypt=require('bcryptjs');
const router=express.Router();
const Faculty=require('../model/Faculty')
const Kafedra=require('../model/Kafedra')
const Groups=require('../model/Group');
const Admin=require('../model/Admin')

router.get('/',(req,res,next)=>{
    const promise=Faculty.find({});
    promise.catch(err=>console.log(err))
    .then((data)=>{
        const countfaculty=data.length
        const kaf=Kafedra.find({});
        kaf.catch((err)=>{
            console.log(err);
        })
        .then((kafedra)=>{
          let countkafedra=kafedra.length;
          Groups.find({},(err,data)=>{
              if(err){
                  console.log(err);
              }
              else{
                    const countgroup=data.length;
                  res.render('index', { title:"Admins", countfaculty,countkafedra,countgroup})
              }
          })
        })
    })

    //  Bu joyga hammag statistik ma'lumotlarni olib kelish kerak
})


router.get('/managment/admins/add',(req,res,next)=>{
    Faculty.find({},(err,facultets)=>{
        if(err){
            console.error("/managment/admins/add da xatolik ",err)
        }
        else{
            Kafedra.find({},'name',(err,datas)=>{
                if(err){
                    console.error('/managmen/admins/add da xatolik',err);
                }
                else{
                    res.render('managment', { title:"Admins",facultets,datas})
                }
            }).sort({"name":1})
            
        }
    })

    
})
router.post('/managment/admins/add',(req,res,next)=>{
    const{login,pswd,confirm}=req.body
    req.checkBody('login',"Surname maydonchasi to'ldirilmagan").notEmpty();
    req.checkBody('pswd',"Surname maydonchasi to'ldirilmagan").notEmpty();
    req.checkBody('confirm',"Parolnini qaytadan tasdiqlang").equals(req.body.pswd);
    
    const error=req.validationErrors()
    if(error){
      req.flash('danger',"kiritilayotgan maydonlarda xatolik bor");
      res.redirect('back')
    }
    else{
        bcrypt.hash(pswd,8,(err,hash)=>{
            if(err){
                console.log(err);
            }
          Admin.findOne({username:login,role:'admin'},'username',(err,data)=>{
              if(err){
                  console.log(err);
              }
              else{
                if(data){
                    req.flash('danger',`bazada ${login} nomli adminstrator mavjud`)
                    res.redirect('back')
                }
                else{
                    new Admin({
                        username:login,
                        pasword:hash,
                        role:'admin',
                        kafedra_id:'admin'
                    }).save()
                    .then(()=>{
                        req.flash('success',`${login} nomli admin ro'yxatdan o'tdi`)
                        res.redirect('back');
                    })
                    .catch((err)=>{
                        req.flash('danger',`ro'yxatga olish muafaqiyatsiz tugatildi`)
                        res.redirect('back');
                    })
                }
              }
              
          })
        })
    }
})
  
router.post('/managment/admins/add/publisher',(req,res,next)=>{
  const{login,pswd,confirm,kafedra_id}=req.body;
  req.checkBody('login',"Surname maydonchasi to'ldirilmagan").notEmpty();
  req.checkBody('pswd',"Surname maydonchasi to'ldirilmagan").notEmpty();
  req.checkBody('confirm',"Parolnini qaytadan tasdiqlang").equals(req.body.pswd);
  const error=req.validationErrors()
  if(error){
    req.flash('danger',"kiritilayotgan maydonlarda xatolik bor");
    res.redirect('back')
  }
  else{
      bcrypt.hash(pswd,8,(err,hash)=>{
          if(err){
              console.log(err);
          }
          else{
              Admin.findOne({username:login,role:'publisher'},'username',(err,data)=>{
                  if(err){
                      console.log(err);
                  }
                  else{
                      if(data){
                        req.flash('danger',`bazada ${login} nomli redaktor  mavjud`)
                        res.redirect('back')
                      }

                      else{
                        new Admin({
                            username:login,
                            pasword:hash,
                            role:'publisher',
                            kafedra_id:kafedra_id
                        }).save()
                        .then(()=>{
                            req.flash('success',`${login} nomli redaktor ro'yxatdan o'tdi`)
                            res.redirect('back');
                        })
                        .catch((err)=>{
                            req.flash('danger',`ro'yxatga olish muafaqiyatsiz tugatildi`)
                            res.redirect('back');
                        })
                    }
                      
                  }
              })
          }
      })
  }
 
})

module.exports=router