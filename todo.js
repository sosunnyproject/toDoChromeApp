// cannot use 'form' because already used in greeting.js

const todoForm = document.querySelector(".js-toDoForm");
const todoInput = todoForm.querySelector("input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished");

// localStorage KEY names
const PENDING_LS = "pending list";
const FIN_LS = "finished list";

// localStorage VALUES
let pendingTodos = [];
let finishedTodos = [];

function saveToPending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingTodos));
}

function saveToFinished() {
  localStorage.setItem(FIN_LS, JSON.stringify(finishedTodos));
}

// create li with btn
function buildGenericLi(todo, parentList, parentName) {
  let newId = parentList.length + 1;
  if (parentList.length !== 0) {
    // if 문 체크 안하는 경우, 로딩이 미처 안되어서 property access 를 못함.
    const lastItem = parentList[parentList.length - 1];
    newId = lastItem.id + 1;
  }
  const li = document.createElement("li");
  const textTodo = document.createTextNode(todo);
  const delBtn = document.createElement("button"); // delete
  li.id = newId;
  delBtn.innerText = "🙅";
  li.appendChild(delBtn);
  li.appendChild(textTodo);
  delBtn.addEventListener("click", deleteTodo);

  let extraBtn;
  if (parentName === "pending") {
    extraBtn = document.createElement("button");
    extraBtn.innerText = "🙆‍";
    extraBtn.addEventListener("click", moveToFinished);
  } else if (parentName === "finished") {
    extraBtn = document.createElement("button"); // back to Pending
    extraBtn.innerText = "💁";
    extraBtn.addEventListener("click", moveToPending);
  }

  li.insertBefore(extraBtn, delBtn);
  return li;
}

// paint pending list
function createPending(todo) {
  const li = buildGenericLi(todo, pendingTodos, "pending");
  pending.appendChild(li);
  const todoObj = { content: todo, id: parseInt(li.id) }; // save as an object, not string
  pendingTodos.push(todoObj);
  saveToPending(); // save current [] to localStorage
}

// paint finished list
function createFinished(todo) {
  const li = buildGenericLi(todo, finishedTodos, "finished");
  finished.appendChild(li);
  const doneObj = { content: todo, id: parseInt(li.id) };
  finishedTodos.push(doneObj);
  saveToFinished();
}

function deleteTodo(event) {
  const li = event.target.parentNode; // entire <li> tag
  const className = event.target.parentNode.parentNode.className; // ul class=pending or finished

  let toDos = [];
  if (className === "pending") {
    toDos = pendingTodos; // update global variable array
    pending.removeChild(li); // remove from html view
  } else if (className === "finished") {
    toDos = finishedTodos;
    finished.removeChild(li);
  }

  // delete according index
  const cleanTodos = toDos.filter(function(todo) {
    return todo.id !== parseInt(li.id, 10);
  });

  if (className === "pending") {
    pendingTodos = cleanTodos;
    saveToPending();
  } else if (className === "finished") {
    finishedTodos = cleanTodos;
    saveToFinished();
  }
}

function moveToFinished(event) {
  const li = event.target.parentNode; // entire <li> tag
  const thisTodo = pendingTodos.find(function(todo) {
    return todo.id === parseInt(li.id);
  });
  deleteTodo(event);
  createFinished(thisTodo.content);
}

function moveToPending(event) {
  const li = event.target.parentNode;
  const thisTodo = finishedTodos.find(function(todo) {
    return todo.id === parseInt(li.id);
  });

  deleteTodo(event);
  createPending(thisTodo.content);
}

// load data from localStorage
function loadTodos() {
  const loadPending = localStorage.getItem(PENDING_LS);
  const loadFinished = localStorage.getItem(FIN_LS);

  if (loadPending !== null) {
    const parsedPending = JSON.parse(loadPending);
    for (let i = 0; i < parsedPending.length; i++) {
      createPending(parsedPending[i].content);
    }
  }

  if (loadFinished !== null) {
    const parsedFinished = JSON.parse(loadFinished);
    for (let i = 0; i < parsedFinished.length; i++) {
      createFinished(parsedFinished[i].content);
    }
  }
}

function handleSubmit(event) {
  event.preventDefault(); // submit when enter btn pressed
  const newTodo = todoInput.value;
  createPending(newTodo);
  todoInput.value = "";
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
