const express=require('express');
const router=express.Router();
const Groups=require('../model/Group')
const Kafedra=require('../model/Kafedra')
router.get('/groups/:id',(req,res,next)=>{
    const parametr=req.params.id
    const promise=Groups.find({ kafedra_id:parametr});
    promise.then((groups)=>{
    const results=Kafedra.findById(parametr);
    results.then((kafedrss)=>{

        res.render('groups',{parametr,groups,kafedrss})
    })
    .catch((err)=>{
        console.log(err);
    })          
    })
    promise.catch((err)=>{
        console.log(err);
    })
})
router.post('/groups/:id',(req,res,next)=>{
   const group= new Groups({
        name:req.body.name,
        kurator:req.body.kurator,
        kafedra_id:req.params.id
    })
    const promise=group.save()
    .then(()=>{
        res.redirect(`/groups/${req.params.id}`)
    })
    .catch((err)=>{
        console.error('ma\'lumot kiritishdagi xatolik',err);
    })
    })
router.get('/groups/delete/:id_kaf/:id_group',async(req,res,next)=>{
await Groups.findByIdAndDelete(req.params.id_group,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        res.redirect(`/groups/${req.params.id_kaf}`)
    }
})
})
router.get('/groups/edit/:kaf_id/:group_id',(req,res,next)=>{
    const{kaf_id,group_id}=req.params;
    const parametr=kaf_id
    const promise=Groups.find({ kafedra_id:parametr});
    promise.then((groups)=>{
        Groups.findById(group_id,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                Kafedra.findById(parametr,(err,kafedrss)=>{
                    if(err){
                        console.log(err);
                    }
                    else{

                        res.render('groups',{istrue:true,parametr,groups,result,kafedrss})
                    }
                })

            }
        })
    })
    promise.catch((err)=>{
        console.log(err);
    })

})

router.post('/groups/edit/:id_kaf/:id_g',async(req,res,next)=>{
    const{id_kaf,id_g}=req.params
    const {name,kurator}=req.body
   await Groups.findByIdAndUpdate(id_g,{name:name,kurator:kurator},(err)=>{
       if(err){
           console.log(err);
       }
       else{
           res.redirect(`/groups/${id_kaf}`)
       }
   })
})
module.exports=router