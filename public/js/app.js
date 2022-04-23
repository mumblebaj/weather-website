const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

// Define labels
const Llocation = document.querySelector('#Llocation')
const Lstate = document.querySelector('#Lstate')
const Lcountry = document.querySelector('#Lcountry')
const Lweatherdesc = document.querySelector('#Lweatherdesc')
const Lcurrenttemp = document.querySelector('#Lcurrenttemp')
const Lwindspeed = document.querySelector('#Lwindspeed')
const Lwinddirection = document.querySelector('#Lwinddirection')
const Lraindata = document.querySelector('#Lraindata')
const Lhumidity = document.querySelector('#Lhumidity')
const Lvisibility = document.querySelector('#Lvisibility')
const Luvindex = document.querySelector('#Luvindex')
const Lweathericon = document.querySelector('#Lweathericon')
const Laddress = document.querySelector('#Laddress')


// Define ID's
const blocation = document.querySelector('#blocation')
const state = document.querySelector('#state')
const country = document.querySelector('#country')
const weatherdesc = document.querySelector('#weatherdesc')
const currenttemp = document.querySelector('#currenttemp')
const windspeed = document.querySelector('#windspeed')
const winddirection = document.querySelector('#winddirection')
const raindata = document.querySelector('#raindata')
const humidity = document.querySelector('#humidity')
const visibility = document.querySelector('#visibility')
const uvindex = document.querySelector('#uvindex')
const weathericon = document.querySelector('#weathericon')
const address = document.querySelector('#address')
// const weatherIcon = document.querySelector('#weathericon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    // weatherIcon.textContent = 'No Image Available'
    location.textContent = 'Loading...'
    Llocation.textContent = 'Location: '
    Lstate.textContent = 'State: '
    Lcountry.textContent = 'Country: '
    Lweatherdesc.textContent = 'Forecast: '
    Lcurrenttemp.textContent = 'Temperature: '
    Lwindspeed.textContent = 'Wind Speed: '
    Lwinddirection.textContent = 'Wind Direction: '
    Lraindata.textContent = 'Rain Forecast: '
    Lhumidity.textContent = 'Humidity: '
    Lvisibility.textContent = 'Visibility: '
    Luvindex.textContent = 'UV Index: '


    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        console.log(data)
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            // weatherIcon.textContent = data.weatherIcon
            blocation.textContent = data.location  
            state.textContent = data.region
            country.textContent = data.country
            weatherdesc.textContent = data.weatherDesc
            currenttemp.textContent = data.currentTemp
            windspeed.textContent = data.windSpeed
            winddirection.textContent = data.windDirection
            humidity.textContent = data.humidity
            visibility.textContent = data.visibility
            uvindex.textContent = data.uvIndex
            
        }
    })
})
})