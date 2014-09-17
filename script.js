// Kajar Murumaa - 131034 IAPB33

window.onload = function() {
    reset();
}

// Lihtsustav funktsioon "document.getElementById" väljakutse lühendamiseks
function gid(i) {
    return document.getElementById(i);
}

// Eelfunktsioon, veeretuskäigule ja veeretuseffekti null-seadistus.
function veereta_1() {
    i = 25
    setTimeout(veereta, i)
    gid("btveereta").disabled = true;
    gid("btveereta").innerHTML="<img src=\"VEERETAD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btreset").disabled = true;
    //gid("btreset").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btskip").disabled = true;
    gid("btskip").innerHTML="<img src=\"SKIPD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
}

// Kordan antud funktsiooni, suurendades pauside ( setTimeOut ) suurust, et simuleerida aeglustuvaid täringuid.
// kui timeout suurus on juba üle 350ms, siis lõpetan veeremised. Else funktsioonist võtan vastuse järgmistesse protsessidesse
// Mind ei huvita see, et täringud veerevad sünkroonis. Tekitaks lõpphetke tulemuse võtmisel probleeme.

function veereta() {
    x = Math.floor((Math.random() * 6) + 1);
    y = Math.floor((Math.random() * 6) + 1);
    gid("taring1").innerHTML = "<img src=\"PDICE" + x + ".png\">";
    gid("taring2").innerHTML = "<img src=\"PDICE" + y + ".png\">";
    i += 25
    if (i <= 350) {
        setTimeout(veereta, i)
    } else {
        gid("btveereta").disabled = false;
        gid("btveereta").innerHTML="<img src=\"VEERETA.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btreset").disabled = false;
        //gid("btskip").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btskip").disabled = false;
        gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        // Siin anna veeretuse lõppväärtus süsteemile
        console("player rolled " + x + " and " + y);
        if(x != y){
        // 0 punkti, temp-score reset, vastase käik
            if(x==1||y==1){
                console("Single \"1\", temp-score lost, opponents turn");
            }else{
        // (x+y) punkti, kui erinevad väärtused
                console("temp-score increased by " + (x+y));
            }
        }
        // 25 punkti, kui mõlemad ühed
        else if((x == y)&&(x == 1)){
            console("Double \"1\"-s, temp-score increased by 25");
        }
        else{
        // 2(x+y) punkti, kui samad väärtused
            console("Double \"" + x + "\"-s, temp-score increased by " + 4*x);
        }
    }
}

function reset() {
    //
    var playerscore = 0;
    var aiscore = 0;
    var tempscore = 0;
    gid("taring1").innerHTML = "<img src=\"PDICE1.png\">";
    gid("taring2").innerHTML = "<img src=\"PDICE1.png\">";
    
    clrconsole();
    console("Starting a new game...");
    console("Player starts...");
}

function skip() {
    gid("btskip").innerHTML="<img src=\"SKIPP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />"; gid("btskip").disabled = true;
    setTimeout(function(){
        gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />"; gid("btskip").disabled = false;},200)
    console("Turn goes to X");
    // Anna käik teisele mängijale
}

function console(c){
    gid("console").innerHTML+=" " + c + "</br>>";
    gid("console").scrollTop = gid("console").scrollHeight;   
}
function clrconsole(){
    gid("console").innerHTML=">";
}