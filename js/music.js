//          [top rec offset, top rec width, bottom rec offset, bottom rec width]
//          There are 85 keys. The lowest note is 21 and the highest is 108.


var tempo = 1500;
var measure = 1;
var oldMeasure = 1;
var timers = new Array();
var noteOn = new Array();

$(document).ready(function() {
	/* Load the MIDI Player*/
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			// MIDI Player has loaded, so now allow user interaction
			drawPiano();
			drawPianoControls();
		}
	});	
});

function didPressPlayButton()
{
	if (noteOn.length)
	{
		// We are already playing, so return
		return;
	}
	
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
	
		playNote(tune[i][0],tune[i][1],tune[i][2] - (measure - 1) * 4,tune[i][3], tune[i][4]);
	}
	timers.push(setTimeout(function() {
		didPressPlayButton()	
	}, 4*tempo));	
	
}

function didPressStopButton()
{
	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);
		resetNote(note-21);
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

function playNote(note, velocity, delay, duration, finger)
//function playNote(delay, duration, note, velocity)
{
	var key = note - 21;
	var keyIdx = key % 12;
	var color = "green";
	
	if (finger < 0)
	{
		color = "red";
		finger *= -1;
	}

	// Turn note on (sound + visual)
	timers.push(setTimeout(function() {
		//debug("ON " + delay + " " + note + " " + duration);
		MIDI.setVolume(0, 127);
		MIDI.noteOn(0, note, velocity, 0);                        
		$("#key-"+key).css("background-color",color);
		$("#keyLabel-"+key).text(finger);
		noteOn.push(note);
	}, (delay)*tempo));

	// Turn note off (sound)
	timers.push(setTimeout(function() {
		//debug("OFF " + delay + " " + note);
		MIDI.noteOff(0, note, 0);
	}, (delay+duration)*tempo));

	// Hide note (visualy)
	timers.push(setTimeout(function() {
		resetNote(key);
	}, (delay+duration)*tempo - tempo/20)); // Subtract a little so that if the note is pressed again it is visible
}

function resetNote(key)
{
	color = "white";
	var keyIdx = key % 12;
	if (keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11)
	{
		color = "black";
	}
	$("#key-"+key).css("background-color",color);
	$("#keyLabel-"+key).text("");
	noteOn.pop(key+21);
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
			didPressStopButton();
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
		//didPressStopButton();
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
		didPressStopButton();
		didPressPlayButton();
	}
}

function didPressPlusIncrement()
{
	updateSlider(2,measure+1);
	didPressStopButton();
	didPressPlayButton();
}

$(document).keydown(function(e){
	if (e.keyCode == 37) { 
	   didPressMinusIncrement();
	}
	else if (e.keyCode == 39) {
	    didPressPlusIncrement();
	}
	else if (e.keyCode == 32) {
		if (noteOn.length)
		{
			didPressStopButton();
		}
		else
		{
			didPressPlayButton();		
		}
	}
});

function drawPiano()
{
	whiteKeySpacing = 2;
	
	// White Key - 15x73
	whiteKeyWidth = 25; // 15-25
	whiteKeyHeight = Math.floor(whiteKeyWidth * 73/15);
	whiteKeyOffset = 7;
	
	// White Key Label
	whiteKeyLabelTop = Math.floor(whiteKeyHeight*0.70);
	whiteKeyLabelLeft = Math.floor(whiteKeyWidth*0.30);
	whiteKeyLabelSize = 60 * whiteKeyWidth/15;

	// Black Key - 11x42
	blackKeyWidth = Math.floor(whiteKeyWidth * 0.32) * 2 + whiteKeySpacing;
	blackKeyHeight = Math.floor(whiteKeyHeight * 0.58);
	blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
	
	// Black Key Label
	blackKeyLabelTop = Math.floor(blackKeyHeight*0.50);
	blackKeyLabelLeft = Math.floor(blackKeyWidth*0.25);
	blackKeyLabelSize = 60 * whiteKeyWidth/15;
	
	for (var key = 0; key < 88; key++)
	{
		var octave = Math.floor(key/12);
		var keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key !=0) whiteKeyOffset += whiteKeyWidth + whiteKeySpacing;
			var whiteKey='<div id="key-'+key+'" style="position:absolute;z-index:1;top:211px;left:'+whiteKeyOffset+'px; background-color:white;width:'+whiteKeyWidth+'px;height:'+whiteKeyHeight+'px"></div>';
			var whiteKeyLabel = '<div id="keyLabel-'+key+'" style="position:absolute;top:'+whiteKeyLabelTop+'px;left:'+whiteKeyLabelLeft+'px;z-index:2;font-size:'+whiteKeyLabelSize+'%";font-weight:bold></div>';
			$("#keyboard").after(whiteKey);
			$("#key-"+key).append(whiteKeyLabel);
			//debug(whiteKey);
		}
		else
		{
			blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
			var blackKey='<div id="key-'+key+'" style="position:absolute;z-index:2;top:211px;left:'+blackKeyOffset+'px; background-color:black;width:'+blackKeyWidth+'px;height:'+blackKeyHeight+'px;border:0px solid #000"></div>';
			var blackKeyLabel = '<div id="keyLabel-'+key+'" style="color:purple;position:absolute;top:'+blackKeyLabelTop+'px;left:'+blackKeyLabelLeft+'px;z-index:2;font-size:'+blackKeyLabelSize+'%";font-weight:bold></div>';
			$("#keyboard").after(blackKey);
			$("#key-"+key).append(blackKeyLabel);
			//debug(blackKey);
		}
	}

	redLineWidth = 	3 + whiteKeyOffset;
	whiteKeyOffset += 6 + whiteKeyWidth;
	bgHeight = 217 + whiteKeyHeight;
	var pianoBackground='<div style="position:absolute;z-index:0;top:0px;left:0px; background-color:black;width:'+whiteKeyOffset+'px;height:'+bgHeight+'px;border:0px solid #000"></div>';	
	$("#keyboard").after(pianoBackground);
	var redLine='<div style="position:absolute;z-index:1;top:210px;left:7px; background-color:#680000 ;width:'+redLineWidth+'px;height:2px;border:0px solid #000"></div>';
	$("#keyboard").after(redLine);
}

function drawPianoControls()
{


}