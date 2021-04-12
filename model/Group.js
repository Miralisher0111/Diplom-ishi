const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const group=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    kurator:{
        type:String,
        required:true,
        unique:true
    },
    kafedra_id:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('group',group)