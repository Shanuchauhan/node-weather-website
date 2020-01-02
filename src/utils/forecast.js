const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/6482a51899a70d104d8ed8fde0fc3bc7/'+latitude+','+longitude;

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect location services',undefined);
        }else if(body.error){
            callback('Forecast not available for these coordinates',undefined);
        }else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+body.currently.temperature+' degrees out. This high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+' chance of rain')
        }
    })

}

module.exports=forecast