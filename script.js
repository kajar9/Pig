// Kajar Murumaa - 131034 IAPB33

window.onload = function() {
    reset();
}

function gid(c) {
    return document.getElementById(c);
}

function reset() {
    turn=true;
    playerscore = 0;
    aiscore = 0;
    z = 0;
    gid("player").innerHTML="Current : Player";
    gid("taring1").innerHTML = "<img src=\"PDICE1.png\">";
    gid("taring2").innerHTML = "<img src=\"PDICE1.png\">";
    gid("playerscore").innerHTML="Player score: " + playerscore;
    gid("aiscore").innerHTML="Player score: " + aiscore;
    clrconsole();
    console("Starting a new game...");
    console("Player starts...");
    gid("btveereta").disabled = false;
    gid("btveereta").innerHTML="<img src=\"VEERETA.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btskip").disabled = false;
    gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btreset").disabled = true;
    //gid("btreset").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
}

// Lihtsustav funktsioon "document.getElementById" väljakutse lühendamiseks

function console(c){
    gid("console").innerHTML+=" " + c + "</br>>";
    gid("console").scrollTop = gid("console").scrollHeight;   
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
    if (i < 350) {
        setTimeout(veereta, i)
    } else {
        gid("btveereta").disabled = false;
        gid("btveereta").innerHTML="<img src=\"VEERETA.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btreset").disabled = false;
        //gid("btreset").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btskip").disabled = false;
        gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        // Siin anna veeretuse lõppväärtus süsteemile
        if(turn){
        console("player rolled " + x + " and " + y);
        }else{console("computer rolled " + x + " and " + y)}
        if(x != y){
        // 0 punkti, temp-score reset, vastase käik
            if(x==1||y==1){
                console("Single \"1\", temp-score lost, opponents turn");
                z = 0;
                turnchange();
            }else{
        // (x+y) punkti, kui erinevad väärtused
                console("temp-score increased by " + (x+y));
                z = z + (x + y);
            }
        }
        // 25 punkti, kui mõlemad ühed
        else if(( x == y ) && ( x == 1 )){
            console("Double \"1\"-s, temp-score increased by 25");
            z = z + 25;
        }
        else{
        // 2(x+y) punkti, kui samad väärtused
            console("Double \"" + x + "\"-s, temp-score increased by " + 4*x);
            z = z + (4 * x);
        }
        gid("tempscore").innerHTML="Tempscore : " + z;
        console("temp-score = " + z);
    }
}

function skip() {
    gid("btskip").innerHTML="<img src=\"SKIPP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />"; gid("btskip").disabled = true;
    setTimeout(function(){
        gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />"; gid("btskip").disabled = false;},200)
    turnchange();
}

function turnchange(){
    turn=!turn;
    if(turn){
        gid("player").innerHTML="Current : Player";
        aiscore+=z;
        gid("aiscore").innerHTML="Computer score: " + aiscore;
        console("Tempscore of " + z + " added to Computer");
        console("Computer score = " + aiscore);
        console("------------------------------------ <");
        console("Turn goes to Player");
    }else{
        gid("player").innerHTML="Current : Computer";
        playerscore+=z;
        gid("playerscore").innerHTML="Player score: " + playerscore;
        console("Tempscore of " + z + " added to Player");
        console("Player score = " + playerscore);
        console("------------------------------------ <");
        console("Turn goes to Computer");
    }
    z=0;
    gid("tempscore").innerHTML="Tempscore : " + z;
    checkwin();
}


function clrconsole(){
    gid("console").innerHTML=">";
}

function checkwin(){
    if(playerscore>100){
        console("Player won!");
        gid("btveereta").disabled = true;
        gid("btveereta").innerHTML="<img src=\"VEERETAD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btskip").disabled = true;
        gid("btskip").innerHTML="<img src=\"SKIPD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btreset").disabled = false;
        //gid("btreset").innerHTML="<img src=\"RESET.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    }
    if(aiscore>100){
        console("Computer won!");
        gid("btveereta").disabled = true;
        gid("btveereta").innerHTML="<img src=\"VEERETAD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btskip").disabled = true;
        gid("btskip").innerHTML="<img src=\"SKIPD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        gid("btreset").disabled = false;
        //gid("btreset").innerHTML="<img src=\"RESET.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    }
}