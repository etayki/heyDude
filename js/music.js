//          [top rec offset, top rec width, bottom rec offset, bottom rec width]
//          There are 85 keys. The lowest note is 21 and the highest is 108.

var startTempo = 2500;
var tempo = 3900 - (startTempo - 1300);
var measure = 1;
var timers = new Array();
var noteOn = new Array();
var didPressPlayBtn = 0;

var DELAY = 0;
var DURATION = 1;
var NOTE = 2;
var VELOCITY = 3;
var FINGER = 4;

var STARTPLAY = 0;
var REPEAT = 1;
var info = {
	'measureControl' : "Press LEFT and RIGHT keys to traverse measures.",
	'playControl'    : "Press SPACE key to toggle between Play and Pause.",
	'tempoControl'   : "Press UP and DOWN keys to change tempo.",
	'handControl'    : "Press L key for left hand only, R key for right hand only, and B to display both hands."
};

$(document).ready(function() {
	/* Load the MIDI Player*/
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			// MIDI Player has loaded, so now allow user interaction
			drawPiano();
			drawControls();
			MIDI.setVolume(0, 127);
		}
	});	
});

/* --- ================ CONTROLS ================== */

function didPressPlayButton(option)
{
	if (didPressPlayBtn == 1 && option == STARTPLAY)
		return;
		
	didPressPlayBtn = 1;
	
	// Continue playing note upon resume ()
	//for (var noteOnIdx = 0; noteOnIdx < noteOn.length && option == STARTPLAY; noteOnIdx++)
	//{
	//	MIDI.noteOn(0, noteOn[noteOnIdx], 10, 0);
	//}
	
	if (option == STARTPLAY)
	{
		oldTempo = tempo;
		tempo = 200; // Fast forward to the next note upon resume;
	}
	
	for (var noteIdx = 0; noteIdx < tune[measure].length; noteIdx++)
	{
		var note = tune[measure][noteIdx][NOTE];
		var key = note - 21;
		var color = "#00FF00";
		var noteStart = tune[measure][noteIdx][DELAY];
		var noteDuration = tune[measure][noteIdx][DURATION];
		var noteEnd = noteStart + noteDuration;
		if (noteEnd > measure * 4)
			noteEnd = measure * 4 - 0.01;
		
		if ( (delay - 0.01) < noteStart && noteStart <= delay )
		{
			// Turn note on (sound + visual)
			//debug("ON " + note + " " + noteStart + " " + noteEnd);
			
			if (tempo == 200) // End fastfoward
				tempo = oldTempo;
			
			var hand = $('input:radio[name=hand]:checked').val();
			var finger = tune[measure][noteIdx][FINGER];
			if (( finger < 0 && hand == "right") || (finger > 0 && hand == "left"))
				continue;

			MIDI.noteOn(0, note, tune[measure][noteIdx][VELOCITY], 0);
			if (finger < 0)
			{
				color = "red";
				finger *= -1;
			}
			$("#key-"+key).css("background-color",color);
			$("#keyLabel-"+key).text(finger);
			noteOn.push(note);

		}
		else if ((delay - 0.01) < (noteEnd - 0.01) && (noteEnd - 0.01) <= delay)
		{
			// Hide note (visualy)
			resetNote(note);
		}
		else if ((delay - 0.01) < noteEnd && noteEnd <= delay)
		{
			// Turn note off (sound)
			MIDI.noteOff(0, note, 0);

		}		
	}
	
	timers.push(setTimeout(function() {
		delay += 0.01;
		if (delay > measure * 4)
		{
			delay = (measure - 1) * 4;
		}
		didPressPlayButton(REPEAT);	
	}, 4*tempo/600));	
	
}

function didPressPauseButton(visualOff)
{
	didPressPlayBtn = 0;

	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);
		if (visualOff)
			resetNote(note);
	}

	// clear all timers in the array
	for (var i = 0; i < timers.length; i++)
	{
	    clearTimeout(timers[i]);
	}
}

function didSelectHand(hand)
{
	for(var i = 0; i < noteOn.length; i++)
	{
		note = noteOn[i];
		key = note - 21;
		keyColor =  $("#key-"+key).css("background-color");
		if ((keyColor == "rgb(255, 0, 0)" && hand == "right") || (keyColor == "rgb(0, 255, 0)" && hand == "left"))
		{
			resetNote(note);
			i--;
		}
	}
}


/* --- ================ PLAY ================== */

function resetNote(note)
{
	key = note - 21;
	color = "white";
	var keyIdx = key % 12;
	if (keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11)
	{
		color = "black";
	}
	$("#key-"+key).css("background-color",color);
	$("#keyLabel-"+key).text("");
	noteOn.splice(noteOn.indexOf(note), 1);
}

