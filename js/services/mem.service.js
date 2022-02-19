function _createLine(txt = 'defualt') {
    return {
        txt: getRandomText(2),
        txtWidth: 50,
        size: getRandomIntInclusive(20, 40),
        align: 'left',
        color: getRandomColor(),
        stroke: getRandomColor(), //null,
        posX: 50,
        posY: getRandomIntInclusive(100, 400),
        // TODO change to something dynamic!!! :
        // posY: getRandomIntInclusive(100, gElCanvas.height),
    }
}

function drawText(text, x, y, color, stroke, size) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    // var currLine = gMeme.lines[gMeme.selectedLineIdx]
    // gCtx.save();
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;
    gCtx.font = size + 'px Impact';
    // gCtx.font = "Impact"

    gCtx.fillText(text, x, y);
    //there is something with limit for fillText - [, maxWidth]) check it after
    if (stroke !== '#FFFFFF')
        gCtx.strokeText(text, x, y);
    // console.log(gCtx.measureText(text))
    // after print--> save
    // gCtx.restore()
}

function renderLinesOnMenu(delay = 10) {
    var elMemMenu = document.querySelector('.lines-container')
    var strHTML = ''
    for (let i = 0; i < gMeme.lines.length; i++) {
        strHTML +=
            `<div class="line mem-line${i+1}">
            <button class="btn" onclick="onIncreaseFont(this)">+</button>
                <input type="text" name="input${i+1}" placeholder="Put your sentence here" required="">
                <button class="btn" onclick="onDecreaseFont(this)">-</button>
                <div class="line-colors-btns">
                    <label>Text color <input type="color" name="line-color-${i+1}" value="#FFFFFF"></label>
                    <label>Stroke color <input type="color" name="stroke-color-${i+1}" value="#FFFFFF"></label>
                </div>
            </div>`
    }

    elMemMenu.innerHTML = strHTML;

}

function renderLinesOnCanvas(delay = 10) {
    // console.log(gMeme.lines.length)
    for (let i = 0; i < gMeme.lines.length; i++) {
        var line = gMeme.lines[i]
        updateLineWidth(i, line.txt)
            // console.log('line.posY', line.posY)

        drawText(line.txt, line.posX, line.posY, line.color, line.stroke, line.size)
    }

}

function updateLineWidth(lineIdx, text) {
    // console.log(gCtx.measureText(text))
    gMeme.lines[lineIdx].txtWidth = gCtx.measureText(text).width
        // gCtx.measureText(text)
}

//return if clicked & change the curr index if clicked
function isLineClicked(pos) {
    var isLine = false;
    for (let i = 0; i < gMeme.lines.length; i++) {
        var line = gMeme.lines[i]
        var deltaX = line.posX + line.txtWidth;
        var deltaY = line.size / 2;
        isLine = ((pos.x >= line.posX && pos.x <= deltaX) && (pos.y >= line.posY - deltaY && pos.y <= line.posY + deltaY))
        if (isLine) {
            gMeme.selectedLineIdx = i;
            break;
        }
    }
    return isLine;

}

function getRandomLines(numOfLines) {
    gMeme.lines = []
    for (let i = 0; i < numOfLines; i++) {
        addLine()

    }
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    renderLinesOnMenu()
    addInputListeners()
}

function removeLine() {
    gMeme.lines.pop()
    renderLinesOnMenu()
    addInputListeners()
    renderImgAndLines()
}

// TODO remove mem from storage!

function saveMem(image) {
    gUserMems = loadFromStorage(STORAGE_KEY)
    if (!gUserMems || !gUserMems.length) {
        gUserMems = []
    }
    gUserMems.push(image)
    _saveMemsToStorage()
}

function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, gUserMems)
}

function doShare() {

}





// ************************IMG SERVICE for mem.service.js!*****************
function renderImgAndLines() {
    var imgURL = getImgUrl()
        // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

    function toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var dataURL;
            // gElCanvas.height = this.naturalHeight;
            // gElCanvas.width = this.naturalWidth;
            gCtx.drawImage(this, 0, 0, gElCanvas.width, gElCanvas.height);
            //FOR LINES RENDERING:
            renderLinesOnCanvas()
            dataURL = gElCanvas.toDataURL(outputFormat);
            callback(dataURL);

            // *****TO FIX - problem in this link
            var elShare = document.querySelector('.share')
            console.log('checkkkk', elShare)
            elShare = `
            <button class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${dataURL}&t=${dataURL}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${src}&t=${src}'); return false;">
               Share   
            </button>`

        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    }
    toDataURL(imgURL,
        function(dataUrl) {
            //for storage!
            // gTempMems.push(dataUrl)
            // console.log('RESULT:', dataUrl)
        }
    )

}

function getImgUrl() {
    //this for curr id, if user upload, return him something else

    return getImgById(gMeme.selectedImgId).url

}

function getImgById(id) {
    var index = id - 1;
    return gImgs[index]
}
// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    console.log(ev)
    loadImageFromInput(ev, renderImgAndLines)
}
// \\************************IMG SERVICE*****************