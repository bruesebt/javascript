
//Function to make the API call and store the response data and the JSON data, then calls one of the below helper functions
async function getWeather(lat, lon) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=912960dad28e9193faf0444c84b73d5a`);
  const data = await response.json();
 	//console.log(data);
 	//Uncomment the desired helper function
  //getWeatherForHour(1656522000, data)
  //getWeeklyWeather(data)
  getHighWind(data, 2.00)
}

window.onload = () => {getWeather(39.10, -84.51)};

//Returns an array of the descriptions for the weather at a particular 
//time stamp
async function getWeatherForHour(dt, data) {
	//find specific dt
	const found = data.hourly.find(element => element.dt === dt);
  //grab weather array 
  const weatherArray = found.weather
  //
  const descriptions = weatherArray.map(x => x.description);
	
  console.log(descriptions)

}


//Returns an array of the weather descriptions for the upcoming week
async function getWeeklyWeather(data) {
	var weatherArray = data.daily.map(x => x.weather)
  weatherArray = weatherArray.flat()
  var descriptions = weatherArray.map(x => x.description)
  console.log(descriptions)
}


//Returns all the days where the wind speed in above the speed given
async function getHighWind(data, speed) {

  var dailyWind = data.daily.filter(x => x.wind_speed > speed)
  var dt = dailyWind.map(x => x.dt)
  
  //Uses helper function to convert each time stamp value into meaningful date
  console.log(dt.map(x => timeConverter(x)))
  

}

//Found this useful timestamp converter on stack overflow
//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