/* --- ================ SLIDER ================== */

var measureSlider, tempoSlider;

function sliderInit()
{
	// Add 1 to max as ugly fix to keep slider going off deep end
	measureSlider = new dhtmlxSlider("measureSlider", tune.length * 8 * whiteKeyWidth/21, "dhx_skyblue", false, 1, tune.length, measure, 1);
	measureSlider.setImagePath("./slider/imgs/");
	measureSlider.attachEvent("onChange", function(newMeasure) {
		// Ugly fix to keep slider going off deep end
		if (newMeasure > Math.floor(tune[tune.length-1][2]/4) +1) 
		{
			measureSlider.setValue(Math.floor(tune[tune.length-1][2]/4)+1);
			return;
		}
		updateSlider("measure", newMeasure);
	});

	delay = (measure - 1) * 4;
	document.getElementById("measure").value = measure;
	measureSlider.init();

	// Add 200 to max as ugly fix to keep slider going off deep end
	tempoSlider = new dhtmlxSlider("tempoSlider", 100 * whiteKeyWidth/21, "dhx_skyblue", false, 1300, 3900+200, 3900 - (tempo - 1300), 200);
	tempoSlider.setImagePath("./slider/imgs/");
	tempoSlider.attachEvent("onChange", function(newtempo) {
		// Ugly fix to keep slider going off deep end
		if (newtempo > 3900) 
		{
			tempoSlider.setValue(3900);
			return;
		}
		document.getElementById("tempo").value = newtempo;
		tempo = 3900 - (newtempo - 1300);
		//didPressPauseButton();
		//didPressPlayButton(STARTPLAY);
		});
	
	document.getElementById("tempo").value = 3900 - (tempo - 1300);	
	tempoSlider.init();
};

function updateSlider(slider, val) {
	if (isNaN(Number(val)) && !(val == "+" || val == "-"))
		val = 0;

	if (slider == "measure")
	{
		if (val == "-")
		{
			val = Number(measure) - 1;
			if (val == 0)
				return;
		}
		
		maxMeasure = Math.floor(tune.length - 1);

		if (val == "+")
		{
			if (measure == maxMeasure)
				return;
			val = Number(measure) + 1;
		}
		
		// Limit to min measure
		if (val < 1)
			val = 1;
			
		// Limit to max measure
		if (val > maxMeasure)
			val = maxMeasure;
			
		// Set new measure	
		measureSlider.setValue(val);
		document.getElementById("measure").value = val;
		measure = val;
		delay = (measure - 1) * 4;
		didPressPauseButton(1);
		didPressPlayButton(STARTPLAY);
	}
	else if (slider == "tempo")
	{
		if (val == "-")
			val = Number(tempo) + 200;

		if (val == "+")
			val = Number(tempo) - 200;
			
				// Limit to min measure
		if (val < 1)
			val = 1;

		// Limit to max tempo
		if (val < 1300)
			val = 1300;
			
		// Limit to min tempo
		if (val > 3900)
			val = 3900;
			
		// Set new tempo	
		tempoSlider.setValue(3900 - (val - 1300));
		document.getElementById("tempo").value = 3900 - (val - 1300);
		tempo = val;
	}
};

/* --- ================ KEY PRESS ================== */

$(document).keydown(function(e){
	if (e.keyCode == 37) // Left arrow
	{ 
		updateSlider("measure","-");
	}
	else if (e.keyCode == 39) // Right arrow
	{ 
		updateSlider("measure","+");
	}
	if (e.keyCode == 38) // Up arrow
	{ 
		updateSlider("tempo","+");
	}
	else if (e.keyCode == 40) // Down arrow
	{ 
		updateSlider("tempo","-");
	}
	else if (e.keyCode == 32) // Space
	{
		if (didPressPlayBtn)
		{
			didPressPauseButton();
		}
		else
		{
			didPressPlayButton(STARTPLAY);		
		}
	}
	else if (e.keyCode == 13) //Enter
	{
		if (document.getElementById("measure").value == "")
			document.getElementById("measure").value = measure;
		$('#measure').blur();
	}
	//else if (e.keyCode == 13) //Enter
	//{
});

/* --- ================ PIANO DRAW ================== */

