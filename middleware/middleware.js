module.exports=(req,res,next)=>{
    if(req.isAuthenticated()){
        
        next()
    }
    else{
        req.flash('primary',"Iltimos avval tizimga kiring !!!");
        res.redirect('/admins/login');
    }
}