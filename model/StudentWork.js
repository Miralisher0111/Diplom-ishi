const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const studentWork=new Schema({
    // diplom ishini muallif
author:{
    type:String,
    unique:true,
    required:true
},
// nomi
name:{
    type:String,
    unique:true,
    required:true
},
// bali
ball:{
    type:Number,
    required:true
},
// topshiriq olgan vohti  (Дата выдачи:)
getTask:{
    type:Date,
    required:true
}
,
// praktikaga chiqqan vohti (Дата передзащиты:)
practice:{
    type:Date,
    required:true
},
// diplom zashita qilish sanasi (Дата защита:)
protection:{
    type:Date,
    required:true
},
// bitiruv yili
yearFinished:{
    type:Number,
    required:true
},
countApplication:{
    type:Number,
    required:true
},
countPage:{
    type:Number,
    required:true
},
countPicture:{
    type:Number,
    required:true
},
countTable:{
    type:Number,
    required:true
},
countSource:{
    type:Number,
    required:true
},
teacher:{
    type:String,
    required:true
},
consultant:{
    type:String,
    required:true
},
retsenzent:{
    type:String,
    required:true
},
texConsultant:{
    type:String,
    required:true
},
consultantBjd:{
    type:String,
    required:true
},
file:{
    type:String,
    required:true,
    unique:true
},
group_id:{
    type:mongoose.Types.ObjectId,
    required:true
}

})


module.exports=mongoose.model('studentWork',studentWork)