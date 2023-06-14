const API_KEY = "{c8f235379537ae30e3dbf9ffbf148ad8}";
// Function to fetch weather data
async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const weatherList = data.list;
    let weatherHTML = "";

    for (let i = 0; i < weatherList.length; i += 8) {
      const weather = weatherList[i];
      const date = new Date(weather.dt_txt);
      const icon = weather.weather[0].icon;
      const temperature = Math.round(weather.main.temp - 273.15);
      const humidity = weather.main.humidity;
      const windSpeed = weather.wind.speed;

      weatherHTML += `
        <div class="card column is-one-fifth mt-6">
          <header class="card-header">
            <p class="card-header-title">
              ${date.toLocaleDateString()}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
              <p>Temperature: ${temperature}&deg;C</p>
              <p>Humidity: ${humidity}%</p>
              <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
          </div>
        </div>
      `;
    }

    document.querySelector("#weatherContainer").innerHTML = weatherHTML;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function for the form submission
document
  .querySelector("#searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.querySelector("#cityInput").value;

    // Save search history
    const searchHistory = localStorage.getItem("searchHistory") || "[]";
    const historyArray = JSON.parse(searchHistory);
    historyArray.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(historyArray));

    // Display search history
    displaySearchHistory();

    // Fetch weather data for the city
    fetchWeather(city);
  });
