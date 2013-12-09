/* TEMPO */
var tempo = 10;

/* TRANSPOSITION */
var transposeValue = 0;
var transMinusButtonEnabled = 1;
var transPlusButtonEnabled = 1;

/* SPEED */
var speedMinusButtonEnabled = 1;
var speedPlusButtonEnabled = 0;

/* MEASURE/DELAY */
var startMeasure = currentMeasure = 1;
var endMeasure = 8;
var startDelay = delay = 0;
var endDelay = endMeasure * delayPerMeasure;
var FAST_FORWARD = 0.01;
var delayPerMeasure = 4;

/* HAND SELECTION */
var leftHandEnabled = 1;
var rightHandEnabled = 1;

/* METRONOME */
var metronomeEnabled = 0;
var currentMetronomeBox = 100;

/* NOTES */
var notesEnabled = 0;

/* TIMER */
var timers = new Array();

/* CONSTANTS */
var DELAY = 0;
var DURATION = 1;
var NOTE = 2;
var VELOCITY = 3;
var FINGER = 4;
var REPEAT = 1;
var RETAIN_VISUAL = 1;

/* ZOOM */
zoomEnabled = 0;

/* FEEDBACK */
var feedbackFormDisplayed = 0;
var notePress = 21;

/* EVENT REPORTING */
playIdx = 1;
pauseIdx = 1;
xmlHttpPlay = new Array();
xmlHttpPause = new Array();

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
			$("#playBtn").attr("src", "./images/playButton.png");
			MIDI.setVolume(0, 127);
		}
	});
	
	drawScreen();
	
	/* DISABLE SELECTION */
	$("body").css("-webkit-user-select","none");
	$("body").css("-moz-user-select","none");
	$("body").css("-ms-user-select","none");
	$("body").css("-o-user-select","none");
	$("body").css("user-select","none");
});

/* --- ================ CONTROLS ================== */
function didPressPlayButton()
{ 
	// Fast forward to the next note upon resume;
	oldTempo = tempo;
	tempo = FAST_FORWARD;

	/* TOGGLE FROM PLAY TO PAUSE */
	$("#playBtn").attr("src", "http://watchandrepeat.com/images/pauseButton.png");
	if(navigator.platform.indexOf("iPad") != -1)
		$("#playBtn").attr("ontouchstart", "didPressPauseButton()");
	else
		$("#playBtn").attr("onclick", "didPressPauseButton()");
	$('#playLabel').text("Pause");

	playMusic();

	// Report Play Event
	xmlHttpPlay[playIdx] = new XMLHttpRequest();
	xmlHttpPlay[playIdx].open("GET","event.php?event=Play"+playIdx+"&start="+startMeasure+"&end="+endMeasure+"&brsr="+browser,true);
	xmlHttpPlay[playIdx].send();
	playIdx++;
}

function didPressPauseButton()
{
	/* TOGGLE FROM PAUSE TO PLAY */
	//debug("pause");
	$("#playBtn").attr("src", "./images/playButton.png");
	$("#playBtn").attr(clickEvent, "didPressPlayButton()");
	$('#playLabel').text("Play");

	resetNotes(RETAIN_VISUAL);

	// Report Pause Event
	xmlHttpPause[pauseIdx] = new XMLHttpRequest();
	xmlHttpPause[pauseIdx].open("GET","event.php?event=Pause"+pauseIdx+"&start="+startMeasure+"&end="+endMeasure+"&brsr="+browser,true);
	xmlHttpPause[pauseIdx].send();
	pauseIdx++;
}

