const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#message-1')
const secondMessage = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    firstMessage.textContent = 'Loading...'
    secondMessage.textContent = ''

    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstMessage.textContent = data.error
            } else {
                firstMessage.textContent = data.location
                secondMessage.textContent = data.forecastData
            }
        })
    })
})