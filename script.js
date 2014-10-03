// Kajar Murumaa - 131034 IAPB33
window.onload = function() {
    reset();
}

function gid(c) {
    return document.getElementById(c);
}

function reset() {
    turn = true;
    playerscore = 0;
    aiscore = 0;
    z = 0;
    h = 2;
    rollcount = 2;
    timesrolled = 0;
    manualstrat=false;
	gid("tempscore").innerHTML = z;
    status("Players turn");
    gid("taring1").style.background = "url('IMAGESET.png') -300px -0px";
    gid("taring2").style.background = "url('IMAGESET.png') -300px -0px";
    gid("playerscore").innerHTML = playerscore;
    gid("aiscore").innerHTML = aiscore;
    clrlogger();
    logger("Starting a new game...");
    logger("Player starts...");
    enablebuttons();
    gid("btreset").disabled = true;
    gid("btreset").style.background = "url('IMAGESET.png') -86px -460px";
}

// Lihtsustav funktsioon "document.getElementById" väljakutse lühendamiseks

function logger(c) {
    gid("logger").innerHTML += " " + c + "</br>>";
    gid("logger").scrollTop = gid("logger").scrollHeight;
}

// Eelfunktsioon, veeretuskäigule ja veeretuseffekti null-seadistus.
function veereta_1() {
    gid("tempscore").innerHTML = "...";
    i = 25
    setTimeout(veereta, i)
        // Lülitan nupud veeretuse ajaks välja
    disablebuttons();
    if (turn) {
        logger("Player is rolling...");
        status("Player rolls");
    } else {
        logger("Computer is rolling...");
        status("Computer rolls");
    }
}

function status(status){
    gid("status").innerHTML = status;
}

// Kordan antud funktsiooni, suurendades pauside ( setTimeOut ) suurust, et simuleerida aeglustuvaid täringuid.
// kui timeout suurus on juba üle 350ms, siis lõpetan veeremised. Else funktsioonist võtan vastuse järgmistesse protsessidesse
// Mind ei huvita see, et täringud veerevad sünkroonis. Tekitaks lõpphetke tulemuse võtmisel probleeme.

function veereta() {
        x = Math.floor((Math.random() * 6) + 1);
        y = Math.floor((Math.random() * 6) + 1);
		gid("taring1").style.background = "url('IMAGESET.png') -300px "+((x-1)*(-75))+"px";
        gid("taring2").style.background = "url('IMAGESET.png') -300px "+((y-1)*(-75))+"px";
        i += 25
        if (i < 350) {
            setTimeout(veereta, i)
        } else {
            // Siin anna veeretuse lõppväärtus süsteemile
            if (turn) {
                logger("Player rolled " + x + " and " + y);
            } else {
                logger("Computer rolled " + x + " and " + y)
            }
            if (x != y) {
                // 0 punkti, temp-score reset, vastase käik
                if (x == 1 || y == 1) {
                    logger("Single \"1\", temp-score lost, opponents turn");
                    z = 0;
                    logger("Temp-score = " + z);
                    turnchange();
                    return 0;
                } else {
                    // (x+y) punkti, kui erinevad väärtused
                    logger("Temp-score increased by " + (x + y));
                    z = z + (x + y);
                    logger("Temp-score = " + z);
                }
            }
            // 25 punkti, kui mõlemad ühed
            else if ((x == y) && (x == 1)) {
                logger("Double \"1\"-s, temp-score increased by 25");
                z = z + 25;
                logger("Temp-score = " + z);
            } else {
                // 2(x+y) punkti, kui samad väärtused
                logger("Double \"" + x + "\"-s, Temp-score increased by " + 4 * x);
                z = z + (4 * x);
                logger("Temp-score = " + z);
            }
            gid("tempscore").innerHTML = z;


            if (turn) {
                // Kui veeretuse lõpus on jätkuvalt kasutaja käik, lülitan nupud sisse
				if (checkwin()) return true;
                enablebuttons();
                status("Players turn");
            } else {
                // Kui veeretuse lõpus on AI käik, siis jätkan eelnevalt valitud strateegiat. (Timeout sujuvust loov mõtlemisaeg)
                status("Computers turn");
                setTimeout(strat, 2000);
            }
        }
    }
    // Nuppude sisse ja väljalülitamine
function disablebuttons() {

    gid("btveereta").disabled = true;
    gid("btveereta").style.background = "url('IMAGESET.png') -225px -492px";
    gid("btskip").disabled = true;
    gid("btskip").style.background = "url('IMAGESET.png') -75px -492px";
    gid("btreset").disabled = true;
    gid("btreset").style.background = "url('IMAGESET.png') -86px -460px";
}

function enablebuttons() {
    gid("btveereta").disabled = false;
    gid("btveereta").style.background = "url('IMAGESET.png') -150px -492px";
    gid("btskip").disabled = false;
    gid("btskip").style.background = "url('IMAGESET.png') 0px -492px";
    gid("btreset").disabled = false;
    gid("btreset").style.background = "url('IMAGESET.png') 0px -460px";
}

