var gFilterBy = 'ALL' //user, etc ALL

function init() {
    updateImageModel()
    renderGallery()
        // resizeCanvas()
}

function renderGallery() {
    var images = getImagesForDisplay()
        // need to chang for image id instead of index!

    //+++++++++++++++++++++++++++++++ var images = gImgs;
    var strHTML = '<div class="grid-container">'

    if (gFilterBy === 'USER') {
        for (let i = 0; i < images.length; i++) {
            // var image = images.pop()
            // <div class="item item-user${i}" onclick="onImageClick(${images[i].id})">
            strHTML += `<div class="item item-user${i}">
                        <a class="image-link" href="#portfolioModal3">
                        <img class="img-fluid" src="${images[i]}">
                        </a>
                        </div>`
        }
    } else {
        for (let i = 0; i < images.length; i++) {
            strHTML += `<div class="item item${images[i].id}" onclick="onImageClick(${images[i].id})">
                        <a class="image-link" href="#portfolioModal3">
                        <img class="img-fluid" src="meme-imgs-square/${images[i].id}.jpg">
                        </a>
                        </div>`
        }
    }
    strHTML += `</div>`
    var elGallery = document.querySelector(".gallery-container")
    elGallery.innerHTML = strHTML
}

function onImageClick(imageIdx) {
    console.log(imageIdx)
    gMeme.selectedImgId = imageIdx;
    elMems = document.querySelector(".mem-main-container")
    elMems.classList.remove("hidden")
    elGallery = document.querySelector(".gallery-container")
    elGallery.classList.add("hidden")
    initMem()
}