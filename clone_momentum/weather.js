const weather = document.querySelector(".weather");

const API_KEY = "f5ae325a12052d6b5b948f2625ecea67";
const COORDS = "coords";

function getWeather(latitude,longitude){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ) .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
          const temperature = myJson.main.temp;
          const place = myJson.name;
          weather.innerText = `${temperature}°C, ${place}` ;
      });
    
}
/*************location saving...***********/
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
/*************location saved!***********/

/*************get location start***********/
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Can't access geo-location");
}
function askLocation(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
/***************get location end**********/

function loadLocation(){
    const loadedLoaction = localStorage.getItem(COORDS);
    if(loadedLoaction == null){
        //no location on localStorage
        askLocation();
    }else{
        //we already have location, so get weather
        const parseLocation = JSON.parse(loadedLoaction);
        getWeather(parseLocation.latitude,parseLocation.longitude);
    }
}

function init(){
    loadLocation();
}

init();