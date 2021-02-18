const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0ba47ab973de841beedfb9413084fcfa&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=m'

    request({ url, json: true }, (error, { body }) => {
   // console.log(response.body.current)
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Cannot find location!', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' outside. The humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast