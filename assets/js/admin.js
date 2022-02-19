//multi step form wizard builder (core)
//Create by: Hassan Tafreshi
// Email: hasan.tafreshi@gmail.com
// WhiteStudio.team

let  state_check_ws_p = 1;
var currentTab_ws = 0;
let valueJson_ws_p = [];
let exportJson_ws = [];
let tabActive_ws = -1;
const proUrl_ws = `https://whitestudio.team/`
let pro_ws = false;
let stepMax_ws = 1 
let edit_emsFormBuilder = false;

let formName_ws = `EasyFormBuilder-${Math.random().toString(36).substr(2, 3)}`;
let form_ID_emsFormBuilder =0;
let highestAmount_emsFormBuilder;
let form_type_emsFormBuilder='form';
let stepNames_ws = [efb_var.text.define, efb_var.text.stepTitles, "null"];
if (localStorage.getItem("valueJson_ws_p"))localStorage.removeItem('valueJson_ws_p');



jQuery (function() {
  state_check_ws_p =Number(efb_var.check)
  pro_ws = (efb_var.pro=='1' || efb_var.pro==true) ? true : false;
  if(typeof pro_whitestudio !== 'undefined'){ pro_ws = pro_whitestudio ; }else{  pro_ws= false; }  
  if(state_check_ws_p){ add_dasboard_emsFormBuilder();}
})



//remove footer of admin
document.getElementById('wpfooter').remove();


function saveLocalStorage_emsFormBuilder() {
 
  localStorage.setItem('valueJson_ws_p', JSON.stringify(valueJson_ws_p));
  localStorage.setItem('valueJson_ws_p', JSON.stringify(valueJson_ws_p));
}


function alarm_emsFormBuilder(val) {
  return `<div class="alert alert-warning alert-dismissible fade show " role="alert" id="alarm_emsFormBuilder">
    <div class="emsFormBuilder"><i class="fas fa-exclamation-triangle faa-flash animated"></i></div>
    <strong>${efb_var.text.alert} </strong>${val}
  </div>`
}



function Link_emsFormBuilder(state) {
  let link ='https://whitestudio.team/'
  switch(state){
    case  'publishForm':
    link = "https://youtu.be/JSI-lFRA_9I";
    break;
    case  'createSampleForm':
    case  'tutorial':
      link = "https://github.com/hassantafreshi/easy-form-builder/wiki/How-to-Create-a-form-on-Easy-Form-Builder#how-to-create-your-first-form-with-easy-form-builder";
      break;
    case  'ws':
      link = link + '#proBox';
      break;
    case  'efb':
      link = "https://wordpress.org/plugins/easy-form-builder/";
      break;
    case  'wiki':
      link = link + 'documents';
    break;
  }
  window.open(link, "_blank")
}


function show_message_result_form_set_EFB(state ,m){ //V2
  const title =`
  <h4 class="title-holder efb">
     <img src="${efb_var.images.title}" class="title efb">
     ${state!=0 ?`<i class="efb bi-hand-thumbs-up title-icon mx-2"></i>${efb_var.text.done}` :`<i class="efb bi-hand-thumbs-up title-icon mx-2"></i>${efb_var.text.error}` }
  </h4>
  `;
  let content =``
if(state!=0){
  
  content=` <h3 class="efb"><b>${efb_var.text.goodJob}</b> ${state==1 ? efb_var.text.formIsBuild :efb_var.text.formUpdatedDone}</h3>
  <h5 class="mt-3 efb">${efb_var.text.shortcode}: <strong>${m}</strong></h5>
  <input type="text" class="hide-input efb" value="${m}" id="trackingCodeEfb">
  <div id="alert"></div>
  <button type="button" class="btn efb btn-primary btn-lg m-3" onclick="copyCodeEfb('trackingCodeEfb')">
      <i class="efb bi-clipboard-check mx-1"></i>${efb_var.text.copyShortcode}
  </button>
  <button type="button" class="btn efb btn-outline-pink btn-lg m-3 px-3" data-bs-toggle="modal" data-bs-target="#Output" onclick="open_whiteStudio_efb('publishForm')">
      <i class="efb bi-question mx-1"></i>${efb_var.text.help}
  </button>
  <button type="button" class="btn efb btn-outline-pink btn-lg m-3 px-3" data-bs-toggle="modal" data-bs-target="#close" onclick="location.reload(true);">
      <i class="efb bi-x mx-1"></i>${efb_var.text.close}
  </button>
  `
}else {
  content =`<h3 class="efb">${m}</h3>`
}
  
  document.getElementById('settingModalEfb-body').innerHTML=`<div class="card-body text-center efb">${title}${content}</div>`
}//END show_message_result_form_set_EFB

