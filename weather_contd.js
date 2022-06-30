//Make API call and call helper function(s)
async function getWeather() {
	const results = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=34.10&lon=-84.51&units=imperial&appid=03e771c6b318869b74d1e4fb01657214`);
  
  //Grab JSON data from API response
  const data = await results.json();
  
  //Print out JSON
  //console.log(data);
  
  //Helper functions
  console.log(getDescription(data));
  
  console.log(getPrecipTotal(data));
  
  console.log(getHighWind(data));
}

//Run getWeather() function
window.onload = () => {getWeather()};

//Grab the current weather description
function getDescription(data) {

	//Access current weather array
  var currentWeather = data.current.weather;
  
  //Access weather description within weather array
  var description = currentWeather[0].description;
  
  //Return weather description
  return description;	
}


//Grab total precipitation from minutely
function getPrecipTotal(data){
	//Extract all precipition into array
  var precipArray = data.minutely.map(element => element.precipitation);
  
  //Sum elements of the array
  let sum = 0;
  for (const element of precipArray){
  	sum += element;
    
  }
	
  //Return sum of precipitation
	return sum;

}


//Grab all wind speeds greater than 7 mph
function getHighWind(data) {
	
  //Extract all wind speed data from daily
	var windSpeedArray = data.daily.map(element => element.wind_speed);
  
  //Filter out all wind speeds equal or less than 7
  var highWindArray = windSpeedArray.filter(element => element > 7);
  
  return highWindArray;

}



