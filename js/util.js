function resizeCanvas() {
    var elMemMainContainer = document.querySelector('.mem-main-container');
    var elContainer = document.querySelector('.canvas-container');
    var elMemMenu = document.querySelector('.mem-menu-container')
    gElCanvas.width = elContainer.offsetWidth - 20
    gElCanvas.height = gElCanvas.width - 20
        // gElCanvas.height = elContainer.offsetHeight
        // console.dir(elContainer)

    //SOMTHING LIKE THIS SHOULD WORK, need to fix:
    // gElCanvas.width = elMemMainContainer.offsetWidth - elMemMenu.offsetWidth - 20
    // console.log('.mem-main-container', document.querySelector('.mem-main-container').offsetWidth)
    // console.log('.canvas-container', document.querySelector('.canvas-container').offsetWidth)
    // console.log('.mem-menu-container', document.querySelector('.mem-menu-container').offsetWidth)

    // Unless needed, better keep height fixed.
    //   gCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    // You may clear part of the canvas -something
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomText(wordCount) {
    const words = ['Answer', 'misery', 'adieus', 'add', 'wooded', 'how', 'nay', 'men', 'before', 'though.', 'Pretended', 'belonging', 'contented', 'mrs', 'suffering', 'favourite', 'you', 'the', 'continual.', 'Mrs', 'civil', 'nay', 'least', 'means', 'tried', 'drift.', 'Natural', 'end', 'law', 'whether', 'but', 'and', 'towards', 'certain.', 'Furnished', 'unfeeling', 'his', 'sometimes', 'see', 'day', 'promotion', 'Quitting', 'informed', 'concerns', 'can', 'men', 'now.', 'Projection', 'to', 'or', 'up', 'conviction', 'uncommonly', 'delightful', 'continuing', 'In', 'appetite', 'ecstatic', 'opinions', 'hastened', 'by', 'handsome', 'admitted'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}