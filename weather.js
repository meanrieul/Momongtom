const weatherDeg = document.querySelector(".js-weather-deg"),
    weatherLoc = document.querySelector(".js-weather-loc"),
    weatherIcons = document.querySelectorAll(".weather__icon");

const thunderstorm = document.querySelector(".thunderstorm"),
    drizzle = document.querySelector(".drizzle"),
    rain = document.querySelector(".rain"),
    snow = document.querySelector(".snow"),
    atmosphere = document.querySelector(".atmosphere"),
    clear = document.querySelector(".clear"),
    clouds = document.querySelector(".clouds");
const API_KEY = "ad8ecc061e1074a8280989b533bc593a";
const COORDS = "coords";

function getCondition(condition) {
    if(condition >= 200 && condition < 300) {
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        thunderstorm.classList.add(SHOWING_CN);
    }
    else if(condition >=300 && condition <400) {
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        drizzle.classList.add(SHOWING_CN);
    }
    else if(condition >=500 && condition <600) {
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        rain.classList.add(SHOWING_CN);
    }
    else if(condition >=600 && condition <700) {
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        snow.classList.add(SHOWING_CN);
    }
    else if(condition>=700 && condition < 800){
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        atmosphere.classList.add(SHOWING_CN);
    }
    else if(condition == 800) {
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        clear.classList.add(SHOWING_CN);
    }
    else if(condition>800){
        weatherIcons.forEach(icon=>icon.classList.remove(SHOWING_CN));
        clouds.classList.add(SHOWING_CN);
    }
}

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json()
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const condition = parseInt(json.weather[0].id);
        getCondition(condition);
        weatherDeg.innerText = `${temperature}°C`;
        weatherLoc.innerText = `at ${place}`;
    });

}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log("Can't access geo location.");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();