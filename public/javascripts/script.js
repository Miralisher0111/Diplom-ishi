
// manipulation modals
const showfaculty=()=>{
  let modal=document.querySelector('.modals-bg')
  let closer=document.querySelectorAll('.close-btn')
  for(let i=0;i<closer.length;i++){
    closer[i].addEventListener('click',()=>{
      modal.classList.remove('modals-active');
    })

  }

};
showfaculty();

// end manipulation-------------------------------------------
const showkafedra=()=>{
const alert=document.querySelector('.alert')
let btn=document.querySelectorAll('.kafedrabtn')
let modal=document.querySelector('#addkafedra')
for(let i=0;i<btn.length;i++){
  btn[i].addEventListener('click',()=>{ 
    modal.classList.add('modals-active')
     alert.classList.add('d-none');
  })
}
};
showkafedra();
// show groups
 const showgroups=()=>{
   let btns=document.querySelectorAll('.btngroups');
   let modal=document.querySelector('#addgroup');
   let closer=document.querySelector('#addgroupcloser')
   btns.forEach(btn => {
     btn.addEventListener('click',()=>{
       modal.classList.add('modals-active')
     })
     closer.addEventListener('click',()=>{
       modal.classList.remove('modals-active')
     })
   });
 }
 showgroups();
 
 const showstudentwork=()=>{
   const alert=document.querySelector('.alert')
   const btn=document.querySelectorAll('#addstudentbtn');
   const modal=document.querySelector('#addstudent')
   const closer=document.querySelector('#student-closer')
   const body=document.querySelector('body')
   btn.forEach(element => {
     element.addEventListener('click',()=>{
       modal.classList.add('modals-active')
       body.classList.add('hidden')
       alert.classList.add('d-none');
   });
   closer.addEventListener('click',()=>{
     body.classList.remove('hidden')
   })
   })
 }
 showstudentwork();
//  showadmin
 const showadmin=()=>{
  const alert=document.querySelector('.alert')
   const btn=document.querySelectorAll('#add-admin-btn');
   const modal=document.querySelector('#admins-modal')
   const closer=document.querySelector('#admin-closer')
   btn.forEach(element => {
     element.addEventListener('click',()=>{
       modal.classList.add('modals-active')
      alert.classList.add('d-none'); 
   });
   closer.addEventListener('click',()=>{
    modal.classList.remove('modals-active')
   })
   })
 }
 showadmin();
//  showredactor
 const showredactor=()=>{
  const alert=document.querySelector('.alert')
   const btn=document.querySelectorAll('#redactor-btn');
   const modal=document.querySelector('#redaktor-modal')
   const closer=document.querySelector('#redactor-closer')
   btn.forEach(element => {
     element.addEventListener('click',()=>{
       modal.classList.add('modals-active')
       alert.classList.add('d-none');
   });
   closer.addEventListener('click',()=>{
    modal.classList.remove('modals-active')
   })
   })
 }
 showredactor();
// Disable form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


