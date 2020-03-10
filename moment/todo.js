const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDo";
const toDo = new Array();

function saveToDo(toDo){
    console.log(toDo);
    localStorage.setItem(TODO_LS,toDo.text);
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
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
        console.log(loadedToDo);
    }
}

function init(){
    //loadToDo();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();