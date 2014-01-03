/* TEMPO */
var tempo = 10;

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
			console.log("MIDI.loadPlugin Done: " + (new Date().getTime() - startTime));
			MIDI.setVolume(0, 127);
			drawScreen();
			$("#playBtn").attr("src", "./images/playButton.png");
		}
	});

	startTime = new Date().getTime();
	//drawScreen();
	
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
	$("#playBtn").attr("on"+startEvent, "didPressPauseButton()");
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
	$("#playBtn").attr("on"+startEvent, "didPressPlayButton()");
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
	// thisTime = new Date().getTime();
	//debug(tempo + " " + (thisTime-previousTime));
	//console.log(tempo + " " + (thisTime-previousTime));
	// previousTime = thisTime;

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
				$("#key-"+key).css("background-color",color);
				$("#key-"+key).css("background-color",color);
				if (notesEnabled)
				{	
				 	$("#keyNoteLabel-"+key).css("display","");
				 	$("#keyNoteLabel-"+key).css("display","");
				 }
				if (finger != 0)
				{
					$("#keyLabel-"+key).text(finger);
					$("#keyLabel-"+key).text(finger);
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
			resetNotes(0);
			delay = startDelay;
		}
		
		setCurrentMarker();
		playMusic();

	}, tempo));	
}

var previousTime = 0;

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
	$("#key-"+key).css("background-color",color);
	$("#key-"+key).css("background-color",color);
	$("#keyLabel-"+key).text("");
	$("#keyLabel-"+key).text("");
	$("#keyNoteLabel-"+key).css("display","none");
	$("#keyNoteLabel-"+key).css("display","none");
}

/* SET THE CURRENT MEASURE EITHER WITH ARROW KEYS OR BY CLICKING ON MEASURE BOX */
function setCurrentMeasure(newMeasure)
{
	currentMeasure = newMeasure;
	delay = (currentMeasure - 1) * delayPerMeasure;

	if (currentMeasure < startMeasure)
		setStartMeasure(currentMeasure);

	if (currentMeasure > endMeasure)
		setEndMeasure(currentMeasure);

	resetNotes();
	if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
		playMusic();
}

function setStartMeasure(newMeasure)
{	
	startMeasure = Number(newMeasure);
	startDelay = (startMeasure - 1) * delayPerMeasure;
	
	if (startDelay > delay)
	{
		delay = startDelay;
		setCurrentMarker();
		resetNotes();
		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			playMusic();
	}
	
	if (startMeasure > endMeasure)
		setEndMeasure(startMeasure);

	setStartMarker(startMeasure);
	$('#startMarkerInfoLabel').css("display","none");
}

function setEndMeasure(newMeasure)
{
	endMeasure = Number(newMeasure);
	endDelay = endMeasure * delayPerMeasure;

	if (endDelay <= delay)
	{
		delay = endDelay - delayPerMeasure;
		currentMeasure = endMeasure - 1;
		setCurrentMarker();
		resetNotes();
		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			playMusic();
	}

	if (startMeasure > endMeasure)
		setStartMeasure(endMeasure);

	setEndMarker(endMeasure);
	$('#endMarkerInfoLabel').css("display","none");
}

function setTempo(newMetronomeBox)
{
	$('#speedLabel').text("Speed: "+newMetronomeBox+"%");
	currentMetronomeBox = newMetronomeBox;
	tempo = Math.floor((101-0.75*newMetronomeBox)/100 * 40);
	//playMusic(); //- Add this to REALLY make things go faster
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
