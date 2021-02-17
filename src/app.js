const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { request } = require('express')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Server up the main page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bernard Mumble'
    })
})

// Serve up the about page
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Bernard Mumble'
    })
})

// Serve up the help page
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is your help message!',
        title: 'Help',
        name: 'Bernard Mumble'
    })
})

// Serve up the weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
            if (error) {
            return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
              res.send({
                  forecast: forecastData,
                  location,
                  address: req.query.address
              })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorCode: 404,
        message: 'Help article not found',
        name: 'Bernard Mumble'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorCode: 404,
        message: 'Page not found',
        name: 'Bernard Mumble'
    })
})

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})