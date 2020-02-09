const body = document.querySelector("body");
const bgChange = document.getElementById("bgChange");
const currentImg = document.getElementsByClassName("bgImage");
// const currentImg = document.querySelector("img");
const IMG_LENGTH = 22; // num of images saved in images folder

function paintImage(imgNumber) {
    const image = new Image();
    // const imgName = `images/img${imgNumber+1}` + "^([\\S]+(\\.(?i)(jpg|png|jpeg))$)";
    // console.log(imgName);
    image.src = `images/graffiti/img${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const num = Math.floor(Math.random() * IMG_LENGTH);
    return num;
}

function changeImg(){
  body.removeChild(currentImg[0]);
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

bgChange.addEventListener("click", changeImg);

init();
