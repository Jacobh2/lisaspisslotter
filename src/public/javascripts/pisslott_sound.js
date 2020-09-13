const urlParams = new URLSearchParams(window.location.search);
const won = urlParams.get('won') === 'true';

tiles_scratched = {
    'a': [false, false, false],
    'b': [false, false, false],
    'c': [false, false, false]
}

function tileScratched(elementId){
    var parts = elementId.split("");
    console.log("Setting", parts, "as scratched");
    var index = parseInt(parts[1]);
    tiles_scratched[parts[0]][index] = true;
}


function checkDone(){
    console.log("Scratched:", tiles_scratched);
    var allScratched = Object.values(tiles_scratched).flat(1);
    console.log("allScratched:", allScratched);
    var done = allScratched.every((v) => v);
    if (done) {
        window.location="/?won="+won;
    }
}


// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
    var x, lastTime = 0, vendors = ['webkit', 'moz', 'ms', 'o'];
    for(x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
  
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
  
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


function setScratchArea(elementId, soundId){
    var containerEl = document.getElementById(elementId);
    var overlayImgUrl = '/images/tile_klaver.png';
    var brushImgUrl = '/images/brush.png';
    var revealPercent = 50;

    // event handler that fades out the overlay once 50% of it has been removed
    function onReveal(){
        containerEl.className += ' revealed';

        // NOTE: really weird workaround to force Edge 16 to actually detect the css class name addition and render the fade out transition. getElementById doesn't work, it actually needs to be getElementsByTagName. Any style could be changed (like fontSize) to trigger the update
        if(window.navigator.userAgent.indexOf("Edge") > -1){
            document.getElementsByTagName('canvas')[0].style.width = '100%';
        }
        console.log("Tile", elementId, "is revealed, will play", soundId);
        playSound(soundId);
        tileScratched(elementId);
    }

    if(ScratchIt.isSupported()){
        ScratchIt(containerEl, overlayImgUrl, brushImgUrl, onReveal, revealPercent);
    }
}

function playSound(soundId){
    var sound = document.getElementById(soundId);
    sound.play();
    sound.onended = function() {
        checkDone();
    };
}

var sounds = ["anton_skratt", "drivmedel_100_kr", "hamburgare_eller_baguette", "klipp_och_klistra", "ohfan", "pest_eller_kolera", "redan_samst", "redbull", "vinner_ingenting"];
// good enough random shuffle
sounds.sort(function (a, b) { return 0.5 - Math.random() })
console.log("Sound order:", sounds);

var tiles = ["a0", "a1", "a2", "b0", "b1", "b2", "c0", "c1", "c2"];

var victory = ["icons/beer/svg/002-beer.svg", "icons/beer/svg/016-cheers.svg", "icons/beer/svg/009-smoking.svg", "icons/beer/svg/016-cheers.svg", "icons/beer/svg/040-beer.svg", "icons/beer/svg/002-beer.svg", "icons/beer/svg/046-cocktail.svg", "icons/beer/svg/021-hop.svg", "icons/beer/svg/016-cheers.svg"];
var defete = ["icons/beer/svg/014-beer.svg", "icons/beer/svg/026-bar.svg", "icons/beer/svg/009-smoking.svg", "icons/beer/svg/049-chicken.svg", "icons/beer/svg/040-beer.svg", "icons/beer/svg/008-pub.svg", "icons/beer/svg/046-cocktail.svg", "icons/beer/svg/008-pub.svg", "icons/beer/svg/049-chicken.svg"];



console.log("This willl be a victory:", won);


for (let i = 0; i < tiles.length; i++) {

    var image = document.createElement("IMG");
    if(won){
        image.src = victory[i];
    } else {
        image.src = defete[i];
    }

    document.getElementById(tiles[i]).appendChild(image)
    setScratchArea(tiles[i], sounds[i]);
}
