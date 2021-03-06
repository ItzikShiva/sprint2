'use strict'

const STORAGE_KEY = 'memsDB';
var gUserMems;
// THIS IS FOR STORAGE
var gTempMems = [];
var gIsDragging = false;
var gCurrEdit = 'text'
var gElCanvas;
var gCtx;
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
            txt: 'I sometimes eat Falafel',
            txtWidth: 50,
            size: 20,
            align: 'left',
            color: '#FFFFFF',
            posX: 0,
            posY: 20,
        },
        {
            txt: 'bottom line',
            txtWidth: 50,
            size: 32,
            align: 'left',
            color: '#FFFFFF',
            posX: 100,
            posY: 300,
        }
    ]
}

function initMem() {
    gElCanvas = document.getElementById('main-canvas');
    gCtx = gElCanvas.getContext('2d');

    resizeCanvas()
    renderImgAndLines()
    addListeners()
}

function onSaveMem() {
    var image = gElCanvas.toDataURL('image/jpeg')
    saveMem(image)
}

function onDownload(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onAddLine() {
    addLine()
}

function onRemoveLine() {
    removeLine()
}

function onUpdateLineValue(e) {
    var lineIdx = e.target.name
    lineIdx = lineIdx.replace("input", "") - 1
    gMeme.selectedLineIdx = lineIdx
    var text = e.target.value;
    var line = gMeme.lines[lineIdx]

    //TODO - FIX measurment, check the canvas size. check if the measure text is working!
    if (gCtx.measureText(text).width < gElCanvas.width - line.posX) {
        gMeme.lines[lineIdx].txt = text
        renderImgAndLines()
    }
}

function onIncreaseFont(el) {
    var lineIdx = el.parentElement.className
    lineIdx = lineIdx.replace("line mem-line", "") - 1
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].size += 2
    renderImgAndLines()
}

function onDecreaseFont(el) {
    var lineIdx = el.parentElement.className
    lineIdx = lineIdx.replace("line mem-line", "") - 1
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].size -= 2
    renderImgAndLines()
}

function onColorChange(e) {
    var lineIdx = e.target.name
    lineIdx = lineIdx.replace("line-color-", "") - 1
    gMeme.selectedLineIdx = lineIdx
    var textColor = e.target.value;
    gMeme.lines[lineIdx].color = textColor

    renderImgAndLines()
}

function onStrokeChange(e) {
    var lineIdx = e.target.name
    lineIdx = lineIdx.replace("stroke-color-", "") - 1
    gMeme.selectedLineIdx = lineIdx
    var strokeColor = e.target.value;
    gMeme.lines[lineIdx].stroke = strokeColor
    renderImgAndLines()
}

function onChangeLine(ev) {
    // console.log('ev', ev)
    var lineIdx = gMeme.selectedLineIdx
    const elCurrLine = document.querySelector(`.mem-line${lineIdx + 1}`);
    elCurrLine.classList.remove('focus')
    console.log(elCurrLine)
    if (gMeme.lines.length - 1 > lineIdx) lineIdx++
        else lineIdx = 0;
    gMeme.selectedLineIdx = lineIdx
    const elNewLine = document.querySelector(`.mem-line${lineIdx + 1}`);
    elNewLine.classList.add('focus')
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addInputListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderImgAndLines()
    })
}

function addInputListeners() {
    for (let i = 0; i < gMeme.lines.length; i++) {
        const elInput = document.querySelector(`[name="input${i + 1}"]`);
        elInput.addEventListener('input', onUpdateLineValue);
        const elTextColor = document.querySelector(`[name="line-color-${i + 1}"]`)
        elTextColor.addEventListener('input', onColorChange);

        const elStrokeColor = document.querySelector(`[name="stroke-color-${i + 1}"]`)
        elStrokeColor.addEventListener('input', onStrokeChange);
    }
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = ev.touches ? getTouchEvPos(ev) : getEvPos(ev)

    // console.log(ev);
    // console.log(ev.touches);
    // console.log('check cirds', ev.view.Hammer.DIRECTION_VERTICAL)
    console.log('pos', pos);
    // console.log('isLineClicked?', isLineClicked(pos))
    // const hmrContainer = new Hammer(gElCanvas);
    // hmrContainer.on('panleft panright', (ev) => {
    //     console.log('checkkkkkk', ev)
    // })

    if (!isLineClicked(pos)) return
    setLineDrag(true)
        // gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function setLineDrag(isDrag) {
    gIsDragging = isDrag
}

function onMove(ev) {

    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (gIsDragging) {
        const pos = ev.touches ? getTouchEvPos(ev) : getEvPos(ev)
        const dx = pos.x - line.posX
        const dy = pos.y - line.posY
            // line.posX = pos.x
            // line.posY = pos.y
        line.posX += ev.movementX
        line.posY += ev.movementY
            //for touch inner function:
            // if (ev.values)
            // console.log('checkkkkkk', ev)

        // function doTinder() {

        //     const hmrContainer = new Hammer(gElCanvas);

        //     hmrContainer.on('panleft panright', (ev) => {
        //         // if (ev.target.nodeName !== 'IMG') return;

        //         line.posX = ev.target.offsetWidth
        //         line.posY = ev.target.offsetTop


        //         // var side = (ev.type === 'panright') ? 'Right' : 'Left';
        //         // var txt = (ev.type === 'panright') ? 'Yes!' : 'Nope...';

        //         // ev.target.classList.add('animated', `fadeOut${side}`)

        //         // var elFeedback = elContainer.querySelector('h1');
        //         // elFeedback.innerText = txt;
        //         // elFeedback.classList.add('animated', `tada`)
        //         // setTimeout(() => {
        //         //     elContainer.querySelector('h1').innerHTML = '&nbsp;';
        //         //     elFeedback.classList.remove('animated', `tada`)
        //         // }, 1000)
        //     });
        // }
        // doTinder()

        renderImgAndLines()
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getTouchEvPos(ev) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
        // var pos = {
        //     x: line.posX + ev.target.deltaX,
        //     y: line.posY + ev.target.offsetWidth
        // }
    console.log('from touch func', ev)
    ev.preventDefault()
    ev = ev.changedTouches[0]
    var pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    }

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

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('hold', onMove)
    gElCanvas.addEventListener('swipe', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}