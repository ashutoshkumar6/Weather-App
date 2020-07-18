const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()

//Define paths for express config.
const path_static=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partial')

//setup handlebar and view locations
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
//setup static directory to serve
app.use(express.static(path_static))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        field:'Ashu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Section',
        field:'Ashu'
    })
})

// app.get('',(req,res)=>{
//     res.send('Hello Express!!!')
// })


// app.get('/about',(req,res)=>{
//     res.send('About section')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter the address'
        })
    }
    
    geocode(req.query.address,(error,{longitude,latitude})=>{
    
        if(error)
        {
            return res.send({
                error:'Unable to find the geo-code'
            })
        }
        //console.log('Error',error)
        //console.log('Data',data)
        forecast(longitude,latitude,(error,forecast_data)=>{
            if(error){
                return res.send({
                    error:'Unable to get the request'
                })
            }
            //console.log('Error',error)
            // console.log('Data',forecast_data)
            res.send({
                place:req.query.address,
                temp: forecast_data
            })
     })
    })
  //console.log('Worked')
})



app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:'Error 404'
    })
})

app.listen(3000,()=>{
    console.log('Server is up!!!')
})