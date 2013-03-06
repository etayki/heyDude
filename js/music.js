//          [top rec offset, top rec width, bottom rec offset, bottom rec width]
//          There are 85 keys. The lowest note is 21 and the highest is 108.
var keys = [
            [4,7,0,15],         // 0  - WHITE
            [11,11,0,0],        // 1  - BLACK
            [21,11,17,15],      // 2  - WHITE
            [34,10,34,15],      // 3  - WHITE
            [43,11,0,0],        // 4  - BLACK
            [54,9,51,15],      	// 5  - WHITE
            [62,11,0,0],        // 6  - BLACK
            [72,11,68,15],     	// 7  - WHITE
            [85,11,85,15],      // 8  - WHITE
            [95,10,0,0],       	// 9  - BLACK
            [105,8,102,15],     // 10 - WHITE
            [113,10,0,0]        // 11 - BLACK
           ];

var tempo = 1500;
var measure = 1;
var oldMeasure = 1;
var timers = new Array();

$(document).ready(function() {
	/* Load the MIDI Player*/
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			// MIDI Player has loaded, so now allow user interaction
			drawPiano();
			var play = '<button type="button" onclick="didPressPlayButton()" style="color: green; width:60px;height:28px;position:absolute;top:135px;left:175px">Play</button>';
			var pause = '<button type="button" onclick="didPressPauseButton()" style="color: green; width:60px;height:28px;position:absolute;top:135px;left:245px">Pause</button>';
			$("#button").after(play);
			$("#button").after(pause);
		}
	});	
});

function didPressPlayButton()
{
	for (var i=0; i < tune.length;i++)
	{
		if (tune[i][2] < 4* (measure - 1))
		{
			continue;
		}
		else if (tune[i][2] >= 4 * measure - 0)
		{
			break;
		}
	
		playNote(tune[i][0],tune[i][1],tune[i][2] - (measure - 1) * 4,tune[i][3]);
	}	
	
}

function didPressPauseButton()
{
	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);
		$("#"+note+"topRec").remove();
		$("#"+note+"botRec").remove();
	}

	// clear all timers in the array
	for (var i = 0; i < timers.length; i++)
	{
	    clearTimeout(timers[i]);
	}
}

