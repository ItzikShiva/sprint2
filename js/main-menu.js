var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };
var gImgs
var gKeyWords



function onGalleryClick() {
    elMems = document.querySelector(".mem-main-container")
    elMems.classList.add("hidden")
    elGallery = document.querySelector(".gallery-container")
    elGallery.classList.remove("hidden")
}

function onImFlexible() {
    gMeme.selectedImgId = getRandomIntInclusive(1, gImgs.length);
    elMems = document.querySelector(".mem-main-container")
    elMems.classList.remove("hidden")
    elGallery = document.querySelector(".gallery-container")
    elGallery.classList.add("hidden")
    getRandomLines(getRandomIntInclusive(1, 2))
    initMem()
    renderLinesOnMenu()
    renderLinesOnCanvas()
    addInputListeners()
}

function updateImageModel() {
    var images = []
    for (let i = 1; i < 19; i++) {
        var image = { id: i, url: `meme-imgs-square/${i}.jpg`, keywords: ['funny', 'cat', 'nice'] }
        images.push(image)
    }
    gImgs = images

    updaeKeyWords()
    renderKeyWords()
}

function updaeKeyWords() {
    gKeyWords = []
    for (let i = 0; i < gImgs.length; i++) {
        for (let j = 0; j < gImgs[i].keywords.length; j++) {
            var currKeyword = gImgs[i].keywords[j]
            if (!gKeyWords.some((element) => element === currKeyword)) gKeyWords.push(currKeyword)
        }
    }
}

function renderKeyWords() {
    var strHTML = `<option>ALL</option><option>USER</option>`
    for (let i = 0; i < gKeyWords.length; i++) {
        strHTML += `<option>${gKeyWords[i]}</option>`
    }
    var elFilters = document.getElementById("filters")
    elFilters.innerHTML = strHTML
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderGallery()
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getImagesForDisplay() {
    var images = []
    if (gFilterBy === 'ALL') return gImgs
    if (gFilterBy === 'USER') return loadFromStorage(STORAGE_KEY)


    for (let i = 0; i < gImgs.length; i++) {
        var currImage = gImgs[i]
        if (currImage.keywords.some((currKeyword) => currKeyword === gFilterBy)) images.push(currImage)
    }
    return images
}

function toggleMenu(ev) {
    var elBtnPointer = ev.nextElementSibling;

    while (elBtnPointer) {
        elBtnPointer.classList.toggle('hidden')
        elBtnPointer = elBtnPointer.nextElementSibling
    }

    var elMenu = ev.parentElement
    if (elMenu.style.border === '0px') {
        elMenu.style.border = 'solid 0.5px'
    } else elMenu.style.border = '0px'
}