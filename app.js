import { popularCities } from "./cities.js";

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be14ea28dd60391072f863726de250e1&units=metric`
  );

  const data = await response.json();

  console.log(data);

  displayWeather(data);
}


function displayWeather(data) {
  const cityNameElement = document.querySelector('.city');
  cityNameElement.textContent = data.name;

  const degreeElement = document.querySelector('.city-degree');
  degreeElement.textContent = `${Math.round(data.main.temp)}°`;

  const weatherIconElemnt = document.querySelector('.current-city-weather-icon');
  const iconCode = data.weather[0].icon;
  weatherIconElemnt.src =`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const reelFeel = document.querySelector('.air-conditions-degree');
  reelFeel.textContent = `${Math.round(data.main.feels_like)}°`;

  const wind = document.querySelector('.js-wind');
  wind.textContent = `${Math.round(data.wind.speed)} km/h`;
}

function searchCity() {
  const searchField = document.querySelector('.search-field');
  const searchResultsContainer = document.querySelector('.search-results-container');

  searchField.addEventListener('keyup', event => {
    const input = searchField.value.toLowerCase();

    if(input.length > 0) {
      const results = popularCities.filter(city => city.toLowerCase().startsWith(input.trim()));

      if (results.length > 0) {
        displaySearchResults(results);
        searchResultsContainer.style.display = 'block'
      } else {
        searchResultsContainer.style.display = 'none'
      }
    } else {
      searchResultsContainer.style.display = 'none'
    }
  });
}

function displaySearchResults(popularCities) {
  const searchResultsContainer = document.querySelector('.search-results-container');

  searchResultsContainer.innerHTML = '';

  popularCities.forEach(city => {
    const cityElement = document.createElement('div')
    cityElement.classList.add('city-name');
    cityElement.textContent = city;

    cityElement.addEventListener('click', () => {
      document.querySelector('.search-field').value = city;
      getWeatherData(city);
      searchResultsContainer.style.display = 'none';
    });

    searchResultsContainer.appendChild(cityElement);
  });
}

searchCity();