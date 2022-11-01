const img = document.querySelector('img');
const form = document.querySelector('form');
const searchEl = document.getElementById('search');
const pEl = document.getElementById('log');
const apiKey = 'c715646b312c3dbc0c7e222279cd0de4';
const units = 'imperial';

form.addEventListener('submit', (event) => {
	event.preventDefault();
	weatherCall();
});

// searchEl.addEventListener('keyup', gifSearch);
// console.log(searchEl.value);

async function weatherCall() {
	const weatherResponse = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${searchEl.value}&units=${units}&APPID=${apiKey}`,
		{ mode: 'cors' }
	);
	const weatherData = await weatherResponse.json();
	console.log(weatherData);
}

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
