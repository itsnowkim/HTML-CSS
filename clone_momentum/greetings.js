const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_KEY = "currentUser";
const SHOWING_USER ="showing";

function saveName(text){
    localStorage.setItem(USER_KEY,text);
}

function handleSubmit(event){
    //after submit, page will be refreshed, so have to prevent it.
    event.preventDefault();
    
    const UserName = input.value;

    paintGreeting(UserName);
    saveName(UserName);
 }

function askForName(){
    //form.classList.add(SHOWING_USER);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    //remove ask form, because we already have name
    form.remove();

    //add greetings
    //greeting.classList.add(SHOWING_USER);
    greeting.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_KEY);
    if(currentUser == null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();