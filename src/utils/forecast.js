const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f34a0edd4d93c3dc5786f6b9a6569a6&query='+latitude+','+longitude

 /*request({ url: url, json: true }, (error, response) => {
     if (error) {
         callback('Unable to connect to weather service!',undefined)
     } else if (response.body.error) {
         callback('Unable to find location',undefined)
     } else {
         callback(undefined,response.body.current.weather_descriptions[0]+' It is currently' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + '% chance of rain.')   
     }
  })
}
*/
//destructuring
request({url, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service!',undefined)
    } else if (body.error) {
        callback('Unable to find location',undefined)
    } else {
        callback(undefined,body.current.weather_descriptions[0]+' It is currently' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + '% chance of rain.')   
    }
 })
}
module.exports = forecast