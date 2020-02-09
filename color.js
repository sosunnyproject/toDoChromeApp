const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const text4 = document.getElementById("text4");
const text5 = document.getElementById("text5");
const colorRange = document.getElementById("colorChange");

function changeColor(event){
    // randomNumber
    const randomR = Math.floor(50 + Math.random() * Math.floor(255));
    const randomG = Math.floor(Math.random() * Math.floor(255));
    const randomB = Math.floor(50 + Math.random() * Math.floor(255));

    console.log(text2);
    
    text1.style.color = "rgb(" + [randomR,randomG,randomB].join() + ")";
    text2.style.color = "rgb(" + [randomR - 100, randomG - 10, randomB + 100].join() + ")";
    text3.style.color = "rgb(" + [randomR - 140, randomG + 70, randomB + 100].join() + ")";
    text4.style.color = "rgb(" + [randomR - 200, randomG + 100, randomB + 10].join() + ")";
    text5.style.color = "rgb(" + [randomR + 200, randomG - 100, randomB - 10].join() + ")";
}

colorChange.addEventListener("click", changeColor);
