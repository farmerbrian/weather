const img = document.querySelector('img');
const form = document.querySelector('form');
const searchEl = document.getElementById('search');
const pEl = document.getElementById('log');
const apiKey = 'c715646b312c3dbc0c7e222279cd0de4';
const units = 'imperial';
const weatherObj = {
	name: '',
	feelsLike: '',
	temp: '',
	tempHigh: '',
	tempLow: '',
	conditions: '',
};
let weatherData = {};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	weatherCall();
});

async function weatherCall() {
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
	weatherObj.conditions = weatherData.weather[0].main;

	// pEl.innerHTML = `The current temperature for ${weatherData.name} is ${weatherObj.temp}&#176`;
	console.log(weatherObj);
	displayWeather();
}

function displayWeather() {
	const pName = document.getElementById('city-name');
	const pTemp = document.getElementById('feels-like-temp');
	const h3Conditions = document.getElementById('current-conditions');
	const h3CurrentTemp = document.getElementById('current-temp');
	const h3High = document.getElementById('high-temp');
	const h3Low = document.getElementById('low-temp');

	pName.innerHTML = `${weatherObj.name}`;
	pTemp.innerHTML = `${weatherObj.feelsLike}`;
	h3Conditions.innerHTML = `${weatherObj.conditions}`;
	h3CurrentTemp.innerHTML = `${weatherObj.temp}`;
	h3High.innerHTML = `${weatherObj.tempHigh}`;
	h3Low.innerHTML = `${weatherObj.tempLow}`;
}

weatherCall();

// searchEl.addEventListener('keyup', gifSearch);
// console.log(searchEl.value);

// function gifSearch() {
// 	if (!searchEl.value) {
// 		console.log('false');
// 		gifCall('loser');
// 	} else {
// 		console.log('true');
// 		gifCall(searchEl.value);
// 	}
// }

// async function gifCall(input) {
// 	const apiResponse = await fetch(
// 		`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${input}`,
// 		{ mode: 'cors' }
// 	);
// 	const apiData = await apiResponse.json();
// 	img.src = apiData.data.images.original.url;

// }
// gifSearch();
