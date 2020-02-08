const form = document.querySelector(".js-form");
let input = form.querySelector("input");
let greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser", 
    SHOWING_CN = "showing";

// save submitted name to localStorage
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// submit event: name
function handleSubmit(event) {
  event.preventDefault(); // press enter - doesn't do default action
  const currentValue = input.value;
  // console.log(currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}

// ask for name at the beginning
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// show greeting text with name
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

// get username from localStorage.getItem
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // she is not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();

}

init();