var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var cityList = document.querySelector("#city-list");
var cityCountSpan = document.querySelector("#city-count");

var cities = [];

init();

function renderCities() {
  // Clear cityList element and update cityCountSpan
  cityList.innerHTML = "";
  //cityCountSpan.textContent = cities.length;

  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    cityList.appendChild(li);

    // $(li).append(button);
    // $(cityList).append(li);
    // console.log(li);
  }
}

function init() {
  // Get stored cities from localStorage
  // Parsing the JSON string to an object
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // If cities were retrieved from localStorage, update the cities array to it
  if (storedCities !== null) {
    cities = storedCities;
  }

  // Render cities to the DOM
  renderCities();
}

function storeCities() {
  // Stringify and set "cities" key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

// When form is submitted...
cityForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  // Return from function early if submitted cityText is blank
  if (cityText === "") {
    return;
  }

  // Add new cityText to cities array, clear the input
  cities.push(cityText);
  cityInput.value = "";

  // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
});

// When a element inside of the cityList is clicked
cityList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the city element from the list
    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);

    // Store updated cities in localStorage, re-render the list
    storeCities();
    renderCities();
  }
});
