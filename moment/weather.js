const COORDS = "coords";
const API_KEY = "bb69e9b5af5ee9b707491b8f6c8ec06b";

function getWeather()

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
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
        askForCoords();
    }else{
        //get weather
    }
}

function init(){
    loadCoords();
}
init();