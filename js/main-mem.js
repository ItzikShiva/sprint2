// +++++++++++to delete+++++++
var gCurrShape = 'triangle';
var gLineColor = 'green';
var gFillColor = 'orange'
var gMouseEvs = ['mousedown', 'mousemove', 'mouseup']
    // var lastEv
var isDragging = false;


var gCurrEdit = 'text'
var gElCanvas;
var gCtx;
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}


//TODO -  init for mem-page only!
function init() {
    gElCanvas = document.getElementById('main-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    addListeners()

    renderImg()


}

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
















































function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        console.log('onload');
        var img = new Image()
            // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}






























function renderColors() {
    gFillColor = document.querySelector('[name="fill-color"]').value
    gLineColor = document.querySelector('[name="line-color"]').value

}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
            // renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    renderColors()
    draw(ev)
}

function onMove(ev) {
    // draw(ev)
    drawLine(ev.offsetX, ev.offsetY, ev);
}


function onUp(ev) {
    draw(ev)
}

function draw(ev) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY);
            break;
        case 'circle':
            drawCircle(offsetX, offsetY);
            break;
        case 'line':
            drawLine(offsetX, offsetY, ev);
            break;
    }
}

function setShape(shape) {
    gCurrShape = shape;
}



// function drawLine(x, y, xEnd = 250, yEnd = 250) {
function drawLine(x, y, ev) {
    //ASk is it the best way to render??????
    if (ev.type === 'mousedown') {
        isDragging = true;
        gCtx.beginPath();
        gCtx.moveTo(x, y); // 10 10
        //TODO user choose!
        gCtx.lineWidth = 2
    } else if (ev.type === 'mousemove' && isDragging) {
        gCtx.lineTo(x, y); // 11 11
        gCtx.stroke();
        // gCtx.beginPath();
        gCtx.moveTo(x, y); // 33 33
    } else {
        gCtx.strokeStyle = gLineColor;
        gCtx.stroke();
        gCtx.closePath();
        isDragging = false
    }
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 150, 150);
    gCtx.fillStyle = gFillColor;
    gCtx.fillRect(x, y, 150, 150);
    gCtx.strokeStyle = gLineColor
    gCtx.stroke();
}

function drawTriangle(x, y) {
    //if the user want to draw all we can use global var for number of clicks for triangle
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(130, 330);
    gCtx.lineTo(50, 370);
    gCtx.closePath();
    // gCtx.lineTo(x, y);
    // gCtx.fillStyle = 'purple';
    // gCtx.fill();
    gCtx.strokeStyle = gLineColor
    gCtx.stroke();
    gCtx.closePath();
}

function drawCircle(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 6;
    gCtx.arc(x, y, 100, 0, 2 * Math.PI);
    gCtx.strokeStyle = gLineColor
    gCtx.stroke();
    gCtx.fillStyle = gFillColor;
    gCtx.fill();
}


// -------------------------images uplaod and download-------------------
function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}