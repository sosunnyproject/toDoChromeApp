// https://unsplash.com/s/photos/animals?orientation=landscape


const body = document.querySelector("body");

const IMG_NUMBER = 3; // num of images saved in images folder

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}


function genRandom(){
    const num = Math.floor(Math.random() * IMG_NUMBER);
    return num;
}


function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();