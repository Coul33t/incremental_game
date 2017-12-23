var cookies = 1000;
var cursors = 0;
var cursor_cost = 10;
var meta_cursors = 0;
var meta_cursors_cost = 100;
var meta_meta_cursors = 0;
var meta_meta_cursors_cost = 1000;


function cookieClick(number) {
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = Math.floor(cookies);
}

function buyCursor() {     
     if (cookies >= cursor_cost) {
        cursors = cursors + 1;
        cookies = cookies - cursor_cost;
        document.getElementById("cookies").innerHTML = Math.floor(cookies);
        document.getElementById("cursors").innerHTML = Math.floor(cursors);
        cursor_cost = Math.floor(10 * Math.pow(1.1,cursors));
        document.getElementById('cursorCost').innerHTML = cursor_cost;
     }
}

function createCursor(number) {
    cursors = cursors + number;
    document.getElementById("cursors").innerHTML = Math.floor(cursors);
}

function buyMetaCursor() {

    if (cookies >= meta_cursors_cost) {
        meta_cursors = meta_cursors + 1;
        cookies = cookies - meta_cursors_cost;
        document.getElementById("cookies").innerHTML = Math.floor(cookies);
        document.getElementById("metaCursors").innerHTML = Math.floor(meta_cursors);
        meta_cursors_cost = Math.floor(100 * Math.pow(1.1,meta_cursors));
        document.getElementById('metaCursorCost').innerHTML = meta_cursors_cost;
     }
}

function createMetaCursor(number) {
    meta_cursors = meta_cursors + number;
    document.getElementById("cursors").innerHTML = Math.floor(cursors);
}

function buyMetaMetaCursor() {
    if (cookies >= meta_meta_cursors_cost) {
        meta_meta_cursors = meta_meta_cursors + 1;
        cookies = cookies - meta_meta_cursors_cost;
        document.getElementById("cookies").innerHTML = Math.floor(cookies);
        document.getElementById("metaMetaCursors").innerHTML = Math.floor(meta_meta_cursors);
        meta_meta_cursors_cost = Math.floor(100 * Math.pow(1.1,meta_meta_cursors));
        document.getElementById('metaMetaCursorCost').innerHTML = meta_meta_cursors_cost;
     }
}

function updateCost() {
    cursor_cost = Math.floor(10 * Math.pow(1.1,cursors));
    meta_cursors_cost = Math.floor(100 * Math.pow(1.1,meta_cursors));
    meta_meta_cursors_cost = Math.floor(100 * Math.pow(1.1,meta_meta_cursors));
}

function updateDisplay() {
    document.getElementById("cookies").innerHTML = Math.floor(cookies);
    document.getElementById("cursors").innerHTML = Math.floor(cursors);
    document.getElementById("metaCursors").innerHTML = Math.floor(meta_cursors);
    document.getElementById("metaMetaCursors").innerHTML = Math.floor(meta_meta_cursors);
    document.getElementById('cursorCost').innerHTML = cursor_cost;
    document.getElementById('metaCursorCost').innerHTML = meta_cursors_cost;
    document.getElementById('metaMetaCursorCost').innerHTML = meta_meta_cursors_cost;
}

var timeInterval = 50;
var accumulate = 0;

window.setInterval(function() {
    cookieClick(cursors*timeInterval/1000);
    accumulate += timeInterval;
    createCursor(meta_cursors);
    createMetaCursor(meta_meta_cursors);
    updateCost();
    accumulate = 0;
    }
    updateDisplay();
},timeInterval)