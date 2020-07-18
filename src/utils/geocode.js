const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXNodXRvc2g2IiwiYSI6ImNrY2tyd3Y5azE5a2oycG8zZDM1MmR5MmMifQ.8Wtb6qLWYdsNW9TCRlmsoA&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect the Internet',undefined)
        }
        else if(response.body.message){
            callback('Unable to find the locations',undefined)
        }
        else{
            callback(undefined,{
                longitude:response.body.features[0].center[1],
                latitude:response.body.features[0].center[0],
            })
            
        }
    })
 }
 module.exports=geocode