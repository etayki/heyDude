var startTempo = 2500;
var tempo = 3900 - (startTempo - 1300);
var startMeasure = 1;
var endMeasure = 4;
var timers = new Array();
var noteOn = new Array();
var didPressPlayBtn = 0;
var delay = 0;
var startDelay = 0;
var feedbackFormDisplayed = 0;
var positionLabel = 1;
var currentMeasure = 1;
var measureSlider;
var tempoSlider;
var leftHandEnabled = 1;
var rightHandEnabled = 1;

var DELAY = 0;
var DURATION = 1;
var NOTE = 2;
var VELOCITY = 3;
var FINGER = 4;

var STARTPLAY = 0;
var REPEAT = 1;
var TURNOFFNOTES = 2;
var STOP = 3;

$(document).ready(function() {
	/* Load the MIDI Player*/
	//debug("MIDI Player Load START: "+(new Date()).getMilliseconds());
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			//debug("MIDI Player Load END: "+(new Date()).getMilliseconds());
			// MIDI Player has loaded, so now allow user interaction
			//debug("Draw screen START: "+(new Date()).getMilliseconds());
			//debug("Draw screen END: "+(new Date()).getMilliseconds());
			MIDI.setVolume(0, 127);
		}
	});
	/* This will increase loading time. The user won't hear anything until MIDI loaded, that's all */
	drawScreen();

});

/* --- ================ CONTROLS ================== */

function didPressPlayButton(option)
{
	/* TOGGLE FROM PLAY TO PAUSE */
	$("#playBtn").attr("src", "./images/pauseButton.png");
	$("#playBtn").attr("onclick", "didPressPauseButton()");
		
	if (option != REPEAT)
	{
		oldTempo = tempo;
		tempo = 200; // Fast forward to the next note upon resume;
	}
	
	for (measure = Math.floor(startMeasure); measure < Math.ceil(endMeasure); measure++)
	{
		for (var noteIdx = 0; noteIdx < tune[measure].length; noteIdx++)
		{
			var note = tune[measure][noteIdx][NOTE];
			var key = note - 21;
			var color = "#00FF00";
			var noteStart = tune[measure][noteIdx][DELAY];
			var noteDuration = tune[measure][noteIdx][DURATION];
			var noteEnd = noteStart + noteDuration;
			
			if (noteEnd > (endMeasure - 1) * 4)
				noteEnd = (endMeasure - 1) * 4 - 0.01;
			
			if ( (delay - 0.01) <= noteStart && noteStart < delay )
			{
				// Turn note on (sound + visual)
				//debug("ON " + note + " " + noteStart + " " + noteEnd);
				
				if (tempo == 200) // End fastfoward
					tempo = oldTempo;
				
				var finger = tune[measure][noteIdx][FINGER];
				if (( finger < 0 && !leftHandEnabled) || (finger > 0 && !rightHandEnabled))
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
	}
	
	var repeat = $("#repeatCheck").is(':checked');
	endDelay = (endMeasure - 1) * 4;
	startDelay = (startMeasure - 1) * 4;

	if (!repeat && delay >= endDelay - 0.01)
	{
		// Arrived at end of measure. Don't repeat
		didPressPauseButton(3);
		return;
	}
	
	timers.push(setTimeout(function() {
		delay += 0.01;
		if (delay < startDelay || delay > endDelay)
		{
			didPressPauseButton(STOP);
		}
		
		setPositionMarker();
		didPressPlayButton(REPEAT);
	}, 4*tempo/600));	
	
}

function didPressPauseButton()
{
	/* TOGGLE FROM PAUSE TO PLAY */
	$("#playBtn").attr("src", "./images/playButton.png");
	$("#playBtn").attr("onclick", "didPressPlayButton()");

	resetNotes();
}

function didPressStopButton()
{
	/* TOGGLE FROM PAUSE TO PLAY */
	$("#playBtn").attr("src", "./images/playButton.png");
	$("#playBtn").attr("onclick", "didPressPlayButton()");

	resetNotes();
	
	delay = startDelay;
	setPositionMarker();
}

function didPressLeftHand()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (leftHandEnabled)
	{
		$("#leftHand").attr("src", "./images/leftHandDisabled.png");
		leftHandEnabled = 0
		if (!rightHandEnabled) didPressRightHand();
		clearHand("left");
	}
	else
	{
		$("#leftHand").attr("src", "./images/leftHandEnabled.png");
		leftHandEnabled = 1;
	}
}

function didPressRightHand()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (rightHandEnabled)
	{
		$("#rightHand").attr("src", "./images/rightHandDisabled.png");
		rightHandEnabled = 0
		if (!leftHandEnabled) didPressLeftHand();
		clearHand("right");
	}
	else
	{
		$("#rightHand").attr("src", "./images/rightHandEnabled.png");
		rightHandEnabled = 1;
	}
}

