var game = document.getElementById('game')
var character = document.getElementById('character')

function moveleft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left > 0) {
        character.style.left = left - 2 + 'px'
    }
}

function moveright() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left < 380) {
        character.style.left = left + 2 + 'px'
    }
}

var counter = 0;
var both = 0;
var interval;

document.addEventListener('keydown', (event) => {
    if (both == 0) {
        both++;
        if (event.key == "ArrowLeft") {
            interval = setInterval(moveleft, 1);
        }
        if (event.key == "ArrowRight") {
            interval = setInterval(moveright, 1);
        }
    }
})
document.addEventListener('keyup', () => {
    clearInterval(interval)
    both = 0;
})
var currentblock = []
var drop = 0;
var blocks = setInterval(() => {
    var blocklast = document.getElementById('block' + (counter - 1))
    var holelast = document.getElementById('hole' + (counter - 1))
    if (counter > 0) {
        var blocklasttop = parseInt(window.getComputedStyle(blocklast).getPropertyValue('top'))
        var holelasttop = parseInt(window.getComputedStyle(holelast).getPropertyValue('top'))
    }
    if (blocklasttop < 400 || counter == 0) {
        var block = document.createElement('div')
        var hole = document.createElement('div')
        block.setAttribute('class', 'block')
        block.setAttribute('id', 'block' + counter)
        hole.setAttribute('class', 'hole')
        hole.setAttribute('id', 'hole' + counter)
        block.style.top = blocklasttop + 100 + 'px'
        hole.style.top = holelasttop + 100 + 'px'
        var random = Math.floor(Math.random() * 360)
        hole.style.left = random + 'px'
        game.appendChild(block)
        game.appendChild(hole)
        currentblock.push(counter)
        counter++;
    }
    var charactertop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    var characterleft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    var drop = 0;
    if (charactertop <= 0) {
        alert("Game over. Score: " + (counter - 9));
        clearInterval(block);
        location.reload();
    }
    for (var i = 0; i < currentblock.length; i++) {
        let current = currentblock[i]
        let iblock = document.getElementById('block' + current)
        let ihole = document.getElementById('hole' + current)
        let iblocktop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'))
        let iholeleft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'))
        iblock.style.top = iblocktop - 0.5 + 'px'
        ihole.style.top = iblocktop - 0.5 + 'px'
        if (iblocktop < -20) {
            currentblock.shift()
            iblock.remove()
            ihole.remove()
        }
        if (iblocktop - 20 < charactertop && iblocktop > charactertop) {
            drop++
            if (iholeleft <= characterleft && iholeleft + 20 >= characterleft) {
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