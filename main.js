let uploadBtn = document.querySelector("#upload"),
    downloadBtn = document.querySelector("#download"),
    resetBtn = document.querySelector("#reset"),
    saturate = document.querySelector("#saturate"),
    contrast = document.querySelector("#contrast"),
    brightness = document.querySelector("#brightness"), 
    sepia = document.querySelector("#sepia"),
    grayscale = document.querySelector("#grayscale"),
    blure = document.querySelector("#blur"),
    hueRotate = document.querySelector("#hue-rotate");
    img = document.querySelector("#img"),
    imgBox = document.querySelector(".img-box");


const canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");
    
function resetValues() {
    img.style.filter = "none";
    ctx.filter = "none";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0"; 
    blure.value = "0";
    hueRotate.value = "0";
}

window.onload = function () {
    downloadBtn.style.display = "none";
    resetBtn.style.display = "none";
    imgBox.style.display = "none";
}

uploadBtn.onchange = function () {
    resetValues();
    downloadBtn.style.display = "block";
    resetBtn.style.display = "block";
    imgBox.style.display = "block";

    let file = new FileReader();
    file.readAsDataURL(uploadBtn.files[0]); 
    file.onload = function () {
        console.log(file.result)
        img.src = file.result;
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    }
}

let filters = document.querySelectorAll("ul li input");


// Add the filters on the image.
filters.forEach(filter => {
    filter.addEventListener("input", function () {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blure.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        img.style.display = "none";

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


    });
});


resetBtn.onclick = function () {
    resetValues();   
}

downloadBtn.onclick = function () {
    download.href = canvas.toDataURL("image/jpeg");
}

/*
using the canvas to take a copy form the original image and applay the fillters on this copy 
to downloade thi image inside the canvas by the applayed filters on it .
*/