function clearHand(hand)
{
	for(var key = 0; key < 88; key++)
	{
		note = key + 21
		keyColor =  $("#key-"+key).css("background-color");
		if ((keyColor == "rgb(0, 255, 0)" && hand == "right") || (keyColor == "rgb(255, 0, 0)" && hand == "left"))
		{
			resetNote(note);
			MIDI.noteOff(0, note, 0);
		}
	}
}

function resetNotes()
{
	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);
		resetNote(note);
	}

	// clear all timers in the array
	for (var i = 0; i < timers.length; i++)
	{
	    clearTimeout(timers[i]);
	}
}

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

/* SET THE CURRENT MEASURE EITHER WITH ARROW KEYS OR BY CLICKING ON MEASURE BOX */
function setCurrentMeasure(newMeasure)
{
	if (newMeasure == "-")
	{
		currentMeasure = Math.floor((delay/4 + 1));
		newMeasure = currentMeasure - 1;
		if (newMeasure == 0) return;
	}
	else if (newMeasure == "+")
	{
		currentMeasure = Math.floor((delay/4 + 1));
		newMeasure = currentMeasure + 1;
		if (newMeasure == tune.length) return;
	}

	delay = (newMeasure - 1) * 4;



	//if (newMeasure < startMeasure)
	//	setStartMeasure(Math.floor(Number(position))-1);
	//
	//// Update End Measure
	//if (position >= endMeasure)
	//	setEndMeasure(Math.floor(Number(position))+1);

	/* SET POSITION MARKER */
	setPositionMarker();

	resetNotes();
	didPressPlayButton();
}

function setStartMeasure(val)
{
	if (isNaN(Number(val)) && !(val == "+" || val == "-"))
		val = 0;
		
	if (val == "-")
	{
		val = Number(startMeasure) - 1;
		if (val == 0)
		{
			return;
		}
	}
	
	maxMeasure = Math.floor(tune.length);

	if (val == "+")
	{
		if (startMeasure == maxMeasure)
			return;
		val = Number(startMeasure) + 1;
	}
	
	// Limit to min measure
	if (val < 1)
		val = 1;
		
	// Limit to max measure
	if (val > maxMeasure)
		val = maxMeasure;
		
	// Set new measure	
	$("#startMeasure").val(val);
	startMeasure = val;
	
	// Update End Measure
	if (startMeasure >= endMeasure)
		setEndMeasure(Number(startMeasure)+1);

	// Update Left Marker
	setLeftMarker(startMeasure);
}

function setEndMeasure(val)
{
	if (isNaN(Number(val)) && !(val == "+" || val == "-"))
		val = 0;
		
	if (val == "-")
	{
		val = Number(endMeasure) - 1;
		if (val == 0)
		{
			return;
		}
	}
	
	maxMeasure = Math.floor(tune.length);

	if (val == "+")
	{
		if (endMeasure == maxMeasure)
			return;
		val = Number(endMeasure) + 1;
	}
	
	// Limit to min measure
	if (val < 1)
		val = 1;
		
	// Limit to max measure
	if (val > maxMeasure)
		val = maxMeasure;
		
	// Set new measure	
	$("#endMeasure").val(val);
	endMeasure = val;

	// Update Start Measure
	if (endMeasure <= startMeasure)
		setStartMeasure(Number(endMeasure)-1);

	// Update Right Marker
	setRightMarker(endMeasure);
}

function updateTempo(slider, val) {
	if (isNaN(Number(val)) && !(val == "+" || val == "-"))
		val = 0;

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
};

function repeatToggle()
{
	if($("#repeatCheck").is(':checked'))
	{
		$('#repeatCheck').prop('checked', false);

	}
	else
	{
		$('#repeatCheck').prop('checked', true);
	}
	
	repeatMask();
}

function repeatMask()
{
	if($("#repeatCheck").is(':checked'))
	{
		startMeasure = savedStartMeasure;
		endMeasure = savedEndMeasure;
		setStartMeasure(startMeasure);
		setEndMeasure(endMeasure);
		$('#playInterval').css("display","");
	}
	else
	{
		$('#playInterval').css("display","none");
		savedStartMeasure = startMeasure;
		savedEndMeasure = endMeasure;
		setStartMeasure(1);
		setEndMeasure(tune.length);
	}
	
}





/* --- ================ DEBUG ================== */
debugTop = 0;
function debug(param)
{
	try { param = param.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
	catch(err){}
	param = '<div id="debug" style="position:absolute;z-index:6;top:'+debugTop+'px;left:10px;color:white;font-size:15px">' + param + "<br></div>";
	$("#debug").append(param);
	debugTop += 40;
}