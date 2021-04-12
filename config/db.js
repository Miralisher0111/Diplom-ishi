module.exports= ()=>{
    const mongoose=require("mongoose");
    const db=mongoose.connection;
    mongoose.connect('mongodb+srv://E-commerse:xazdThE6G0gu3pit@cluster0.3od6g.mongodb.net/unversity',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
db.on("error",(err)=>{
    console.error("Bazaga ulanishdagi xatolik !!!!!!!!!!!!!",err)
})
db.on("open",()=>{
    console.log("mongodb database connected");
})
}