function playMusic()
{	
	thisTime = new Date().getTime();
	//debug(tempo + " " + (thisTime-previousTime));
	//console.log(tempo + " " + (thisTime-previousTime));
	previousTime = thisTime;

	// Metronome
	if ((Math.floor(delay * 100) % 100 == 0) && metronomeEnabled)
	{
		MIDI.noteOn(0, 100, 90, 0);
		MIDI.noteOff(0, 100, 0);
	}

	for (var measure = currentMeasure - 1; measure <= currentMeasure; measure++)
	{
		for (var noteIdx = 0; noteIdx < tune[measure].length; noteIdx++)
		{
			var note = tune[measure][noteIdx][NOTE] + transposeValue;
			var key = note - 21;
			var color = "#00FF00";
			var noteStart = tune[measure][noteIdx][DELAY];
			var noteDuration = tune[measure][noteIdx][DURATION];
			var noteEnd = noteStart + noteDuration;
			
			if (noteEnd > endMeasure * delayPerMeasure)
				noteEnd = endMeasure * delayPerMeasure - 0.01;

			if ( (delay - 0.01) <= noteStart && noteStart < delay )
			{
				// Turn note on (sound + visual)
				if (tempo == FAST_FORWARD) // End fastfoward
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
				$("#zoomOnkey-"+key).css("background-color",color);
				$("#zoomOffkey-"+key).css("background-color",color);
				if (notesEnabled)
				{	
				 	$("#zoomOnkeyNoteLabel-"+key).css("display","");
				 	$("#zoomOffkeyNoteLabel-"+key).css("display","");
				 }
				if (finger != 0)
				{
					$("#zoomOnkeyLabel-"+key).text(finger);
					$("#zoomOffkeyLabel-"+key).text(finger);
				}
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

	//adjustedTempo = tempo
	//if (isiPad) adjustedTempo = tempo/1.6;
	timers.push(setTimeout(function() {
		delay += 0.01;
		if (delay >= endDelay)
		{
			delay = startDelay;
		}
		
		setPositionMarker();
		playMusic();

	}, tempo));	
}

var previousTime = 0;

function clearHand(hand)
{
	for(var key = 0; key < 88; key++)
	{
		note = key + 21
		keyColor =  $("#zoomOnkey-"+key).css("background-color");
		keyColor =  $("#zoomOffkey-"+key).css("background-color");
		if ((keyColor == "rgb(0, 255, 0)" && hand == "right") || (keyColor == "rgb(255, 0, 0)" && hand == "left"))
		{
			resetNote(note);
			MIDI.noteOff(0, note, 0);
		}
	}
}

function resetNotes(retainVisual)
{
	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);
		if (!retainVisual)
			resetNote(note);
	}

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
	$("#zoomOnkey-"+key).css("background-color",color);
	$("#zoomOffkey-"+key).css("background-color",color);
	$("#zoomOnkeyLabel-"+key).text("");
	$("#zoomOffkeyLabel-"+key).text("");
	$("#zoomOnkeyNoteLabel-"+key).css("display","none");
	$("#zoomOffkeyNoteLabel-"+key).css("display","none");
}

/* SET THE CURRENT MEASURE EITHER WITH ARROW KEYS OR BY CLICKING ON MEASURE BOX */
function setCurrentMeasure(newMeasure)
{
	if (newMeasure == "-")
	{
		newMeasure = currentMeasure - 1;
		if (newMeasure == 0) return;
	}
	else if (newMeasure == "+")
	{
		newMeasure = currentMeasure + 1;
		if (newMeasure == tune.length) return;
	}

	currentMeasure = newMeasure;
	delay = (currentMeasure - 1) * delayPerMeasure;

	if (currentMeasure < startMeasure)
		setStartMeasure(currentMeasure);

	if (currentMeasure > endMeasure)
		setEndMeasure(currentMeasure);

	resetNotes();
	if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
		playMusic();
	colorizeMeasures();
}

function setStartMeasure(newMeasure)
{
	if (newMeasure == "-")
	{
		newMeasure = currentMeasure - 1;
		if (newMeasure == 0) return;
	}
	else if (newMeasure == "+")
	{
		newMeasure = currentMeasure + 1;
		if (newMeasure == tune.length) return;
	}
	
	startMeasure = Number(newMeasure);
	startDelay = (startMeasure - 1) * delayPerMeasure;
	
	if (startDelay > delay)
	{
		delay = startDelay;
		setPositionMarker();
		resetNotes();
		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			playMusic();
	}
	
	if (startMeasure > endMeasure)
		setEndMeasure(startMeasure);

	setStartMarker(startMeasure);
	$('#startMarkerInfoLabel').css("display","none");
	colorizeMeasures();
}

function setEndMeasure(newMeasure)
{
	if (newMeasure == "-")
	{
		newMeasure = currentMeasure - 1;
		if (newMeasure == 0) return;
	}
	else if (newMeasure == "+")
	{
		newMeasure = currentMeasure + 1;
		if (newMeasure == tune.length) return;
	}

	endMeasure = Number(newMeasure);
	endDelay = endMeasure * delayPerMeasure;

	if (endDelay <= delay)
	{
		delay = startDelay;
		setPositionMarker();
		resetNotes();
		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			playMusic();
	}

	if (startMeasure > endMeasure)
		setStartMeasure(endMeasure);

	setEndMarker(endMeasure);
	$('#endMarkerInfoLabel').css("display","none");
	colorizeMeasures();
}

function setTempo(newMetronomeBox)
{
	currentMetronomeBox = newMetronomeBox;
	$('#speedLabel').text("Speed: "+newMetronomeBox+"%");
	newMetronomeBox = newMetronomeBox * 0.75;
	tempo = Math.floor((101-newMetronomeBox)/100 * 40);
}

function setTransposition(newTransposition)
{
	resetNotes(0);
	transposeValue = newTransposition
	if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
		playMusic();
	$('#transpositionLabel').text("Transposition ("+transposeValue+")");
}

/* --- ================ DEBUG ================== */
debugTop = 0;
function debug(param)
{
	try { param = param.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
	catch(err){}
	param = '<div id="debug" style="position:absolute;z-index:6;top:'+debugTop+'px;left:10px;color:black;font-size:15px;background-color:green">' + param + "<br></div>";
	$("body").append(param);
	debugTop += 40;
}
