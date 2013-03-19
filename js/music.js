var startTempo = 2500;
var tempo = 3900 - (startTempo - 1300);
var startMeasure = 1;
var endMeasure = 2;
var timers = new Array();
var noteOn = new Array();
var didPressPlayBtn = 0;
var delay = 0;

var DELAY = 0;
var DURATION = 1;
var NOTE = 2;
var VELOCITY = 3;
var FINGER = 4;

var STARTPLAY = 0;
var REPEAT = 1;
var STOP = 3;

var info = {
	'measureControl' : "Press LEFT and RIGHT keys to change the Start Measure.<br>Press UP and DOWN keys to change the End Measure.<br>Press T to toggle between repeat and NO repeat.",
	'playControl'    : "Press SPACE key to toggle between Play and Pause.<br>Press S to stop.",
	'tempoControl'   : "Press < to decrease tempo.<br>Press > to increase tempo.",
	'handControl'    : "Press L for left hand only.<br>Press R for right hand only.<br>Press B to display both hands.",
	'repeatControl'  : "<br>Press 1 to repeat one measure.<br>Press 2 to repeat two measures."
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
	
	if ($("#playButton").text() == "Play")
	{
		$("#playButton").text("Pause");
	}	
	else if (didPressPlayBtn == 1 && option == STARTPLAY)
	{
		didPressPauseButton(0);
		return;
	}
	
	didPressPlayBtn = 1;
	
	if (option == STARTPLAY)
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
		//$("#currentPosition").text(delay.toFixed(2));
		if (delay < startDelay || delay > endDelay)
		{
			didPressPauseButton(STOP);
		}
		$("#currentPosition").text((Math.floor((delay/4 + 1)*100)/100).toFixed(2));
		didPressPlayButton(REPEAT);
	}, 4*tempo/600));	
	
}

function didPressPauseButton(option)
{
	didPressPlayBtn = 0;
	$("#playButton").text("Play");
	
	if (option == STOP)
		delay = startDelay;

	for (var note = 21; note < 108; note++)
	{
		MIDI.noteOff(0, note, 0);

		if (option)
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
	for(var key = 0; key < 88; key++)
	{
		note = key + 21
		keyColor =  $("#key-"+key).css("background-color");
		if ((keyColor == "rgb(255, 0, 0)" && hand == "right") || (keyColor == "rgb(0, 255, 0)" && hand == "left"))
		{
			resetNote(note);
			MIDI.noteOff(0, note, 0);
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
{	// Add 200 to max as ugly fix to keep slider going off deep end
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
		});
	
	document.getElementById("tempo").value = 3900 - (tempo - 1300);	
	tempoSlider.init();
};

function updateStartMeasure(val)
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
	
	maxMeasure = Math.floor(tune.length - 1);

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
		updateEndMeasure(Number(startMeasure)+1);
}

function updateEndMeasure(val)
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
	
	maxMeasure = Math.floor(tune.length - 1);

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
		updateStartMeasure(Number(endMeasure)-1);
}

