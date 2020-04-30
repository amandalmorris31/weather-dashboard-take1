// {Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

// ## User Story

// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast}

//design
//NEED:
    //weather via openweathermap.org
    //key is 5bf8eae819934207415529c4c325451c

	//blocks with search feature and different cities listed on left nav 
        //div that displays today's weather of city from userinput with current data at top (temp, himidity, wind, and UV index) 
        //below that is 5 day forecast based on next 5 days
		//btn onclick to save to local storage

//code
//need to get the data of user input (city)

var city="Austin";

var apiKey="5bf8eae819934207415529c4c325451c";
var lon;
var lat;

oneday(city);

function oneday(city){
    //1. div that displays today's weather of city from userinput with current data at top (temp, humidity, wind, and UV index) 

var queryURL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
//"api.openweathermap.org/data/2.5/weather?q={city name}&appid={5bf8eae819934207415529c4c325451c}";
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
    //A. get the data (console.log it) 


  
    console.log(response);
    // (temp, 
    console.log(response.main.temp)
    //humidity,
     console.log(response.main.humidity)
    //wind, and 
    console.log(response.wind.speed)
    //UV index) 
        //lon and lat
        console.log(response.coord.lon)
        lon=response.coord.lon;
        console.log(response.coord.lat)
        lat=response.coord.lat;
        var uvURL= "http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+lat+"&lon="+lon;
        //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
        console.log(uvURL);
        
    $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(uvobj) {
        console.log(uvobj);
        console.log(uvobj.value);
          //B.dynamically create the city in front end
  
      });
        //B.dynamically create the city in front end

  });


}









    //C. dynamically create the layout of the page

    //D. append to html

//2. below that is 5 day forecast based on next 5 days

    //A. get the data (console.log it) 


    //B.dynamically create the city in front end



    //CD. dynamically create the layout of the page

    //. append to html

//3. btn onclick to save to local storage
    //A. get the data (console.log it) 


    //B.dynamically create the city in front end



    //C. dynamically create the layout of the page

    //D. append to html
