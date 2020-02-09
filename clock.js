// const clockContainer = document.querySelector(".js-clock");
const dateTitle = document.querySelector(".js-date");
const clockTitle = document.querySelector(".js-clock");

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let week = days[date.getDay()];
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds();

    dateTitle.innerText = `${year} ${month} ${day} ${week}`;

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours
        } : ${minutes < 10 ? `0${minutes}` : minutes
        } : ${seconds < 10 ? `0${seconds}` : seconds}`
}

function init() {
    console.log(new Date());
    setInterval(getTime, 1000);
}

init();
