let game = document.getElementById('game')
let character = document.getElementById('character')
let interval;
let both = 0;
let counter = 0;
let currentblocks = []

function left() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left > 0) {
        character.style.left = left - 2 + 'px'
    }
}

function right() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left < 380) {
        character.style.left = left + 2 + 'px'
    }
}

document.addEventListener('keydown', (event) => {
    if (both == 0) {
        both++;
        if (event.key == 'ArrowLeft') {
            interval = setInterval((left), 1);
        }
        if (event.key == 'ArrowRight') {
            interval = setInterval((right), 1);
        }
    }
})

document.addEventListener('keyup', () => {
    clearInterval(interval)
    both = 0;
})

let blocks = setInterval(() => {
    let blocklast = document.getElementById('block' + (counter - 1))
    let holelast = document.getElementById('hole' + (counter - 1))
    if (counter > 0) {
        var blocklasttop = parseInt(window.getComputedStyle(blocklast).getPropertyValue('top'))
        var holelasttop = parseInt(window.getComputedStyle(holelast).getPropertyValue('top'))
    }
    var charactertop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterleft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if (charactertop <= 0) {
        console.log(counter)
        alert('bro your good score is: ' + (counter - 10))
        clearInterval(blocks)
        location.reload()
    }
    if (blocklasttop < 480 || counter == 0) {
        let block = document.createElement('div')
        let hole = document.createElement('div')
        block.setAttribute('class', 'block')
        block.setAttribute('id', 'block' + (counter))
        hole.setAttribute('class', 'hole')
        hole.setAttribute('id', 'hole' + (counter))
        block.style.top = blocklasttop + 100 + 'px'
        hole.style.top = holelasttop + 100 + 'px'
        let random = Math.floor(Math.random() * 360)
        hole.style.left = random + 'px'
        game.appendChild(block)
        game.appendChild(hole)
        currentblocks.push(counter)
        counter++;
    }

    for (i = 0; i < currentblocks.length; i++) {
        let current = currentblocks[i]
        let iblock = document.getElementById('block' + current)
        let ihole = document.getElementById('hole' + current)
        let iblocktop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'))
        let iholeleft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'))
        iblock.style.top = iblocktop - 0.5 + 'px'
        ihole.style.top = iblocktop - 0.5 + 'px'
        if (iblocktop < -20) {
            currentblocks.shift()
            iblock.remove()
            ihole.remove()
        }
        if (iblocktop - 20 < charactertop && charactertop < iblocktop) {
            drop++;
            if (iholeleft <= characterleft && characterleft <= iholeleft + 20) {
                drop = 0;
            }
        }
    }
    if (drop == 0) {
        if (charactertop < 480) {
            character.style.top = charactertop + 2 + 'px'
        }
    } else {
        character.style.top = charactertop - 0.5 + 'px'
    }

}, 1);