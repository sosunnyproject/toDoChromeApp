//https://home.openweathermap.org/api_keys

const weather = document.querySelector(".js-weather");

const API_KEY = "979fd9756f0341488bc8a40afa553e76";

// javascript power: send request & get data without refresh (getting info behind the scene)
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()

        // Promise <pending>, so add one more .then

    }).then (function(json){
        // console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C @ ${place}`
    })

     // then : calls the next function, once previous step is completed

}

function saveCoords(coordsObj) {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const coordsObj = {
        lat, 
        long
    };
    saveCoords(coordsObj);
    getWeather(lat, long);
    // console.log(coordsObj);
}

function handleGeoError(){
    console.error("Can't access geolocation");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem("coords");
    if(loadedCoords === null) {
        askForCoords();
    } else { //getWeather
        const parseCoords = JSON.parse(localStorage.getItem("coords"));
        // console.log(parseCoords);
        getWeather(parseCoords.lat, parseCoords.long);
        // console.log(loadedCoords);
    }
}

function init() {
    loadCoords();
}

init();