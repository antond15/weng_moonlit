let API_URL;
let settings = {};

const weatherElements = {
	icon: document.getElementById('icon'),
	temp: document.getElementById('degrees'),
	desc: document.getElementById('description'),
	unit: document.getElementById('unit')
}

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
		for (const [key, property] of Object.entries(properties)) {
			if(key.startsWith('ac_')) {
				settings[key.slice(3)] = property.value || property.default;
			}
		}

		weatherElements.unit.textContent = settings.units === 'metric' ? 'C' : 'F';
		API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${settings.location}&appid=${settings.key}&units=${settings.units}&lang=${settings.language}`;

		updateWeather();
    }
};



const setWarning = () => {
	weatherElements.icon.src = './visuals/warning.png';
	weatherElements.temp.textContent = '?';
	weatherElements.desc.textContent = 'Invalid API key';
}

const fetchData = async () => {
	if(!settings.key) {
		setWarning();
		return;
	}

	const response = await fetch(API_URL);
	const data = await response.json();
	return data;
}

const updateWeather = () => {
	fetchData().then(data => {
		if(!data || data.cod === 401) {
			clearInterval(weatherInterval);
			setWarning();
			return;
		}

		const { main, weather } = data;

		weatherElements.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
		weatherElements.temp.textContent = Math.round(main.temp);
		weatherElements.desc.textContent = weather[0].description;
	})
}


const weatherInterval = setInterval(() => {
	updateWeather();
}, 600000);
