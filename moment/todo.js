const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDo";//key value
let toDo = [];//storage array that save the work to do

function deleteToDo(event){
    //remove from html
    const li = event.target.parentNode;
    toDoList.removeChild(li);

    //remove from database
    //Returns the elements of an array that meet the condition specified in a callback function.

    const cleanToDo = toDo.filter(function(toDo){
        return toDo.id != parseInt(li.id);
    });

    toDo = cleanToDo;
    saveToDo(toDo);
}

function saveToDo(toDo){
    //console.log(toDo);
    localStorage.setItem(TODO_LS,JSON.stringify(toDo));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "✔";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDo.length + 1;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId
    };
    toDo.push(toDoObj);
    saveToDo(toDo);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDo(){
    const loadedToDo = localStorage.getItem(TODO_LS);

    if(loadedToDo != null){
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach(function(a){
            //console.log(a.text);
            paintToDo(a.text);
        });
        // parsedToDo.forEach(function(toDo){
        //     paintToDo(toDo.text);
        // });

    }
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();