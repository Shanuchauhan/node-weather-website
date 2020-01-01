const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/6482a51899a70d104d8ed8fde0fc3bc7/'+latitude+','+longitude;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect location services',undefined);
        }else if(response.body.error){
            callback('Forecast not available for these coordinates',undefined);
        }else{
            callback(undefined,{
                chances:response.body.daily.data[0].precipProbability,
                summary:response.body.daily.data[0].summary,
                location:response.body.timezone
            })
        }
    })

}

module.exports=forecast