function _createLine(txt = 'defualt') {
    return {
        txt,
        size: 20,
        align: 'left',
        color: 'red',
        posX: 50,
        posY: 150,
    }
}

function drawText(text, x, y, color, size) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    // var currLine = gMeme.lines[gMeme.selectedLineIdx]
    // gCtx.save();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = 'black';
    gCtx.font = size + 'px Arial';

    gCtx.fillText(text, x, y);
    //there is something with limit for fillText - [, maxWidth]) check it after

    gCtx.strokeText(text, x, y);
    // console.log(gCtx.measureText(text))
    // after print--> save
    // gCtx.restore()
}

function renderLinesOnCanvas() {
    // console.log(gMeme.lines.length)
    for (let i = 0; i < gMeme.lines.length; i++) {
        var line = gMeme.lines[i]
        drawText(line.txt, line.posX, line.posY, line.color, line.size)
            // console.log('line.posY', line.posY)
        updateLineWidth(i, line.txt)
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


    // var result = gMeme.lines.some((line) => {
    //     var deltaX = line.posX + line.txtWidth;
    //     var deltaY = line.size / 2;
    //     // console.log('line', line)
    //     // console.log('click pos: pos x:', pos.x, 'pos y', pos.y)
    //     // console.log('line.posY', line.posY)
    //     // console.log('deltaY', deltaY)
    //     // console.log('deltaX', deltaX)
    //     return ((pos.x >= line.posX && pos.x <= deltaX) && (pos.y >= line.posY - deltaY && pos.y <= line.posY + deltaY))
    // })
    // return result
}


// ************************IMG SERVICE for mem.service.js!*****************
function renderImg() {
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
            dataURL = gElCanvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    }

    toDataURL(imgURL,
        function(dataUrl) {
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
    loadImageFromInput(ev, renderImg)
}
// \\************************IMG SERVICE*****************