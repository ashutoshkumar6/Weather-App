// const { response } = require("express");
 console.log('Work')
 
// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data)
            
//         }
//     })
//  }) 


 const weather_form=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#value1')
const message2=document.querySelector('#value2')
// message1.textContent='From JS'


weather_form.addEventListener('submit',(e)=>{
       
    e.preventDefault()
    const location=search.value
    message1.textContent=''
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
           message1.textContent='Temperature of '+data.place
           message2.textContent=data.temp+' °C'
        }
    })
 }) 
 })