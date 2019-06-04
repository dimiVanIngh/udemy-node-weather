const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#message-1')
const secondMessage = document.querySelector('#message-2')
const thirdMessage = document.querySelector('#message-3')
const isItFriday = document.querySelector('#friday')
const notFriday = document.querySelector('#notFriday')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    firstMessage.textContent = 'Loading...'
    secondMessage.textContent = ''
    thirdMessage.textContent = ''

    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstMessage.textContent = data.error
            } else {
                firstMessage.textContent = data.location
                secondMessage.textContent = data.forecastData.summary
                thirdMessage.textContent = data.forecastData.dailyBetween
            }
        })
    })
})

new Date().getDay() === 5
    ? isItFriday.textContent = 'YepYep, TW today'
    : notFriday.textContent = 'Not yet, check again tomorrow!'