function updateSlider(slider, val) {
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

/* --- ================ KEY PRESS ================== */

$(document).keydown(function(e){
	if (e.keyCode == 37) // Left arrow
	{ 
		updateStartMeasure("-");
	}
	else if (e.keyCode == 39) // Right arrow
	{ 
		updateStartMeasure("+");
	}
	if (e.keyCode == 38) // Up arrow
	{
		updateEndMeasure("+");
	}
	else if (e.keyCode == 40) // Down arrow
	{
		updateEndMeasure("-");
	}
	else if (e.keyCode == 188) // , <
	{
		updateSlider("tempo","-");
	}
	else if (e.keyCode == 190) // . >
	{
		updateSlider("tempo","+");
	}
	else if (e.keyCode == 32) // Space
	{
		$('#repeatMeasure').blur();
		if (didPressPlayBtn)
		{
			didPressPauseButton();
		}
		else
		{
			didPressPlayButton(STARTPLAY);		
		}
	}
	else if (e.keyCode == 13) // Enter
	{
		$('#startMeasure').blur();
		$('#endMeasure').blur();
	}
	else if (e.keyCode == 76) // l
	{
		$('input[name=hand][value=left]').prop("checked",true);
		didSelectHand('left');
	}
	else if (e.keyCode == 82) // r
	{
		$('input[name=hand][value=right]').prop("checked",true);
		didSelectHand('right');
	}
	else if (e.keyCode == 66) // b
	{
		$('input[name=hand][value=both]').prop("checked",true);	
	}
	else if (e.keyCode == 83) // s
	{
		didPressPauseButton(STOP);	
	}
	else if (e.keyCode == 84) // t
	{
		if($("#repeatCheck").is(':checked'))
		{
			$('#repeatCheck').prop('checked', false);
			$("#repeatMeasure").hide();
			newMeasureLength = 1;
		}
		else
		{
			$('#repeatCheck').prop('checked', true);
			$("#repeatMeasure").show();
			newMeasureLength = 1;
			$("#repeatMeasure").get(0).selectedIndex = 0;
		}
	}

});

/* --- ================ PIANO DRAW ================== */

function drawPiano()
{
	whiteKeySpacing = 2;
	// White Key - 15x73
	screenWidth = screen.width;

	userAgent = navigator.userAgent;
	if(userAgent.indexOf("iPhone") !== -1)
	{
		screenWidth = 1000;
	}
	else if(userAgent.indexOf("iPad") !== -1)
	{
		screenWidth = 1000;
	}
	
	whiteKeyWidth = screenWidth/65;
	
	whiteKeyHeight = Math.floor(whiteKeyWidth * 73/15);
	whiteKeyOffset = whiteKeyWidth/3;
	
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
			var whiteKey='<div class="key" id="key-'+key+'" style="position:absolute;z-index:1;top:211px;left:'+whiteKeyOffset+'px; background-color:white;width:'+whiteKeyWidth+'px;height:'+whiteKeyHeight+'px"></div>';
			var whiteKeyLabel = '<b><div class="keyLabel" id="keyLabel-'+key+'" style="color:#330099;position:absolute;top:'+whiteKeyLabelTop+'px;left:'+whiteKeyLabelLeft+'px;z-index:2;font-size:'+whiteKeyLabelSize+'%";font-weight:bold></div></b>';
			$("#piano").after(whiteKey);
			$("#key-"+key).append(whiteKeyLabel);
		}
		else
		{
			blackKeyOffset = whiteKeyOffset + Math.floor(whiteKeyWidth * 0.75);
			var blackKey='<div class="key" id="key-'+key+'" style="position:absolute;z-index:2;top:211px;left:'+blackKeyOffset+'px; background-color:black;width:'+blackKeyWidth+'px;height:'+blackKeyHeight+'px;border:0px solid #000"></div>';
			var blackKeyLabel = '<b><div class="keyLabel" id="keyLabel-'+key+'" style="color:#330099;position:absolute;top:'+blackKeyLabelTop+'px;left:'+blackKeyLabelLeft+'px;z-index:2;font-size:'+blackKeyLabelSize+'%";font-weight:bold></div></b>';
			$("#piano").after(blackKey);
			$("#key-"+key).append(blackKeyLabel);
		}
	}

	
	firstKeyLeft = Number($("#key-0").css("left").replace(/px/g, ''));
	lastKeyLeft  = Number($("#key-87").css("left").replace(/px/g, ''));
	keyTop       = Number($("#key-87").css("top").replace(/px/g, ''));
	
	pianoWidth = Number(lastKeyLeft) + whiteKeyWidth + Number(firstKeyLeft);
	pianoLeft = (screenWidth - pianoWidth)/2;
	pianoHeight = Number(keyTop) + whiteKeyHeight + 5;
	$("#pianoWrapper").css("width", pianoWidth);
	$("#pianoWrapper").css("left", pianoLeft);
	$("#pianoWrapper").css("height", pianoHeight);
	
	redLineTop = keyTop;
	redLineLeft = pianoLeft + 6;
	redLineWidth = pianoWidth - 12;

	$("#redLine").css("width", redLineWidth);
	$("#redLine").css("left", redLineLeft);
	$("#redLine").css("top", redLineTop);
	

	chairWidth = whiteKeyWidth * 18;
	chairHeight = chairWidth * 0.5;
	chairTop = pianoHeight + 100; 
	chairLeft = pianoLeft + (pianoWidth - chairWidth)/2;

	$("#chair").css("top", chairTop);
	$("#chair").css("left", chairLeft);
	$("#chair").css("width", chairWidth);
	$("#chair").css("height", chairHeight);		
}

function drawControls()
{
	$("#controls").find("*").andSelf().each(
	    function(){
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

	var controlsWidth = $("#controls").css("width").replace(/px/g, '');
	// Not sure why the PianoLeft wasn't added here, but it works
	var controlsLeft = pianoLeft + (pianoWidth - Number(controlsWidth))/2;
	$("#controls").css("left", controlsLeft);
	
	dhtmlxEvent(window, "load", sliderInit);
	sliderInit();

	$("#loading").css("display","none");
	$("#controls").css("display","");
	$("#pianoWrapper").css("display","");
	$("#chair").css("display","");

	
	infoTop = 350;
	infoLeft = 150;
	infoWidth = 800;
	var infoArea = '<b><div id="info" style="position:absolute;top:'+infoTop+'px;left:'+infoLeft+'px;width:'+infoWidth+'px;height:50px;background-color:clear;color:red;font-size:22px"></b>';
	$("body").after(infoArea);

	$(".control").hover(function(){
		if(!(userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1))
		{
			message = info[$(this).attr('id')];
			$("#info").append(message);
		}
	  },
	  function(){
	    $("#info").text("");              
	});
	
	$("#repeatMeasure").change(function(){
		$('#repeatMeasure').blur();
		var text = $("#repeatMeasure option:selected").text();
		text = text.replace(/ Measure/g, '');
		text = text.replace(/s/g, '');
		newMeasureLength = Number(text);
	  });

	$("#repeatCheck").click(function(){
		if($("#repeatCheck").is(':checked'))
			$("#repeatMeasure").show();
		else
			$("#repeatMeasure").hide();

	  });
	
	$(".key").click(function(){
		keyPress = $(this).attr('id');
		keyPress = keyPress.replace(/key-/g,'');
		notePress = Number(keyPress) + 21;
		MIDI.noteOn(0,notePress,90,0);
		MIDI.noteOff(0,notePress,0.4);
		$("#key-"+keyPress).css("background-color","yellow");

		timers.push(setTimeout(function() {
			resetNote(notePress);
		}, 400));
			
	  });

	  $('#startMeasure').live('blur', function() {
		if ($("#startMeasure").val() == "")
			$("#startMeasure").val(startMeasure);
	});


	  $('#endMeasure').live('blur', function() {	
		if ($("#endMeasure").val() == "")
			$("#endMeasure").val(endMeasure);
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