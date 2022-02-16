// +++++++++++to delete+++++++
var gCurrShape = 'triangle';
var gLineColor = 'green';
var gFillColor = 'orange'
var gMouseEvs = ['mousedown', 'mousemove', 'mouseup']
    // var lastEv




var gIsDragging = false;
var gCurrEdit = 'text'
var gElCanvas;
var gCtx;
// var gCurrLineIdx;
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
            txt: 'I sometimes eat Falafel',
            txtWidth: 50,
            size: 20,
            align: 'left',
            color: 'green',
            posX: 0,
            posY: 20,
        },
        {
            txt: 'bottom line',
            txtWidth: 50,
            size: 32,
            align: 'left',
            color: 'red',
            posX: 100,
            posY: 880,
        }
    ]
}


//TODO -  init for mem-page only-maybe!
function init() {
    gElCanvas = document.getElementById('main-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    addListeners()
    renderImg()
        //render lines (2 in begining)
}

//TODO
function onAddInput() {
    gMeme.lines.push(_createLine)
        // TODO ->renderLinesOnMenu()
}

function onUpdateLineValue(e) {
    renderImg()
    var lineIdx = e.target.name
    lineIdx = lineIdx.replace("input", "") - 1
    gMeme.selectedLineIdx = lineIdx
    var text = e.target.value;
    gMeme.lines[lineIdx].txt = text
        //I know its not the best solution but it the best i can thought of
    setTimeout(() => (renderLinesOnCanvas()), 1);
}

function onIncreaseFont(el) {
    renderImg()
    var lineIdx = el.parentElement.className
    lineIdx = lineIdx.replace("line mem-line", "") - 1
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].size += 2
    setTimeout(() => (renderLinesOnCanvas()), 1);
}

function onDecreaseFont(el) {
    renderImg()
    var lineIdx = el.parentElement.className
    lineIdx = lineIdx.replace("line mem-line", "") - 1
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].size -= 2
    setTimeout(() => (renderLinesOnCanvas()), 1);
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addInputListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
            // renderCanvas()
    })
}

function addInputListeners() {
    for (let i = 0; i < gMeme.lines.length; i++) {
        const elInput = document.querySelector(`[name="input${i+1}"]`);
        elInput.addEventListener('input', onUpdateLineValue);
    }
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)

    console.log('onDown()');
    console.log(isLineClicked(pos))
    if (!isLineClicked(pos)) return
    setLineDrag(true)
        // gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function setLineDrag(isDrag) {
    gIsDragging = isDrag
}

function onMove(ev) {
    // console.log('onMove()');
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (gIsDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - line.posX
        const dy = pos.y - line.posY
        line.posX = pos.x
        line.posY = pos.y
        renderImg()
        setTimeout(() => (renderLinesOnCanvas()), 1);
    }
}

function onUp() {
    // console.log('onUp()');
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }


    // think its for touch:
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}



























function clearCanvas() {
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // You may clear part of the canvas
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}



function renderColors() {
    gFillColor = document.querySelector('[name="fill-color"]').value
    gLineColor = document.querySelector('[name="line-color"]').value

}





function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

// function onDown(ev) {
//     renderColors()
//     draw(ev)
// }

// function onMove(ev) {
//     // draw(ev)
//     drawLine(ev.offsetX, ev.offsetY, ev);
// }


// function onUp(ev) {
//     draw(ev)
// }

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