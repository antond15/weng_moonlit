let settings = {};

const weatherElements = {
	icon: document.getElementById('icon'),
	temp: document.getElementById('temperature'),
	desc: document.getElementById('description')
}

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
		settings.key = properties.key.value;
		settings.location = properties.location.value;
		updateWeather();
    }
};



const setWarning = () => {
	weatherElements.icon.src = './visuals/warning.png';
	weatherElements.temp.textContent = '401';
	weatherElements.desc.textContent = 'Invalid API key';
}

const fetchData = async () => {
	if(!settings.key) {
		setWarning();
		return;
	}

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${settings.location || 'London'}&appid=${settings.key}&units=metric&lang=cz`;
	const response = await fetch(url);
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
		weatherElements.temp.textContent = `${Math.round(main.temp)} °C`;
		weatherElements.desc.textContent = weather[0].description;
	})
}


const weatherInterval = setInterval(() => {
	updateWeather();
}, 600000);
