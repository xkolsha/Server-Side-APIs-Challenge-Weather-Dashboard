const API_KEY = "{c8f235379537ae30e3dbf9ffbf148ad8}";

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    getGeocodingData(city);
  });
