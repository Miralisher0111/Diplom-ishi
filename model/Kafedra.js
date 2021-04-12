const mongoose=require('mongoose');
const Schema=mongoose.Schema

const kafedra=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    boss:{
        type:String,
        required:true,
        unique:true
    },
    faculty_id:{
        type:Schema.Types.ObjectId,
        required:true,
    }
})

module.exports=mongoose.model('kafedr',kafedra)