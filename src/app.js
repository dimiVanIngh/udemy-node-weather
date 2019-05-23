const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const name = 'Bobby Me'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Bobby Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bobby Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Need help? RTFM',
        title: 'Help',
        name: 'Bobby me'
    })
})

app.get('/weather', ({query: {address}} = {}, res) => {
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocodeCall(address, (error, {location, forecastData} = {}) => {
        if (error) {
            return res.send({error})
        }
        res.send({
            address,
            location,
            forecastData
        })
    })
})

const geocodeCall = (address, callback) => {
    geocode(address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return callback(error, undefined)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return callback(error, undefined)
            }
            callback(undefined, {
                location,
                forecastData,
            })
        })
    })
}


app.get('/products', ({query}, res) => {
    if (!query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        name,
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        name,
        title: '404',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})