console.info('Easy Form Builder > WhiteStudio.team');


function actionSendData_emsFormBuilder(){
  data ={};
  var name = formName_Efb
  
  jQuery(function ($) {
    
    
    if (state_check_ws_p==1){
      data={
        action:"add_form_Emsfb",
        value: localStorage.getItem("valj_efb"),
        name:name,
        type:form_type_emsFormBuilder,
        nonce:efb_var.nonce
      };
    }else{
      data={
        action:"update_form_Emsfb",
        value: localStorage.getItem("valj_efb"),
        name:name,
        nonce:efb_var.nonce,
        id:form_ID_emsFormBuilder
      };
    }
    
    $.post(ajaxurl,data,function(res){
     // console.log("res",res);
      if(res.data.r=="insert"){
        if(res.data.value && res.data.success==true){
          state_check_ws_p=0;
          form_ID_emsFormBuilder=parseInt(res.data.id)
          
          show_message_result_form_set_EFB(1,res.data.value)
        }else{
           alert(res , "error")
           show_message_result_form_set_EFB(0,res.data.value ,`${efb_var.text.somethingWentWrongPleaseRefresh}, Code:400-1`)      
        }
      }else if(res.data.r=="update" || res.data.r=="updated" && res.data.success==true){
        show_message_result_form_set_EFB(2,res.data.value)
      }else{
        if(res.data.m==null || res.data.m.length>1){
          
          show_message_result_form_set_EFB(0,res.data.value ,`${efb_var.text.somethingWentWrongPleaseRefresh}, Code:400-400`)         
        }else{
          show_message_result_form_set_EFB(0,res.data.value ,`${res.data.m}, Code:400-400`)        
        }          
      }
    })
    return true;
  });

}


function fun_report_error(fun ,err){
  //v2
  
}


function close_overpage_emsFormBuilder(i) {
 document.getElementById('overpage').remove();
 
 if (i==2) demo_emsFormBuilder=false;
 

}

function getOS_emsFormBuilder() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
      valid =false

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
    valid=true;
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return valid;
}


function add_dasboard_emsFormBuilder(){
  //v2
  const boxs=[
              {id:'form', title:efb_var.text.newForm, desc:efb_var.text.createBlankMultistepsForm, status:true, icon:'bi-check2-square'},
              {id:'contact', title:efb_var.text.contactusForm, desc:efb_var.text.createContactusForm, status:true, icon:'bi-envelope'},
              {id:'register', title:efb_var.text.registerForm, desc:efb_var.text.createRegistrationForm, status:true, icon:'bi-person-plus'},
              {id:'login', title:efb_var.text.loginForm, desc:efb_var.text.createLoginForm, status:true, icon:'bi-box-arrow-in-right'},
              {id:'subscription', title:efb_var.text.subscriptionForm, desc:efb_var.text.createnewsletterForm, status:true, icon:'bi-bell'},
              {id:'support', title:efb_var.text.supportForm, desc:efb_var.text.createSupportForm, status:true, icon:'bi-shield-check'},
              {id:'survey', title:efb_var.text.survey, desc:efb_var.text.createsurveyForm, status:true, icon:'bi-bar-chart-line'},
             /*  {id:'reservation', title:efb_var.text.reservation, desc:efb_var.text.createReservationyForm, status:false, icon:'bi-calendar-check'}, */
              ]
        let value=`<!-- boxs -->`;
        for(let i of boxs){
          
          value += `
          <div class="col ${efb_var.rtl==1 ? 'rtl-text' :''}" id="${i.id}"> <div class="card efb"><div class="card-body">
         
          <h5 class="card-title efb"><i class="efb ${i.icon} mx-1"></i>${i.title} </h5>
          <p class="card-text efb float-start mt-3">${i.desc}</p>
          ${i.status==true ? `<button type="button" id="${i.id}" class="btn efb btn-primary btn-lg float-end emsFormBuilder efbCreateNewForm"><i class="efb bi-plus-circle mx-1"></i>${efb_var.text.create}</button>` : `<button type="button" id="${i.id}" class="btn efb btn-primary btn-lg float-end disabled" disabled><i class="efb bi-lock mx-2"></i>${efb_var.text.availableSoon}</button>`}
          </div></div></div>`
        }
        
       document.getElementById('tab_container').innerHTML = `

          ${head_introduce_efb('create')}
            <section id="content-efb">
            <img src="${efb_var.images.title}" class="${efb_var.rtl==1 ? "right_circle-efb" :"left_circle-efb"}">
            <h4 class="title-holder efb">
            <img src="${efb_var.images.title}" class="title efb">
            <i class="efb bi-arrow-down-circle title-icon mx-1"></i>${efb_var.text.form}
        </h4>
     <div class="container"><div class="row row-cols-1 row-cols-md-2 g-4">${value}<div class="row  my-5 col-2"></div></div></div>
     </section>`
     
     
       const newform_=document.getElementsByClassName("efbCreateNewForm")
      for(const n of newform_){
          n.addEventListener("click", (e) => {
            form_type_emsFormBuilder=n.id;
            create_form_by_type_emsfb(n.id);           
        })
      }

}



