async function getWeather(lat, lon) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=912960dad28e9193faf0444c84b73d5a`)
  const data = await response.json()
  //console.log(response)
  //console.log(data)
  //getWeatherForHour(1656522000, data)
  getWeeklyWeather(data)
}

window.onload = () => {getWeather(39.10, -84.51)}

async function getWeatherForHour(dt, data) {
	//find specific dt
	const found = data.hourly.find(element => element.dt === dt);
  //grab weather array 
  const weatherArray = found.weather
  //
  const descriptions = weatherArray.map(x => x.description);
	
	 
  
  console.log(descriptions)

}



async function getWeeklyWeather(data) {
	var weatherArray = data.daily.map(x => x.weather)
  weatherArray = weatherArray.flat()
  var descriptions = weatherArray.map(x => x.description)
  console.log(descriptions)
}
