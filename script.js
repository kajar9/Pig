// Kajar Murumaa - 131034 IAPB33

window.onload = function() {
    reset();
}

function gid(c) {
    return document.getElementById(c);
}

function reset() {
	turn=true;
    playerscore = 90;
    aiscore = 0;
    z = 0;
	h=2;
	rollcount=2;
	timesrolled=0;
	gid("tempscore").innerHTML="Tempscore : " + z;
    gid("player").innerHTML="Current : Player";
    gid("taring1").innerHTML = "<img src=\"PDICE1.png\">";
    gid("taring2").innerHTML = "<img src=\"PDICE1.png\">";
    gid("playerscore").innerHTML="Player score: " + playerscore;
    gid("aiscore").innerHTML="Player score: " + aiscore;
    clrlogger();
    logger("Starting a new game...");
    logger("Player starts...");
    enablebuttons();
    gid("btreset").disabled = true;
    gid("btreset").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
}

// Lihtsustav funktsioon "document.getElementById" väljakutse lühendamiseks

function logger(c){
    gid("logger").innerHTML+=" " + c + "</br>>";
    gid("logger").scrollTop = gid("logger").scrollHeight;   
}

// Eelfunktsioon, veeretuskäigule ja veeretuseffekti null-seadistus.
function veereta_1() {
    i = 25
    setTimeout(veereta, i)
    disablebuttons();
	if(turn){
		logger("Player is rolling...");
	}else{
		logger("Computer is rolling...");
	}
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
        // Siin anna veeretuse lõppväärtus süsteemile
        if(turn){
            logger("Player rolled " + x + " and " + y);
        }else{
            logger("Computer rolled " + x + " and " + y)
        }
        if(x != y){
        // 0 punkti, temp-score reset, vastase käik
            if(x==1||y==1){
                logger("Single \"1\", temp-score lost, opponents turn");
                z = 0;
                logger("Temp-score = " + z);
                turnchange();
                return 0;
            }else{
        // (x+y) punkti, kui erinevad väärtused
                logger("Temp-score increased by " + (x+y));
                z = z + (x + y);
                logger("Temp-score = " + z);
            }
        }
        // 25 punkti, kui mõlemad ühed
        else if(( x == y ) && ( x == 1 )){
            logger("Double \"1\"-s, temp-score increased by 25");
            z = z + 25;
            logger("Temp-score = " + z);
        }
        else{
        // 2(x+y) punkti, kui samad väärtused
            logger("Double \"" + x + "\"-s, Temp-score increased by " + 4*x);
            z = z + (4 * x);
            logger("Temp-score = " + z);
        }
        gid("tempscore").innerHTML="Tempscore : " + z;
        
        
        if(turn){
            enablebuttons();
        }else{
			setTimeout(strat, 2000);
        }
    }
}

function disablebuttons(){
    gid("btveereta").disabled = true;
    gid("btveereta").innerHTML="<img src=\"VEERETAD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btreset").disabled = true;
    gid("btreset").innerHTML="<img src=\"RESETD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btskip").disabled = true;
    gid("btskip").innerHTML="<img src=\"SKIPD.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
}
function enablebuttons(){
    gid("btveereta").disabled = false;
    gid("btveereta").innerHTML="<img src=\"VEERETA.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btreset").disabled = false;
    gid("btreset").innerHTML="<img src=\"RESET.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
    gid("btskip").disabled = false;
    gid("btskip").innerHTML="<img src=\"SKIP.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
}

function skip(){
	if(turn){
		logger("Player decided to skip turn");
	}else{
		logger("Computer decided to skip turn");
	}
	turnchange();
}

function turnchange(){
    turn=!turn;
    if(turn){
        gid("player").innerHTML="Current : Player";
        aiscore+=z;
        gid("aiscore").innerHTML="Computer score: " + aiscore;
        logger("Tempscore of " + z + " added to Computer");
        logger("Computer score = " + aiscore);
		logger("");
        logger("----------------------------------- <");
        if(checkwin())return true;
        logger("Turn goes to Player");
		enablebuttons();
    }else{
        gid("player").innerHTML="Current : Computer";
        playerscore+=z;
        gid("playerscore").innerHTML="Player score: " + playerscore;
        logger("Tempscore of " + z + " added to Player");
        logger("Player score = " + playerscore);
		logger("");
        logger("----------------------------------- <");
        if(checkwin())return true;
        logger("Turn goes to Computer");
        disablebuttons();
        stratselect();
    }
    z=0;
    gid("tempscore").innerHTML="Tempscore : " + z;
    checkwin();
}

function clrlogger(){
    gid("logger").innerHTML=">";
}

function stratselect(){
    // s = number of strategies
    s=3;
	timesrolled=0;
	rollcount=1+Math.floor((Math.random() * 5) + 1);
	rval=3+Math.floor((Math.random() * 27) + 1);
    if((aiscore<playerscore) && (playerscore-aiscore<20)){
        h = Math.floor((Math.random() * s) + 1);
    }else{
        h = 1 + Math.floor((Math.random() * (s-1)) + 1);
    }
	console.log("Choosing strategy #"+h);
	if(h==2)console.log("Roll until "+rval+" or more");
	if(h==3)console.log("Rolling "+rollcount+" times");
    setTimeout(strat, 500);
}

// Here come AI strategies

function strat(){
    if(aiscore+z>100){
		turnchange();
		return true;
	}
	if
        (h==1){ // Roll until temp-score insures lead, also only possible to run only if behind player, but still selected at random. And if difference is under 20
        if(z+aiscore<playerscore){
            veereta_1();
        }else{
            
            skip();
        }
        
    }else if
        (h==2){ // Roll until temp-score is bigger than random value between 4 and 30
		if(z<rval){
			veereta_1();
		}else{
            skip();
        }
    }else if
        (h==3){ // Roll a random balue between 2 and 5 times
		if(timesrolled<rollcount){
			timesrolled++
			veereta_1();
		}else{
            skip();
		}
	}else{
		turnchange();
	}
}

function checkwin(){
    if(playerscore>100){
        logger("----------------------------------- <");
        logger(">>>>>>>>>>>>Player won!<<<<<<<<<<<< <");
        logger("----------------------------------- <");
        logger("----------------------------------- <");
        disablebuttons();
        gid("btreset").disabled = false;
        gid("btreset").innerHTML="<img src=\"RESET.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        return true;
    }
    else if(aiscore>100){
        logger("----------------------------------- <");
        logger(">>>>>>>>>>>Computer won!<<<<<<<<<<< <");
        logger("----------------------------------- <");
        logger("----------------------------------- <");
        disablebuttons();
        gid("btreset").disabled = false;
        gid("btreset").innerHTML="<img src=\"RESET.png\" width=\"75\" heght=\"75\" alt=\"submit\" />";
        return true;
    }
    return false;
}