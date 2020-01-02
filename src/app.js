const path=require('path')
const express=require("express")
const hbs=require('hbs')
const app=express()
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Noble Six'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me!',
        name:'Noble six'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Noble six ready to help you',
        name:'Shantanu Chauhan'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address=req.query.address;
    geocode(address,(error,data)=>{
        if(error){
            return res.send({
                error:error
            })
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }

            res.send({
                forecast:forecastData
            })
        })
    })

})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search query'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })


// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Noble Six',
        errorMessage:'Sorry but this help content isn"t made yet!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Noble Six',
        errorMessage:'Oops page not available!'
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+port);
})