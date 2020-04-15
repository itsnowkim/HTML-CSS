const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

//key value
const TODO_LS = "TODO";

//save todolist in here
let toDo = [];

function saveToDo(toDo){
  localStorage.setItem(TODO_LS,JSON.stringify(toDo));
}

function paintTodo(text){
  const li = document.createElement("li");
  const deltxt = document.createTextNode(" \u00D7");
  const delBtn = document.createElement("span");
  const span = document.createElement("span");

  //span delbtn
  delBtn.className = "close";
  delBtn.appendChild(deltxt);

  //write list
  span.innerText = text;
  const newId = toDo.length+1;

  li.appendChild(span);
  li.appendChild(delBtn);

  li.id = newId;
  toDoList.appendChild(li);

  delBtn.onclick = function(){
    //remove the list
    const list = this.parentElement;
    toDoList.removeChild(list);

    //remove from the database
    const cleanToDo = toDo.filter(function(toDo){
      return toDo.id != parseInt(li.id);
  });

  toDo = cleanToDo;
  saveToDo(toDo);
  }

  const toDoObj = {
    text : text,
    id : newId
  };
  toDo.push(toDoObj);
  saveToDo(toDo);

}

function handleSubmit(event){
  //prevent refresh the screen when we submit the data
  event.preventDefault();
  
  //get data
  const currentValue = toDoInput.value;
  
  //paint!
  paintTodo(currentValue);

  //clear the form
  toDoInput.value = "";
}

function loadTodo(){
  const loadedToDo = localStorage.getItem(TODO_LS);
  if(loadedToDo != null){
    //we have data, so we have to get data first.
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function(a){
      paintTodo(a.text);
    })
    //then we have to paint(print) data on the screen
  }
  //else, we don't have to do anything.
}

function init(){
  loadTodo();
  toDoForm.addEventListener("submit",handleSubmit);
}

init();