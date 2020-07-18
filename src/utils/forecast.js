const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url='https://api.weatherbit.io/v2.0/current?lat='+longitude+'&lon='+latitude+'&key=6702cf5bef16485f9546dc11977a573a'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to internet',undefined)
        }
        else if(response.body.error){
            callback('Unable to find the locations',undefined)
        }
        else{
            callback(undefined,response.body.data[0].temp)
        }
    })
}

module.exports=forecast