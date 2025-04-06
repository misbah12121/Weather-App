const apiKey = "1a9ae6962235907b0f94d5859589383c";

const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    
    document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°`;
    document.querySelector(".description").textContent = data.weather[0].description;
    document.querySelector(".info-block:nth-child(1) span").textContent = `${data.wind.speed} km/h`;
    document.querySelector(".info-block:nth-child(2) span").textContent = `${data.main.humidity}%`;
    document.querySelector(".info-block:nth-child(3) span").textContent = `${data.clouds.all}%`;

    
    const iconCode = data.weather[0].icon;
    document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  } catch (error) {
    alert("Error fetching data");
    console.error(error);
  }
}