function skip() {
    if (turn) {
        logger("Player decided to skip turn...");
    } else {
        logger("Computer decided to skip turn...");
    }
    turnchange();
}

function turnchange() {
    turn = !turn;
    if (turn) {
        gid("status").innerHTML = "Players turn";
        aiscore += z;
        gid("aiscore").innerHTML = aiscore;
        logger("Tempscore of " + z + " added to Computer");
        logger("Computer score = " + aiscore);
		if (checkwin()) return true;
        logger("");
        logger("-------------------------------- <");
        logger("Turn goes to Player");
        enablebuttons();
    } else {
        gid("status").innerHTML = "Computers turn";
        playerscore += z;
        gid("playerscore").innerHTML = playerscore;
        logger("Tempscore of " + z + " added to Player");
        logger("Player score = " + playerscore);
		if (checkwin()) return true;
        logger("");
        logger("-------------------------------- <");
        logger("Turn goes to Computer");
        disablebuttons();
        // Kuna algab uus AI käik, siis valin uue strateegia
        stratselect();
    }
    z = 0;
    gid("tempscore").innerHTML = z;
    checkwin();
}

function clrlogger() {
    gid("logger").innerHTML = ">";
}

function stratcntrl(){
	if(gid("checkstrat").checked){
		if(gid("stratx").value<0 || gid("stratx").value>100 || gid("stratx").value==""){
			manualstrat=false;
			gid("msgstrat").innerHTML="Strategy control disabled<br>Invalid input ( 0 - 100 )<br>Using built-in strategy list";
			return false;
		}
		manualstrat=true;
		gid("msgstrat").innerHTML="Strategy Control Enabled<br>Rolling until "+gid("stratx").value;
	}
	else{
		gid("msgstrat").innerHTML="Strategy control disabled<br>Using built-in strategy list";
		manualstrat=false;
	}
}

function stratselect() {
    if(manualstrat){
		rval=gid("stratx").value;
		h=2
		console.log("Manual control strategy #2");
		console.log("Roll until " + rval + " or more");
		setTimeout(strat, 500);
		return 0;
	}
	// s = number of strategies
    s = 3;
    timesrolled = 0;
    rollcount = 1 + Math.floor((Math.random() * 5) + 1);
    rval = 3 + Math.floor((Math.random() * 27) + 1);
    // Kui AI on kaotamas, siis on võimalik valida esimest strateegiat, ehk veeretada, kuni jõuab järgi
    if ((aiscore < playerscore) && (playerscore - aiscore < 20)) {
        h = Math.floor((Math.random() * s) + 1);
        // Muul juhul tegutsen ainult ülejäänud strateegiatega
    } else {
        h = 1 + Math.floor((Math.random() * (s - 1)) + 1);
    }
    console.log("Choosing strategy #" + h);
    if (h == 1) console.log("Roll enough times to catch up with player");
    if (h == 2) console.log("Roll until " + rval + " or more");
    if (h == 3) console.log("Rolling " + rollcount + " times");
    setTimeout(strat, 500);
}

// Here come AI strategies

function strat() {
    if (aiscore + z > 100) {
        turnchange();
        return true;
    }
    if (h == 1) { // Roll until temp-score insures lead, also only possible to run only if behind player, but still selected at random. And if difference is under 20
        if (z + aiscore < playerscore) {
            veereta_1();
        } else {

            skip();
        }

    } else if (h == 2) { // Roll until temp-score is bigger than random value between 4 and 30
        if (z < rval) {
            veereta_1();
        } else {
            skip();
        }
    } else if (h == 3) { // Roll a random balue between 2 and 5 times
        if (timesrolled < rollcount) {
            timesrolled++
            veereta_1();
        } else {
            skip();
        }
    } else {
        turnchange();
    }
}

function checkwin() {
    if (playerscore > 100) {
        status("Player WINS!");
		logger("");
        logger("-------------------------------- <");
        logger("-------------------------------- <");
        logger(">>>>>>>>>>>>Player won!<<<<<<<<< <");
        logger("-------------------------------- <");
        logger("-------------------------------- <");
        disablebuttons();
        gid("btreset").disabled = false;
        gid("btreset").style.background = "url('IMAGESET.png') 0px -460px";
        return true;
    } else if (aiscore > 100) {
        status("Computer WINS!");
		logger("");
        logger("-------------------------------- <");
        logger("-------------------------------- <");
        logger(">>>>>>>>>>>Computer won!<<<<<<<< <");
        logger("-------------------------------- <");
        logger("-------------------------------- <");
        disablebuttons();
        gid("btreset").disabled = false;
        gid("btreset").style.background = "url('IMAGESET.png') 0px -460px";
        return true;
    }
    return false;
}