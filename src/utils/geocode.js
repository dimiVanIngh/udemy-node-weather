const request = require('request')

const geocode = (address, callback) => {
    if (!address) {
        console.log('geocode no addr')
        return callback('Please provide an address.', undefined)
    }
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZGltaS12YW4taW5naCIsImEiOiJjanZ3OGt1eTcwMThoNDNtcWxjMXMweGt6In0.T1LGd6k1JjBYYxDW98_7pg&limit=1`

    request({url, json: true}, (error, {body: {features} = {}} = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                location: features[0].place_name,
                longitude: features[0].center[0],
                latitude: features[0].center[1]
            })
        }
    })
}

module.exports = geocode