function create_form_by_type_emsfb(id){
  //v2
  const state =false;
  localStorage.removeItem('valj_efb');
  document.getElementById('header-efb').innerHTML=``;
  document.getElementById('content-efb').innerHTML=``;
  const label_align = efb_var.rtl == 1 ? 'txt-right' : 'txt-left'
  
  if(id==="form"){ 
    form_type_emsFormBuilder="form"
    formName_Efb = form_type_emsFormBuilder
  }else if(id==="contact"){ 
    //contactUs v2
    form_type_emsFormBuilder="form";
    formName_Efb = form_type_emsFormBuilder
    const json =[{"type":"form","steps":1,"formName":efb_var.text.contactUs ,"email":"","trackingCode":true,"EfbVersion":2,"button_single_text":efb_var.text.send,"button_color":"btn-primary","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-l-efb","email_to":"2jpzt59do","show_icon":true,"show_pro_bar":true,"captcha":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":true,"stateForm":false},
    {"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":efb_var.text.contactusForm,"icon":"","step":1,"amount":2,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-muted","el_text_color":"text-labelEfb","message_text_color":"text-muted","icon_color":"text-danger","visible":1},
    {"id_":"uoghulv7f","dataId":"uoghulv7f-id","type":"text","placeholder":efb_var.text.firstName,"value":"","size":"50","message":"","id":"","classes":"","name":efb_var.text.firstName,"required":true,"amount":3,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"xzdeosw2q","dataId":"xzdeosw2q-id","type":"text","placeholder":efb_var.text.lastName,"value":"","size":"50","message":"","id":"","classes":"","name":efb_var.text.lastName,"required":true,"amount":5,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"2jpzt59do","dataId":"2jpzt59do-id","type":"email","placeholder":efb_var.text.email,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.email,"required":true,"amount":6,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"dvgl7nfn0","dataId":"dvgl7nfn0-id","type":"textarea","placeholder":efb_var.text.enterYourMessage,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.message,"required":true,"amount":7,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":pro_efb}]
    
    
    localStorage.setItem('valj_efb', JSON.stringify(json))
    valj_efb =json;
  }else if(id==="register" ){
    form_type_emsFormBuilder="register";
    formName_Efb =form_type_emsFormBuilder;
   //register v2
   json =[{"type":"register","steps":1,"formName":efb_var.text.register,"email":"","trackingCode":"","EfbVersion":2,"button_single_text":efb_var.text.register,"button_color":"btn-primary","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-l-efb","email_to":"emailRegisterEFB","show_icon":true,"show_pro_bar":true,"captcha":false,"private":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":false,"stateForm":false},
   {"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":efb_var.text.registerForm,"icon":"","step":1,"amount":2,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-darkb","el_text_color":"text-labelEfb","message_text_color":"text-muted","icon_color":"text-danger","visible":1},
   {"id_":"usernameRegisterEFB","dataId":"usernameRegisterEFB-id","type":"text","placeholder":efb_var.text.username,"value":"","size":100,"message":"","id":"","classes":"","name":efb_var.text.username,"required":true,"amount":3,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"besie","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
   {"id_":"passwordRegisterEFB","dataId":"passwordRegisterEFB-id","type":"password","placeholder":efb_var.text.password,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.password,"required":true,"amount":5,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
   {"id_":"emailRegisterEFB","dataId":"emailRegisterEFB-id","type":"email","placeholder":efb_var.text.email,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.email,"required":true,"amount":9,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false}]
    valj_efb =json;
    localStorage.setItem('valj_efb', JSON.stringify(json))
  }else if(id==="login"){ 
     // login v2
     form_type_emsFormBuilder="login";
     formName_Efb =form_type_emsFormBuilder;   
     json =[{"type":"login","steps":1,"formName":efb_var.text.login,"email":"","trackingCode":"","EfbVersion":2,"button_single_text":efb_var.text.login,"button_color":"btn-darkb","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-l-efb","email_to":false,"show_icon":true,"show_pro_bar":true,"captcha":false,"private":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":false,"stateForm":false},
     {"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":efb_var.text.loginForm,"icon":"","step":1,"amount":1,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-darkb","el_text_color":"text-labelEfb","message_text_color":"text-dark","icon_color":"text-danger","visible":1},
     {"id_":"emaillogin","dataId":"emaillogin-id","type":"text","placeholder":efb_var.text.emailOrUsername,"value":"","size":100,"message":"","id":"","classes":"","name":efb_var.text.emailOrUsername,"required":true,"amount":3,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
     {"id_":"passwordlogin","dataId":"passwordlogin-id","type":"password","placeholder":efb_var.text.password,"value":"","size":100,"message":"","id":"","classes":"","name":efb_var.text.password,"required":true,"amount":5,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false}]
     valj_efb =json;
     
     localStorage.setItem('valj_efb', JSON.stringify(json))
  }else if(id==="support"){
    // support v2
    form_type_emsFormBuilder="form";
    formName_Efb =form_type_emsFormBuilder;
    const  json =[{"type":"form","steps":1,"formName":efb_var.text.support,"email":"","trackingCode":true,"EfbVersion":2,"button_single_text":efb_var.text.send,"button_color":"btn-primary","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-l-efb","email_to":"qas87uoct","show_icon":true,"show_pro_bar":true,"captcha":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":true,"stateForm":false},
    {"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":"Support","icon":"bi-ui-checks-grid","step":"1","amount":1,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-dark","el_text_color":"text-labelEfb","message_text_color":"text-muted","icon_color":"text-danger","visible":1},
    {"id_":"rhglopgi8","dataId":"rhglopgi8-id","type":"select","placeholder":"Select","value":"","size":"100","message":"","id":"","classes":"","name":"How can we help you?","required":true,"amount":2,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"b2xssuo2w","dataId":"b2xssuo2w-id","parent":"rhglopgi8","type":"option","value":"Accounting & Sell question","id_op":"n470h48lg","step":"1","amount":3},
    {"id_":"b2xssuo2w","dataId":"b2xssuo2w-id","parent":"rhglopgi8","type":"option","value":"Technical & support question","id_op":"zu7f5aeob","step":"1","amount":4},
    {"id_":"jv1l79ir1","dataId":"jv1l79ir1-id","parent":"rhglopgi8","type":"option","value":"General question","id_op":"jv1l79ir1","step":"1","amount":5},
    {"id_":"59c0hfpyo","dataId":"59c0hfpyo-id","type":"text","placeholder":efb_var.text.subject,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.subject,"required":0,"amount":6,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"qas87uoct","dataId":"qas87uoct-id","type":"email","placeholder":efb_var.text.email,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.email,"required":true,"amount":10,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"cqwh8eobv","dataId":"cqwh8eobv-id","type":"textarea","placeholder":efb_var.text.message,"value":"","size":"100","message":"","id":"","classes":"","name":efb_var.text.message,"required":true,"amount":8,"step":2,"corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":pro_efb}]
   localStorage.setItem('valj_efb', JSON.stringify(json))
   valj_efb =json;
  }else if(id==="subscription"){
    // if subscription has clicked add Json of contact and go to step 3
      form_type_emsFormBuilder="subscribe";
      formName_Efb = form_type_emsFormBuilder
     // const  json =[{"steps":"1","name-1":" ","formName":efb_var.text.subscribe,"EfbVersion":1.2,"type":"subscribe","icon-1":"fa fa-bell"},{"id_":"92os2cfq22","name":efb_var.text.firstName,"type":"text","step":1,"amount":1,"required":false},{"id_":"92os2cfqc","name":efb_var.text.email,"type":"email","step":1,"amount":2,"required":true}];
     const json =
     [{"type":"subscribe","steps":1,"formName":efb_var.text.subscribe,"email":"","trackingCode":"","EfbVersion":2,"button_single_text":efb_var.text.subscribe,"button_color":"btn-primary","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-d-efb","email_to":"82i3wedt1","show_icon":true,"show_pro_bar":true,"captcha":false,"private":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":false,"stateForm":false},
     {"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":"","icon":"","step":1,"amount":2,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-darkb","el_text_color":"text-labelEfb","message_text_color":"text-muted","icon_color":"text-danger","visible":1},
     {"id_":"janf5eutd","dataId":"janf5eutd-id","type":"text","placeholder":efb_var.text.name,"value":"","size":"50","message":"","id":"","classes":"","name":efb_var.text.name,"required":true,"amount":3,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":"txt-center","message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
     {"id_":"82i3wedt1","dataId":"82i3wedt1-id","type":"email","placeholder":efb_var.text.email,"value":"","size":"50","message":"","id":"","classes":"","name":efb_var.text.email,"required":true,"amount":5,"step":1,"corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-l-efb","label_align":"txt-center","message_align":"justify-content-start","el_align":"justify-content-start","pro":false}]
      localStorage.setItem('valj_efb', JSON.stringify(json))
      valj_efb =json;    
  }else if(id=="survey") {
    form_type_emsFormBuilder="survey";
    formName_Efb = form_type_emsFormBuilder
    const json =[{"type":"survey","steps":1,"formName":efb_var.text.survey,"email":"","trackingCode":"","EfbVersion":2,"button_single_text":"Submit","button_color":"btn-primary","icon":"","button_Next_text":efb_var.text.next,"button_Previous_text":efb_var.text.previous,"button_Next_icon":"bi-chevron-right","button_Previous_icon":"bi-chevron-left","button_state":"single","corner":"efb-square","label_text_color":"text-light","el_text_color":"text-light","message_text_color":"text-muted","icon_color":"text-light","el_height":"h-l-efb","email_to":false,"show_icon":true,"show_pro_bar":true,"captcha":false,"private":false,"thank_you_message":{"thankYou":efb_var.text.thanksFillingOutform, "done":efb_var.text.done, "trackingCode":efb_var.text.trackingCode, "error":efb_var.text.error,"pleaseFillInRequiredFields":efb_var.text.pleaseFillInRequiredFields },"email_temp":"","sendEmail":false,"stateForm":false},{"id_":"1","type":"step","dataId":"1","classes":"","id":"1","name":"Survey form","icon":"","step":"1","amount":1,"EfbVersion":2,"message":"","label_text_size":"fs-5","message_text_size":"default","el_text_size":"fs-5","file":"document","label_text_color":"text-darkb","el_text_color":"text-labelEfb","message_text_color":"text-muted","icon_color":"text-danger","visible":1},{"id_":"6af03cgwb","dataId":"6af03cgwb-id","type":"select","placeholder":"Select","value":"","size":100,"message":"","id":"","classes":"","name":"what is your favorite food ?","required":true,"amount":2,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"up","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"wxgt1tvri","dataId":"wxgt1tvri-id","parent":"6af03cgwb","type":"option","value":"Pasta","id_op":"n9r68xhl1","step":"1","amount":3},
    {"id_":"wxgt1tvri","dataId":"wxgt1tvri-id","parent":"6af03cgwb","type":"option","value":"Pizza","id_op":"khp0a798x","step":"1","amount":4},
    {"id_":"6x1lv1ufx","dataId":"6x1lv1ufx-id","parent":"6af03cgwb","type":"option","value":"Fish and seafood","id_op":"6x1lv1ufx","step":"1","amount":5},
    {"id_":"yythlx4tt","dataId":"yythlx4tt-id","parent":"6af03cgwb","type":"option","value":"Vegetables","id_op":"yythlx4tt","step":"1","amount":6},
    {"id_":"fe4q562zo","dataId":"fe4q562zo-id","type":"checkbox","placeholder":"Check Box","value":"","size":"50","message":"","id":"","classes":"","name":"Lnaguage","required":0,"amount":7,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},
    {"id_":"khd2i7ubz","dataId":"khd2i7ubz-id","parent":"fe4q562zo","type":"option","value":"English","id_op":"khd2i7ubz","step":"1","amount":8},{"id_":"93hao0zca","dataId":"93hao0zca-id","parent":"fe4q562zo","type":"option","value":"French","id_op":"93hao0zca","step":"1","amount":9},{"id_":"75bcbj6s1","dataId":"75bcbj6s1-id","parent":"fe4q562zo","type":"option","value":"German","id_op":"75bcbj6s1","step":"1","amount":10},{"id_":"lh1csq8mw","dataId":"lh1csq8mw-id","parent":"fe4q562zo","type":"option","value":"Russian","id_op":"lh1csq8mw","step":"1","amount":11},{"id_":"5gopt8r6b","dataId":"5gopt8r6b-id","parent":"fe4q562zo","type":"option","value":"Portuguese","id_op":"5gopt8r6b","step":"1","amount":12},{"id_":"v57zhziyi","dataId":"v57zhziyi-id","parent":"fe4q562zo","type":"option","value":"Hindi","id_op":"v57zhziyi","step":"1","amount":13},{"id_":"16suwyx5m","dataId":"16suwyx5m-id","type":"radio","placeholder":"Radio Button","value":"","size":"50","message":"","id":"","classes":"","name":"Gender","required":0,"amount":14,"step":"1","corner":"efb-square","label_text_size":"fs-6","label_position":"beside","message_text_size":"default","el_text_size":"fs-6","label_text_color":"text-labelEfb","el_border_color":"border-d","el_text_color":"text-labelEfb","message_text_color":"text-muted","el_height":"h-d-efb","label_align":label_align,"message_align":"justify-content-start","el_align":"justify-content-start","pro":false},{"id_":"ha0sfnwbp","dataId":"ha0sfnwbp-id","parent":"16suwyx5m","type":"option","value":"Male","id_op":"ha0sfnwbp","step":"1","amount":15},{"id_":"w3jpyg24h","dataId":"w3jpyg24h-id","parent":"16suwyx5m","type":"option","value":"Female","id_op":"w3jpyg24h","step":"1","amount":16},{"id_":"in4xa2y0f","dataId":"in4xa2y0f-id","parent":"16suwyx5m","type":"option","value":"Non-binary","id_op":"in4xa2y0f","step":"1","amount":17},{"id_":"1028hto5a","dataId":"1028hto5a-id","parent":"16suwyx5m","type":"option","value":"Transgender","id_op":"1028hto5a","step":"1","amount":18},{"id_":"rz3vkawya","dataId":"rz3vkawya-id","parent":"16suwyx5m","type":"option","value":"Intersex","id_op":"rz3vkawya","step":"1","amount":19},{"id_":"2oezrrpny","dataId":"2oezrrpny-id","parent":"16suwyx5m","type":"option","value":"I prefer not to say","id_op":"2oezrrpny","step":"1","amount":20}];
    valueJson_ws_p =json; 
    localStorage.setItem('valj_efb', JSON.stringify(json))
  }else if(id=="reservation"){

  }
  
    creator_form_builder_Efb();

  if(id!="form"){
    setTimeout(() => {
      editFormEfb()
    }, 100)
  }
     // add_form_builder_emsFormBuilder();
    
}



function head_introduce_efb(state){
  //v2
  const link = state=="create" ? '#form' : 'admin.php?page=Emsfb_create'
  return `     <section id="header-efb" class="efb  ${state=="create" ?'':'card col-12 bg-color'}">
  <div class="row mx-5">
              <div class="col-lg-7 mt-5 pd-5 col-md-12">
                  <img src="${efb_var.images.logo}"" class="description-logo efb">
                  <h1 class="efb pointer-efb" onClick="Link_emsFormBuilder('efb')" >${efb_var.text.easyFormBuilder}</h1>
                  <h3 class="efb pointer-efb  ${state=="create" ?'card-text ':'text-darkb'}" onClick="Link_emsFormBuilder('ws')" >${efb_var.text.byWhiteStudioTeam}</h3>
                  <div class="clearfix"></div>
                  <p class=" ${state=="create" ?'card-text ':'text-dark'} efb pb-3 fs-6">
                  ${state=="create" ? `${efb_var.text.efbIsTheUserSentence} ${efb_var.text.efbYouDontNeedAnySentence}` :`${efb_var.text.tobeginSentence}` }                                                               
                  </p>
                  <p class="text-pinkEfb efb pb-3 fs-6">
                 ${efb_var.text.warningBootStrap}                                                         
                  </p>
                  <a class="btn efb btn-primary btn-lg" href="${link}"><i class="efb bi-plus-circle mx-1"></i>${efb_var.text.createForms}</a>
                  <a class="btn mt-1 efb btn-outline-pink btn-lg" onClick="Link_emsFormBuilder('tutorial')"><i class="efb bi-info-circle mx-1"></i>${efb_var.text.tutorial}</a>
              </div>
              <div class="col-lg-5 col-md-12 "> <img src="${efb_var.images.head}" class="img-fluid"></div>
    </div>    
  </section> `
}


window.onload=(()=>{

    setTimeout(()=>{
        for (const el of document.querySelectorAll(".notice")) {
            el.remove()
        }
    },50)

    document.body.scrollTop;
})