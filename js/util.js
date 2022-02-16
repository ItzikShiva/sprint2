function resizeCanvas() {
    var elMemMainContainer = document.querySelector('.mem-main-container');
    var elContainer = document.querySelector('.canvas-container');
    var elMemMenu = document.querySelector('.mem-menu-container')
    gElCanvas.width = elContainer.offsetWidth - 20
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