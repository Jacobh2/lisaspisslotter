
function NyLott(victory){
    var sound = document.getElementById("ny_lott")
    sound.play();
    sound.onended = function() {
        // Go to new lott
        if(victory){
            window.location="/new?won=true";
        } else {
            window.location="/new?won=false";
        }
        
    };
}