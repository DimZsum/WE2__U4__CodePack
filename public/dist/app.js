"use strict";

var red = "#FF0000";
var black = "#000000";

var hearts = document.getElementsByClassName("fa-heart");
// console.log(x);
var filter = false;

var files = document.getElementsByClassName("fa-file");

var images = document.getElementsByClassName("image");

var tcols = document.getElementsByClassName("tcol");

var imageList = [];

for (var i = 0; i < files.length; i++) {

    files[i].addEventListener("click", filesEvent);
    hearts[i].addEventListener('click', heartsEvent);
    files[i].index = i;
    hearts[i].index = i;
    imageList[i] = images[i];
    imageList[i].isFavorite = false;
}

// favorite function
function heartsEvent(event) {
    event.target.classList.toggle("fa-heart-marked");
    imageList[event.target.index].isFavorite = !imageList[event.target.index].isFavorite;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("modalImg");

function filesEvent(event) {
    modal.style.display = "block";
    var img = imageList[event.target.index];
    modalImg.src = img.src;
    var captionText = document.getElementById("caption");
    captionText.innerHTML = img.alt;
}

// Get the <span> Element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

var filterButton = document.getElementById("filterButton");

filterButton.onclick = function () {
    if (!filter) {
        imageList.forEach(function (elem, index) {
            console.log(elem.isFavorite);
            if (!elem.isFavorite) {
                tcols[index].classList.toggle("filter_hide");
                console.log(tcols[index]);
            }
        });
        filter = !filter;
        console.log(filter);
    } else {
        imageList.forEach(function (elem, index) {
            if (tcols[index].classList.contains("filter_hide")) {
                tcols[index].classList.remove("filter_hide");
            }
            console.log(tcols[index]);
        });
        filter = !filter;
        console.log(filter);
    }
};