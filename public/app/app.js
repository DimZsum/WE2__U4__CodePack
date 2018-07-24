const red = "#FF0000";
const black = "#000000";


const hearts = document.getElementsByClassName("fa-heart");
// console.log(x);
let filter = false;

const files = document.getElementsByClassName("fa-file");

const images = document.getElementsByClassName("image");

const tcols = document.getElementsByClassName("tcol");

let imageList = [];

for (let i = 0; i < files.length; i++) {

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
const modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const modalImg = document.getElementById("modalImg");


function filesEvent(event) {
    modal.style.display = "block";
    const img = imageList[event.target.index];
    modalImg.src = img.src;
    const captionText = document.getElementById("caption");
    captionText.innerHTML = img.alt;
}


// Get the <span> Element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
};

const filterButton = document.getElementById("filterButton");

filterButton.onclick = () => {
    if (!filter) {
        imageList.forEach((elem, index) => {
            console.log(elem.isFavorite);
            if (!elem.isFavorite) {
                tcols[index].classList.toggle("filter_hide");
                console.log(tcols[index]);
            }
        });
        filter = !filter;
        console.log(filter);
    } else {
        imageList.forEach((elem, index) => {
            if(tcols[index].classList.contains("filter_hide")){
                tcols[index].classList.remove("filter_hide");
            }
            console.log(tcols[index]);
        });
        filter = !filter;
        console.log(filter);
    }
};