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

var city="Denver";

var apiKey="5bf8eae819934207415529c4c325451c";
var lon;
var lat;


oneDay(city);

function oneDay(city){
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
    var tempNum=(((response.main.temp-273.15)*1.8)+32);
    console.log("Temperature: "+tempNum.toFixed(2)+" \u00B0"+"F");
    //https://www.w3schools.com/howto/howto_js_temperature_converter.asp
    var todayTemp="Temperature: "+tempNum.toFixed(2)+" \u00B0"+"F";
    $("#temp").text(todayTemp);



    // var todayTemp="Temperature: "+tempNum.toFixed(2)+" \u00B0"+"F";
    // console.log(todayTemp);

    //humidity,
    console.log(response.main.humidity)
    var humidity="Humidity: "+response.main.humidity+"%";
    console.log(humidity);
    $("#humidity").text(humidity);

    //wind speed, and 
    console.log(response.wind.speed)
    var windSpeed="Wind Speed: "+response.wind.speed+" MPH";
    console.log(windSpeed);
    $("#wind-speed").text(windSpeed);

    //UV index
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
      }).then(function(uvObj) {
        console.log(uvObj);
        console.log(typeof uvObj.value);

      var uvColor=determineUvColor(Math.round(uvObj.value));
      var uvIndex=(uvObj.value);
      console.log(uvIndex, uvColor);
      $("#uv-value").css("background-color",uvColor).text(uvIndex);
          //B.dynamically create the city in front end
  
      });
        //B.dynamically create the city in front end

  });


}

function determineUvColor(uvNum){
    switch(true) {
        case uvNum <= 2:
          return "green";
        case uvNum >=3 && uvNum <=7:
          return "yellow";
        case uvNum >=8 && uvNum <=10:
          return "red";
        default:
          return "purple";
      }
}

//---------------------------------------
// FIVE day function

// console.log(city);
// console.log(apiKey)



fiveDay(city);

function fiveDay(city){
    //1. div that displays 5 day forecast of city from userinput with data  (date, icon, temp, humidity) 

var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;
//"api.openweathermap.org/data/2.5/forecast?q={city name}&appid={5bf8eae819934207415529c4c325451c}";
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // <div class="col mb-2">
    //     <div class="card h-100 text-white bg-info">
    //         <div class="card-body">
    //           <h5 class="card-title">Date 1</h5>
    //           <p class="card-text">This is text. </p>
    //         </div>
    //     </div>
    // </div>
     
    // //A. get the data (console.log it) 
     //     //B.dynamically create the city in front end
    for (var i = 0; i < 5; i++) {
      var d1=$("<div>");
      //<div></div>
      d1.attr("class","col mb-2");
       //<div class="col mb-2"></div>
      
      var d2=$("<div>");
      //<div></div>
      d2.attr("class","card-body");


      var d3=$("<div>");
      //<div></div>
      d3.attr("class", "card-body");


      var h5=$("<h5>");
      //<h5></h5>


      var p=$("<p>");
      //<p></p>

      //append it together
      d1.append(d2);
      d2.append(d3);
      d3.append(h5);
      d3.append(p);

      //append via html (#fiveday)
      $("#fiveday").append(d1);

      //date
      console.log(response.list[i*8].dt_txt);
      //icon  // //the following is the icon
      console.log(response.list[i*8].weather[0].icon)
      //temp
      console.log(response.list[i*8].main.temp)
      //humidty
      console.log(response.list[i*8].main.humidity)
    }
    
   

   

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



















var d1=$("<div>");
d1.attr("class", "row col-12");

var d2=$("<div>");
d2.attr("class", "aside col-3");

var d3=$("<div>");
d3.attr("class", "section col-9");

var d4=$("<div>");
d4.attr("class", "section col-9");



//append to html
$(".container").append(d1);
$(d1).append(d2);
$(d1).append(d3);
$(d3).append(d4);
// $(d3).append(span);
// $(d3).append(textarea);
// $(d3).append(button);