function drawPiano()
{
	whiteKeySpacing = 2;
	// White Key - 15x73
	whiteKeyWidth = screen.width/65; // 15-25 screen.width
	
	var userAgent = navigator.userAgent;
	if(userAgent.indexOf("iPhone") !== -1)
	{
		whiteKeyWidth = 8;
	}
	else if(userAgent.indexOf("iPad") !== -1)
	{
		whiteKeyWidth = 10;
	}
	whiteKeyHeight = Math.floor(whiteKeyWidth * 73/15);
	whiteKeyOffset = 7;
	
	// White Key Label
	whiteKeyLabelTop = Math.floor(whiteKeyHeight*0.70);
	whiteKeyLabelLeft = Math.floor(whiteKeyWidth*0.30);
	whiteKeyLabelSize = 120 * whiteKeyWidth/15;

	// Black Key - 11x42
	blackKeyWidth = Math.floor(whiteKeyWidth * 0.32) * 2 + whiteKeySpacing;
	blackKeyHeight = Math.floor(whiteKeyHeight * 0.58);
	blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
	
	// Black Key Label
	blackKeyLabelTop = Math.floor(blackKeyHeight*0.50);
	blackKeyLabelLeft = Math.floor(blackKeyWidth*0.25);
	blackKeyLabelSize = 90 * whiteKeyWidth/15;
	
	for (var key = 0; key < 88; key++)
	{
		var octave = Math.floor(key/12);
		var keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key !=0) whiteKeyOffset += whiteKeyWidth + whiteKeySpacing;
			var whiteKey='<div id="key-'+key+'" style="position:absolute;z-index:1;top:211px;left:'+whiteKeyOffset+'px; background-color:white;width:'+whiteKeyWidth+'px;height:'+whiteKeyHeight+'px"></div>';
			var whiteKeyLabel = '<b><div id="keyLabel-'+key+'" style="color:#330099;position:absolute;top:'+whiteKeyLabelTop+'px;left:'+whiteKeyLabelLeft+'px;z-index:2;font-size:'+whiteKeyLabelSize+'%";font-weight:bold></div></b>';
			$("#keyboard").after(whiteKey);
			$("#key-"+key).append(whiteKeyLabel);
			//debug(whiteKey); 
		}
		else
		{
			blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
			var blackKey='<div id="key-'+key+'" style="position:absolute;z-index:2;top:211px;left:'+blackKeyOffset+'px; background-color:black;width:'+blackKeyWidth+'px;height:'+blackKeyHeight+'px;border:0px solid #000"></div>';
			var blackKeyLabel = '<b><div id="keyLabel-'+key+'" style="color:#330099;position:absolute;top:'+blackKeyLabelTop+'px;left:'+blackKeyLabelLeft+'px;z-index:2;font-size:'+blackKeyLabelSize+'%";font-weight:bold></div></b>';
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
	var redLine='<div style="position:absolute;z-index:1;top:210px;left:7px; background-color:#6130000 ;width:'+redLineWidth+'px;height:2px;border:0px solid #000"></div>';
	$("#keyboard").after(redLine);
	
	debugAreaLeft = whiteKeyOffset + 10;
	debugAreaWidth = 1415 - debugAreaLeft;
	var debugArea = '<div id="debug" style="position:absolute;top:10px;left:'+debugAreaLeft+'px;width:'+debugAreaWidth+'px;height:50px;background-color:white">';
	$("body").after(debugArea);
}

function drawControls()
{
	//var arr[] = $("#keyboard").find("*").andSelf();//.css('width', '64px').css('height', '64px');
	$("#keyboard").find("*").andSelf().each(
	    function(){
		//access to form element via $(this)
		//debug($(this).attr('id'));
		var width = $(this).css('width');
		var left = $(this).css('left');
		var fontSize = $(this).css('font-size');
		width = width.replace(/px/g, '');
		left = left.replace(/px/g, '');
		fontSize = fontSize.replace(/px/g, '');
		$(this).css("width",width*whiteKeyWidth/20+"px");
		$(this).css("left",left*whiteKeyWidth/20+"px");
		$(this).css("font-size",fontSize*(whiteKeyWidth/50+3/5)+"px");
	    }
	);

	dhtmlxEvent(window, "load", sliderInit);
	sliderInit();

	$("#loading").css("display","none");
	$("#keyboard").css("display","");

	infoTop = 350;
	infoLeft = 150;
	infoWidth = 800;
	var infoArea = '<b><div id="info" style="position:absolute;top:'+infoTop+'px;left:'+infoLeft+'px;width:'+infoWidth+'px;height:50px;background-color:white;color:red;font-size:22px"></b>';
	$("body").after(infoArea);

	$(".control").hover(function(){
		message = info[$(this).attr('id')];
		$("#info").append(message);
	  },
	  function(){
	    $("#info").text("");              
	});

}

 

/* --- ================ DEBUG ================== */
debugTop = 0;
function debug(param)
{
	try { param = param.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
	catch(err){}
	param = '<div id="debug" style="position:absolute;z-index:6;top:'+debugTop+'px;left:10px;color:red;font-size:15px">' + param + "<br></div>";
	$("#debug").append(param);
	debugTop += 40;
}