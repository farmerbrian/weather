const img = document.querySelector('img');
const form = document.querySelector('form');
const searchEl = document.getElementById('search');
const toggle = document.getElementById('temp-toggle');
const apiKey = 'c715646b312c3dbc0c7e222279cd0de4';
let units = '';
const weatherObj = {
	name: '',
	feelsLike: '',
	temp: '',
	tempHigh: '',
	tempLow: '',
	conditions: '',
	icon: '',
};
let weatherData = {};

function setUnits() {
	if (toggle.checked == false) {
		units = 'imperial';
	} else {
		units = 'metric';
	}
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	weatherCall();
});

toggle.addEventListener('click', (event) => {
	setUnits();
	weatherCall();
});

async function weatherCall() {
	setUnits();
	try {
		const weatherResponse = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchEl.value}&units=${units}&APPID=${apiKey}`,
			{ mode: 'cors' }
		);
		weatherData = await weatherResponse.json();
		weatherObj.temp = parseInt(weatherData.main.temp);
		weatherObj.name = weatherData.name;
		weatherObj.feelsLike = parseInt(weatherData.main.feels_like);
		weatherObj.tempHigh = parseInt(weatherData.main.temp_max);
		weatherObj.tempLow = parseInt(weatherData.main.temp_min);
		weatherObj.conditions = weatherData.weather[0].description;
		weatherObj.icon = weatherData.weather[0].icon;
		displayWeather();
	} catch (error) {
		const container = document.getElementById('weather-container');
		container.innerHTML = 'ERROR - Please enter a valid city name.';
	}
}

function displayWeather() {
	const pName = document.getElementById('city-name');
	const pTemp = document.getElementById('feels-like-temp');
	const h3Conditions = document.getElementById('current-conditions');
	const h3CurrentTemp = document.getElementById('current-temp');
	const h3High = document.getElementById('high-temp');
	const h3Low = document.getElementById('low-temp');
	const conditionsIcon = document.getElementById('conditions-icon');

	pName.innerHTML = `${weatherObj.name}`;
	pTemp.innerHTML = `${weatherObj.feelsLike}&#176`;
	h3CurrentTemp.innerHTML = `Current Temperature: ${weatherObj.temp}&#176`;
	h3High.innerHTML = `High for the day: ${weatherObj.tempHigh}&#176`;
	h3Low.innerHTML = `Low for the day: ${weatherObj.tempLow}&#176`;
	conditionsIcon.src = `http://openweathermap.org/img/wn/${weatherObj.icon}.png`;
}

weatherCall();
