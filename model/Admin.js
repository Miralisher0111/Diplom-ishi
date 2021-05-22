const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const admin=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    kafedra_id:{
        type:String,
        required:true
    }
    
})
module.exports=mongoose.model('newadmin',admin);