function debug(param)
{
	try { param = param.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
	catch(err){}
	param = param + "<br>";
	$("debug").before(param);
}

function playNote(note, velocity, delay, duration)
//function playNote(delay, duration, note, velocity)
{
	var key = note - 21;
	var idxKey = key % 12;
	var octave = Math.floor(key/12);

	var color = "green";
	if (note < 55 && duration > 0.4)
	{
		color = "red";
	}

	//debug("Note="+note+"<br>Key="+key+"<br>idxKey="+idxKey+"<br>octave="+octave);
	topRecOffset = 7 + keys[idxKey][0] + 119 * octave;
	botRecOffset = 7 + keys[idxKey][2] + 119 * octave;
	var topRec='<div id="'+note+'topRec" style="position:absolute;z-index:3;top:211px;left:'+topRecOffset+'px; background-color:'+color+';width:'+keys[idxKey][1]+'px;height:42px;border:0px solid #000"></div>';
	var botRec='<div id="'+note+'botRec" style="position:absolute;z-index:3;top:253px;left:'+botRecOffset+'px; background-color:'+color+';width:'+keys[idxKey][3]+'px;height:31px;border:0px solid #000"></div>';

	// Turn note on (sound + visual)
	timers.push(setTimeout(function() {
		//debug("ON " + delay + " " + note + " " + duration);
		MIDI.setVolume(0, 127);
		MIDI.noteOn(0, note, velocity, 0);                        
		$("#keyboard").after(topRec);
		$("#keyboard").after(botRec);
	}, (delay)*tempo));

	// Turn note off (sound)
	timers.push(setTimeout(function() {
		//debug("OFF " + delay + " " + note);
		MIDI.noteOff(0, note, 0);
	}, (delay+duration)*tempo));

	// Hide note (visualy)
	timers.push(setTimeout(function() {
		$("#"+note+"topRec").remove();
		$("#"+note+"botRec").remove();
	}, (delay+duration)*tempo - tempo/20)); // Subtract a little so that if the note is pressed again it is visible
}

/* --- ================ SLIDER ================== */

var slider1, slider2;
function jr() {
//    slider1 = new dhtmlxSlider("sliderBox1", 260, "dhx_skyblue");
//    slider1.setImagePath("./slider/imgs/");
//    slider1.setStep(50);
//    slider1.attachEvent("onChange", function(nv) {
//	document.getElementById("qual").value = nv;
//    });
    //slider1.init();
    //slider2 = new dhtmlxSlider("sliderBox2", 260, "dhx_skyblue");
    slider2 = new dhtmlxSlider("sliderBox2", tune[tune.length-1][2]*2, "dhx_skyblue", false, 1, Math.floor(tune[tune.length-1][2]/4)+1, 1, 1);
    slider2.setImagePath("./slider/imgs/");
    slider2.attachEvent("onChange", function(nv) {
	document.getElementById("rate").value = nv;
			didPressPauseButton();
		measure = document.getElementById("rate").value;
		didPressPlayButton();
    });
    slider2.setMin(1);
    slider2.setValue(1);
    document.getElementById("rate").value = 1;
    slider2.setMax(Math.floor(tune[tune.length-1][2]/4)+1);
    slider2.init();
};

function updateSlider(cd, val) {
    if (isNaN(Number(val)))
        val = 0;
    if (cd == '1') {
        if (val > 50 && val < 100)
            val = 50;
        else if (val < 50 && val > 0)
            val = 0;
        slider1.setValue(val);
    } else {
        if (val > 50)
            val = 50;
        slider2.setValue(val);
        document.getElementById("rate").value = val;
	measure = val;
    }
};

function onMouseDownSlider()
{
       oldMeasure = document.getElementById("rate").value;
       //debug("Down");
}

function onMouseUpSlider()
{
       if (oldMeasure != document.getElementById("rate").value)
       {
		//didPressPauseButton();
		//measure = document.getElementById("rate").value;
		//didPressPlayButton();

       }
       //debug("Up");	
}

function didPressMinusIncrement()
{
	if (measure > 1)
	{
		updateSlider(2,measure-1);
		didPressPauseButton();
		didPressPlayButton();
	}
}

function didPressPlusIncrement()
{
	updateSlider(2,measure+1);
	didPressPauseButton();
	didPressPlayButton();
}

$(document).keydown(function(e){
    if (e.keyCode == 37) { 
       didPressMinusIncrement();
    }
    else if (e.keyCode == 39) {
	didPressPlusIncrement();
    }
    else if (e.keyCode == 32){
	didPressPauseButton();
	didPressPlayButton();	
    }
});

function drawPiano()
{

//11x42 width black
//15x73 width white
	whiteKeySpacing = 2;

	whiteKeyWidth = 20; // between 15 and 25
	whiteKeyHeight = Math.floor(whiteKeyWidth * 73/15);
	whiteKeyOffset = 7;

	blackKeyWidth = Math.floor(whiteKeyWidth * 0.32) * 2 + whiteKeySpacing;
	blackKeyHeight = Math.floor(whiteKeyHeight * 0.58);
	blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
	
	for (var key = 0; key < 88; key++)
	{
		var octave = Math.floor(key/12);
		var keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key !=0) whiteKeyOffset += whiteKeyWidth + whiteKeySpacing;
			var whiteKey='<div id="whiteKey-'+key+'" style="position:absolute;z-index:1;top:211px;left:'+whiteKeyOffset+'px; background-color:blue;width:'+whiteKeyWidth+'px;height:'+whiteKeyHeight+'px"></div>';
			$("#keyboard").after(whiteKey);
			//debug(whiteKey);
		}
		else
		{
			blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
			var blackKey='<div id="blackKey-'+key+'" style="position:absolute;z-index:2;top:211px;left:'+blackKeyOffset+'px; background-color:red;width:'+blackKeyWidth+'px;height:'+blackKeyHeight+'px;border:0px solid #000"></div>';
			$("#keyboard").after(blackKey);
			//debug(blackKey);
		}
	}
	
	whiteKeyOffset += 6 + whiteKeyWidth;
	bgHeight = 217 + whiteKeyHeight;
	var pianoBackground='<div style="position:absolute;z-index:0;top:0px;left:0px; background-color:black;width:'+whiteKeyOffset+'px;height:'+bgHeight+'px;border:0px solid #000"></div>';	
	$("#keyboard").after(pianoBackground);
	var redLine='<div style="position:absolute;z-index:1;top:210px;left:0px; background-color:#680000 ;width:893px;height:2px;border:0px solid #000"></div>';
	$("#keyboard").after(redLine);
}