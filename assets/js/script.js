const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'f13604036c0f0954195fdfe3b7961ee4';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                showError();
                return;
            }

            hideError();

            const { main, weather, wind } = json;
            const { temp, humidity } = main;

            setImage(weather[0].main);
            setTemperature(temp);
            setDescription(weather[0].description);
            setHumidity(humidity);
            setWindSpeed(wind.speed);

            showWeather();
        });
});

function showError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

function hideError() {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
}

function setImage(weatherType) {
    const image = document.querySelector('.weather-box img');
    const imagePath = {
        'Clear': '../assets/img/clear.png',
        'Rain': '../assets/img/rain.png',
        'Snow': '../assets/img/snow.png',
        'Clouds': '../assets/img/cloud.png',
        'Haze': '../assets/img/mist.png'
    };
    image.src = imagePath[weatherType] || '';
}

function setTemperature(temp) {
    const temperature = document.querySelector('.weather-box .temperature');
    temperature.innerHTML = `${parseInt(temp)}<span>°C</span>`;
}

function setDescription(description) {
    const descriptionElement = document.querySelector('.weather-box .description');
    descriptionElement.innerHTML = description;
}

function setHumidity(humidityValue) {
    const humidity = document.querySelector('.weather-details .humidity span');
    humidity.innerHTML = `${humidityValue}%`;
}

function setWindSpeed(speed) {
    const wind = document.querySelector('.weather-details .wind span');
    wind.innerHTML = `${parseInt(speed)}Km/h`;
}

function showWeather() {
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}
