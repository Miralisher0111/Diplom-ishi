const mongoose=require('mongoose');
const Schema=mongoose.Schema

const faculty=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    decan:{
        type:String,
        required:true,
        unique:true,
    },
    author:{
        type:String,
        required:true,
        default:"5fbc53d324f432d"
    }
})

module.exports=mongoose.model('facultet',faculty);