const dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

const clockElements = {
	hours: document.getElementById('hours'),
	minutes: document.getElementById('minutes'),
	day: document.getElementById('day')
}

const startTimer = (init) => {
	const date = new Date();

	clockElements.hours.textContent = fixTime(date.getHours());
	clockElements.minutes.textContent = fixTime(date.getMinutes());
	clockElements.day.textContent = dayNames[date.getDay()];

	// Update every 10 seconds to make it more precise
	if(!init) setTimeout(startTimer, 10000);
}

const fixTime = (x) => {
	return x < 10 ? `0${x}` : x
}



startTimer(true);

const calibration = setInterval(() => {
	const seconds = new Date().getSeconds();
	if(seconds % 10 === 0) {
		startTimer();
		clearInterval(calibration);
	}
}, 250)
