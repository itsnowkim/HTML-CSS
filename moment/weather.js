const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "f5ae325a12052d6b5b948f2625ecea67";

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText = `${temperature}°C,${place}` ;
    });
        
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(position){
    console.log("Can't access geo-location");
}


function askForCoords(){
    //getCurrentPosition
    //(successCallback: PositionCallback, 
    //errorCallback?: PositionErrorCallback,
    // options?: PositionOptions): void;

    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);


}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords == null){
        //get latitude, logitude and save
        askForCoords();
    }else{
        //get from local storage
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();