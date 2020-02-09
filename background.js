// https://unsplash.com/s/photos/animals?orientation=landscape


const body = document.querySelector("body");

const IMG_LENGTH = 11; // num of images saved in images folder

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/img${imgNumber+1}.jpg`;
    console.log(image.src);
    image.classList.add("bgImage");
    body.appendChild(image);
}


function genRandom(){
    const num = Math.floor(Math.random() * IMG_LENGTH);
    return num;
}


function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
