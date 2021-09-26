const key = "CXhPk82ZAZgV0ngVUWdVBVGePc4qMGqf";

const getCity = async (city) => {
  const url = "https://dataservice.accuweather.com/locations/v1/cities/search",
    query = `?apikey=${key}&q=${city}`,
    response = await fetch(url + query),
    data = await response.json();

  return data[0];
};

const getWeather = async (id) => {
  const url = "https://dataservice.accuweather.com/currentconditions/v1/",
    query = `${id}?apikey=${key}`,
    response = await fetch(url + query),
    data = await response.json();

  return data[0];
};

window.onload = function () {
  if (window.navigator.onLine) refreshWeather(0);
};

function refreshWeather(user_requested) {
  if (Storage) {
    if (localStorage.cityname && !user_requested);
    else localStorage.cityname = prompt("Enter your city");

    const city = localStorage.cityname;

    updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => {
        alert("Please enter a valid city name");
        localStorage.cityname = prompt("Enter your city");
        refreshWeather(0);
      });
  }
}

let updateCity = async (city) => {
  let cityName = await getCity(city),
    weatherDetail = await getWeather(cityName.Key);

  return { cityName, weatherDetail };
};

var temp = document.getElementById("temperature"),
  condition = document.getElementById("weather-condition"),
  city = document.getElementById("city");

const updateUI = (data) => {
  temp.innerHTML = data.weatherDetail.Temperature.Metric.Value + "&deg C ";
  condition.innerHTML = data.weatherDetail.WeatherText;
  city.innerHTML =
    '<i class="fa fa-map-marker"></i> ' + data.cityName.EnglishName + ", ";
};
