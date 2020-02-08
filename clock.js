const clockContainer = document.querySelector(".js-clock");
let clockTitle = clockContainer.querySelector("h1");

function getTime() {
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds();

    clockTitle.innerText = 
        `${hours < 10 ? `0${hours}` : hours
        } : ${minutes < 10 ? `0${minutes}` : minutes
        } : ${seconds < 10 ? `0${seconds}` : seconds}`
}

function init() {
    setInterval(getTime, 1000);
}

init();