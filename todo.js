// cannot use 'form' because already used in greeting.js

const toDoForm = document.querySelector(".js-toDoForm"); 
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(event){
    // console.dir(event.target);  --> find out info inside button
    // console.log(event.target.parentNode);
    // console.log(event.target.parentElement); --> same as above

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        // li.id : string type
        // toDo.id : num type
        return toDo.id !== parseInt(li.id);
    }); 
    // filter: runs through every item in the array, if an element passes the inner function conditions, return that element
    toDos = cleanToDos; // new array: cleanToDos
    saveToDo();  // save updated toDos array
}
// you cannot save object to localStorage
// can only save string: JSON.stringify
function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // save string version of json object
} 

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDos.length + 1;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDo();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); 
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            // console.log(toDo, toDo.text);
            paintToDo(toDo.text);
        })
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();