module.exports=(req,res,next)=>{
  if(req.user.role=='admin'){
      next()
  }
  else{
    req.flash('danger',"sizda bu saxifani ochish huquqi yo'q !!!");
    res.redirect('/');
  } 
}