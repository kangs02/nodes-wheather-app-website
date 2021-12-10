const path=require('path')
const express =require('express')
const hbs=require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
//console.log(__filename)
const app = express()
//const __dirname = path.resolve(path.dirname(''));

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)

//set up static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Kangkana Baruah'
    })
})

//app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.send('Hello express!')
})

//challenge: Set Up an about route and render a page title
/*app.get('/about',(req,res)=>{
    res.send('about page')
})*/ //html file

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Kangkana Baruah'
    })
})
/*app.get('/Weather',(req,res)=>{
    res.send({
        forecast:23,
        location: 'Assam'
    })
})*/
//Goal:update wearther endpoint to accept address
/*1.No address?Send back the error message
2.Address?send back the static JSON
-Add address property on to JSON which returns the provided address
3.Test /weather and /weather?address=Guwahti

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide the address"
        })
    }
    res.send({
        forecast:'It is showing',
        location: 'Assam',
        address:req.query.address
    })
  
})*/

//Challenge: Wire up/weather
/*1.Require geocode/forecast in to app.js
2.Use the address to geocode
3.use coordinates to get forecast
4.send back the real forecast and location
 */
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide the address"
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            //console.log(location)
            //console.log(forecastData)
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
//challenge: Create a template for help page
//1.Setup a help template to render a help message to the screen
//2.Setup the help route and render the template with an example message
//3.Visit the route in the browser and see your help message print
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'kangs',
        helppage:'this is helpful document'
    })
})
//challenge:create a partial for the footer
//1.Set up the template for the footer partial "Created by some name"
//2.render the partial at the bottom of all three pages
//3.test your work by visiting all three pages
/*app.get('/help/*',(req,res)=>{
    res.send('help article not found')
})
app.get('*',(req,res)=>{
    res.send('My 404 page')
})*/
//challenge:create and render a 404 page with handlebars
//1.Setup the template to render the header and footer
//2.setup the template to render an error message in a paragraph
//3,Render the template for both 404 routes
//  -page not found 
//  -Help article not found
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Kangkana',
        errorMessage:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Kangkana',
        errorMessage:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})