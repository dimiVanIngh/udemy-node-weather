const request = require('request')

function executeWeatherResponse({currently, daily}) {
    let currentDegrees = currently.temperature
    let preciperationChance = currently.precipProbability
    let summaryToday = daily.data[0].summary;
    return {
        summary: `${summaryToday} It is currently ${currentDegrees}°. There is a ${preciperationChance}% chance of rain.`,
        dailyBetween: `Daily temperatue will be between ${daily.data[0].temperatureLow}° and ${daily.data[0].temperatureHigh}°`
    }
}

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/bb363dd0f1300af05c3d3b7259c411be/${longitude},${latitude}?units=si`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find forecast. Try another search.', undefined)
        } else {
            callback(undefined,
                executeWeatherResponse(body)
            )
        }
    })
}

module.exports = forecast