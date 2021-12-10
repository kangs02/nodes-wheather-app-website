console.log('client side js fil is loaded')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
//goal:fetch weather!
/*1.setup a call to fetch to fetch weather for Boston
2.Get the parse JSON response
3.If error property,print error
-if no error property,print location and forecast
4.refresh the browser and test your work 
fetch('http://localhost:3000/Weather?address=boston').then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           console.log(data.error)
       }else{
           console.log(data.location)
           console.log(data.forecast)
       }
    })
})*/
/*const weatherform =document.querySelector('form')
const search=document.querySelector('input')
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    console.log(location)
    //console.log('testing!')
})*/
/*Goal: Use input value to get weather
1.Migrate fetch call in to the submit callback
2.use thr search text as the address query string value
3.Submit the form with a valid and invalid value to test

const weatherform =document.querySelector('form')
const search=document.querySelector('input')



weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location=search.value

    fetch('http://localhost:3000/Weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})*/
//Challenge:Render content to paragraphs
/*
1.Select the second message p from javascript
2.just before fetch,render loading message and empty p
-if erroe,render error
-if no error, render location and forecast
3.Test your work!Search for errors and for valid locations
 */
const weatherform =document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='From javascript'
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()

const location=search.value
messageOne.textContent='Loading...'
messageTwo.textContent=''
    fetch('http://localhost:3000/Weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textcontent=data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})