/* --- ================ PIANO DRAW ================== */

var info = {
	'measureControl' : "Press LEFT and RIGHT keys to change the Start Measure.<br>Press UP and DOWN keys to change the End Measure.<br>Press T to toggle between repeat and NO repeat.",
	'playControl'    : "Press SPACE key to toggle between Play and Pause.<br>Press S to stop.",
	'tempoControl'   : "Press < to decrease tempo.<br>Press > to increase tempo.",
	'handControl'    : "Press L for left hand only.<br>Press R for right hand only.<br>Press B to display both hands.",
	'repeatControl'  : "<br>Press 1 to repeat one measure.<br>Press 2 to repeat two measures."
};

function drawScreen()
{
	screenWidth = screen.width;
	
	drawMeasureGrid();
	drawMarkers();
	drawControls();
	drawPiano();
	feedbackForm();
	//playDisplay();
	display();
}

function display()
{
	$("#loading").css("display","none");
	//$("#controls").css("display","");
	//$("#pianoWrapper").css("display","");
	//$("#chair").css("display","");
	//$("#feedback").css("display","");
}

function drawMeasureGrid()
{
	/* MEASURE GRID HEADER */
	$("body").append('<div id="measureGridHeader"></div>');
	measureGridHeaderWidth = Math.floor(screenWidth * 0.8) - 1; // Subtract one to account for border of measureBox
	measureGridHeaderLeft = (screenWidth - measureGridHeaderWidth)/2;
	measureGridHeaderTop = 50;
	measureGridHeaderHeight = 40;
	measureGridHeaderColor = "#919191";
	adjustTag("measureGridHeader", measureGridHeaderLeft, measureGridHeaderTop, measureGridHeaderWidth, measureGridHeaderHeight, measureGridHeaderColor);

	/* MEASURE BOX */
	measureBoxWidth = measureGridHeaderWidth * 0.05;
	measureBoxHeight = measureBoxWidth;
	measureBoxTop = measureGridHeaderTop + measureGridHeaderHeight;
	measureBoxColor = "#cbcbcb";

	/* MEASURE LABEL */
	measureBoxLabelWidth = measureBoxWidth * 0.4;
	measureBoxLabelLeft = (measureBoxWidth - measureBoxLabelWidth)/2;
	measureBoxLabelTop = measureBoxLabelLeft;
	measureBoxLabelHeight = measureBoxLabelWidth;

	/* MEASURE GRID */
	for (row = 1; row <= 4; row++)
	{
		measureBoxLeft = (screenWidth - measureGridHeaderWidth)/2;
		for (col = 1; col <= 20; col++)
		{
			number = (row-1) * 20 + col;
			if (number == tune.length)
				return;
			$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="border-style:solid; border-width:1px"></div>');
			measureBoxHeight = measureBoxWidth;
			adjustTag("measureBox-"+number, measureBoxLeft, measureBoxTop, measureBoxWidth, measureBoxHeight, measureBoxColor);
			measureBoxLeft += measureBoxWidth;
			
			var measureBoxLabel = '<div id="measureBoxLabel-'+number+'">'+number+'</div>';
			$("#measureBox-"+number).append(measureBoxLabel);

			adjustTag("measureBoxLabel-"+number, measureBoxLabelLeft, measureBoxLabelTop, measureBoxLabelWidth, measureBoxLabelHeight, "clear");
			$("#measureBoxLabel-"+number).css("position", "absolute");
		}
		measureBoxTop += measureBoxHeight;
	}
}


function drawMarkers()
{
	/* LEFT MARKER */
	$("body").append('<img id="leftMarker" src="./images/leftMark.png"></img>');
	leftMarkLeft = $("#measureBox-1").css("left").replace(/px/g, '');
	leftMarkTop = $("#measureBox-1").css("top").replace(/px/g, '');
	leftMarkWidth = Math.floor(measureBoxWidth * 0.4);
	leftMarkHeight = measureBoxHeight;
	adjustTag("leftMarker", leftMarkLeft, leftMarkTop, leftMarkWidth, leftMarkHeight, "clear");
	
	$('img').on('dragstart', function(event) { event.preventDefault(); });

	/* RIGHT MARKER */
	$("body").append('<img id="rightMarker" src="./images/rightMark.png"></img>');
	rightMarkLeft = $("#measureBox-5").css("left").replace(/px/g, '') - leftMarkWidth +1; // Add 1 because PowerPoint gives padding of 1;
	rightMarkTop = leftMarkTop;
	rightMarkWidth = leftMarkWidth;
	rightMarkHeight = measureBoxHeight;
	adjustTag("rightMarker", rightMarkLeft, rightMarkTop, rightMarkWidth, rightMarkHeight, "clear");

	$('img').on('dragstart', function(event) { event.preventDefault(); });

	leftMarkerMouseDown = 0;
	rightMarkerMouseDown = 0;	
	$("#leftMarker").mousedown(function() {
		leftMarkerMouseDown = 1;
	});

	$("#rightMarker").mousedown(function() {
		rightMarkerMouseDown = 1;
	});
	
	$("body").mouseup(function() {
		leftMarkerMouseDown = 0;
		rightMarkerMouseDown = 0;
	});

	$(".measureBox").hover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		if (leftMarkerMouseDown)
		{
			updateStartMeasure(newMeasure);
		}
		else if (rightMarkerMouseDown)
		{
			updateEndMeasure(newMeasure);
		}
	});

}

function setLeftMarker(measure)
{
	leftMarkerMeasure = measure;
	leftMarkLeft = $("#measureBox-"+measure).css("left").replace(/px/g, '');
	leftMarkTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#leftMarker").css("left", leftMarkLeft);
	$("#leftMarker").css("top", leftMarkTop);	
}

function setRightMarker(measure)
{
	rightMarkerMeasure = measure;
	rightMarkLeft =  $("#measureBox-"+measure).css("left").replace(/px/g, '') - leftMarkWidth + 1 + measureBoxWidth;
	rightMarkTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#rightMarker").css("left", rightMarkLeft);
	$("#rightMarker").css("top", rightMarkTop);	
}

function drawControls()
{
	/* CONTROLS BACKGROUND */
	$("body").append('<img id="controlsBackground" src="./images/controlsBackground.png"></img>');
	controlsBackgroundLeft =  measureGridHeaderLeft;
	controlsBackgroundTop = Number($("#measureBox-68").css("top").replace(/px/g, '')) + measureBoxHeight;
	controlsBackgroundWidth = measureGridHeaderWidth;
	controlsBackgroundHeight = measureBoxHeight * 1.5;
	adjustTag("controlsBackground", controlsBackgroundLeft, controlsBackgroundTop, controlsBackgroundWidth, controlsBackgroundHeight, "clear");

	/* HANDS LABEL */
	$("body").append('<div id="handsLabel">Hands</div>');
	handsLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.01;
	handsLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.1;
	handsLabelWidth = controlsBackgroundWidth * 0.05;
	handsLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("handsLabel", handsLabelLeft, handsLabelTop, handsLabelWidth, handsLabelHeight, "clear");
	
	/* LEFT HAND */
	$("body").append('<img id="leftHandEnabled" src="./images/leftHandEnabled.png"></img>');
	leftHandWidth = controlsBackgroundHeight * 0.6;
	leftHandHeight = leftHandWidth;
	leftHandLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.1;
	leftHandTop = controlsBackgroundTop + (controlsBackgroundHeight - leftHandHeight)/2;
	adjustTag("leftHandEnabled", leftHandLeft, leftHandTop, leftHandWidth, leftHandHeight, "clear");
	
	/* RIGHT HAND */
	$("body").append('<img id="rightHandEnabled" src="./images/rightHandEnabled.png"></img>');
	leftHandWidth = controlsBackgroundHeight * 0.6;
	leftHandHeight = leftHandWidth;
	leftHandLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.2;
	leftHandTop = controlsBackgroundTop + (controlsBackgroundHeight - leftHandHeight)/2;
	adjustTag("rightHandEnabled", leftHandLeft, leftHandTop, leftHandWidth, leftHandHeight, "clear");
}

/* HELPER FUNCTIONS */
function adjustTag(tag, left, top, width, height, backgroundColor)
{
	$("#"+tag).css("position", "absolute");
	$("#"+tag).css("left", left);
	$("#"+tag).css("top", top);
	$("#"+tag).css("width", width);
	$("#"+tag).css("height", height);
	$("#"+tag).css("background-color", backgroundColor);
	if (tag.indexOf("Label") !== -1)
	{
		fontSize = getFontSize(height);
		$("#"+tag).css("font-size", fontSize+"px");
		$("#"+tag).css("text-align","center");
	}
}

function getFontSize(labelHeight)
{
	$("body").append('<div id="textLabel"><span id="textSpan">00</span></div>');

	fontSize = 0;
	do {
	    fontSize += 2;
	    $("#textLabel").css('font-size', fontSize);
	    spanHeight = Number($("#textSpan").css('height').replace(/px/g, ''));
	} while (spanHeight < labelHeight)
	
	$('#textLabel').remove();
	return fontSize;
}


//function drawControls()
//{
//	$("#controls").find("*").andSelf().each(
//	    function(){
//		var width = $(this).css('width');
//		var left = $(this).css('left');
//		var fontSize = $(this).css('font-size');
//		width = width.replace(/px/g, '');
//		left = left.replace(/px/g, '');
//		fontSize = fontSize.replace(/px/g, '');
//		
//		$(this).css("width",width*whiteKeyWidth/20+"px");
//		$(this).css("left",left*whiteKeyWidth/20+"px");
//		$(this).css("font-size",fontSize*(whiteKeyWidth/50+3/5)+"px");
//	    }
//	);
//
//	var controlsWidth = $("#controls").css("width").replace(/px/g, '');
//	// Not sure why the PianoLeft wasn't added here, but it works
//	var controlsLeft = pianoLeft + (pianoWidth - Number(controlsWidth))/2;
//	$("#controls").css("left", controlsLeft);
//	
//	dhtmlxEvent(window, "load", sliderInit);
//	
//	infoTop = chairTop + 50;//350;
//	infoLeft = chairLeft + 30;//150;
//	infoWidth = chairWidth - 50;//800;
//	var infoArea = '<b><div id="info" style="position:absolute;top:'+infoTop+'px;left:'+infoLeft+'px;width:'+infoWidth+'px;height:50px;background-color:clear;color:white;font-size:22px"></b>';
//	$("body").after(infoArea);
//
//	$(".control").hover(function(){
//		if(!(userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1))
//		{
//			message = info[$(this).attr('id')];
//			$("#info").append(message);
//		}
//	  },
//	  function(){
//	    $("#info").text("");              
//	});
//	
//	$("#repeatMeasure").change(function(){
//		$('#repeatMeasure').blur();
//		var text = $("#repeatMeasure option:selected").text();
//		text = text.replace(/ Measure/g, '');
//		text = text.replace(/s/g, '');
//		newMeasureLength = Number(text);
//	  });
//
//	$("#repeatCheck").click(function(){
//		repeatMask();
//	  });
//	
//	$(".key").click(function(){
//		keyPress = $(this).attr('id');
//		keyPress = keyPress.replace(/key-/g,'');
//		notePress = Number(keyPress) + 21;
//		MIDI.noteOn(0,notePress,90,0);
//		MIDI.noteOff(0,notePress,0.4);
//		$("#key-"+keyPress).css("background-color","yellow");
//
//		timers.push(setTimeout(function() {
//			resetNote(notePress);
//		}, 400));
//			
//	  });
//
//	  $('#startMeasure').live('blur', function() {
//		if ($("#startMeasure").val() == "")
//			$("#startMeasure").val(startMeasure);
//	});
//
//
//	  $('#endMeasure').live('blur', function() {	
//		if ($("#endMeasure").val() == "")
//			$("#endMeasure").val(endMeasure);
//	});
//}

function drawPiano()
{
	whiteKeySpacing = 2;
	// White Key - 15x73
	
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




function feedbackForm() {
	$("#feedbackForm").find("*").andSelf().each(
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
	
	feedbackFormWidth = pianoWidth * 0.34;
	feedbackFormHeight = pianoHeight * 0.7;
	feedbackFormTop = screen.height * 0.25; 
	feedbackFormLeft = pianoLeft + (pianoWidth - feedbackFormWidth)/2;

	$("#feedbackForm").css("top", feedbackFormTop);
	$("#feedbackForm").css("left", feedbackFormLeft);
	$("#feedbackForm").css("width", feedbackFormWidth);
	$("#feedbackForm").css("height", feedbackFormHeight);

	feedbackHeight = whiteKeyHeight;
	feedbackWidth = 20;
	fontSize = $("#feedback").css('font-size').replace(/px/g, '');
	fontSize = fontSize*(screenWidth/1300)
	
	$("#feedback").css("width", feedbackHeight);
	$("#feedback").css("height", feedbackWidth);
	$("#feedback").css("left", feedbackWidth/2 - feedbackHeight/2 - 1);
	$("#feedback").css("top", screen.height*0.4);
	$("#feedback").css("font-size",fontSize+"px");
	
	$("#feedback").click(function() {
		if (didPressPlayBtn)
			didPressPauseButton();
		feedbackFormDisplayed = 1;
		$('#feedbackForm').css("display","");
		$('#message').focus();
		
	});

	$("#cancel").click(function() {	
		$('#feedbackForm').css("display","none");
		feedbackFormDisplayed = 0;
	});
	
	$('#submit').click(function() {	
		var message = $("textarea#message").val();
		if (message == "") {
			$("textarea#message").focus();
			return false;
		}
		
		var dataString = '&message='+ message;
		$.ajax({
		  type: "POST",
		  url: "./php/feedback.php",
		  data: dataString,
		  success: function() {
			$('#feedbackForm').css("display","none");
			feedbackFormDisplayed = 0;
			$('#feedbackThanks').css("display","");
			setTimeout(function() {
				$('#feedbackThanks').css("display","none");
			}, 2000);
		  }
		});
		return false;
	});
	

  
}

//function playDisplay()
//{
//	rulerWidth = Number($("#playDisplay").css("width").replace(/px/g, '')) * 0.8;
//	rulerLeft = Number($("#playDisplay").css("left").replace(/px/g, '')) + rulerWidth/10;
//	rulerTop = Number($("#playDisplay").css("height").replace(/px/g, ''))/2 - 10;
//	markTop = rulerTop - 12;
//	markHeight = 13;
//	markLeft = 0;
//	
//	
//	var ruler='<div id="ruler" style="position:absolute;z-index:5;top:'+rulerTop+'px;left:'+rulerLeft+'px; background-color:black;width:'+rulerWidth+'px;height:3px"></div>';
//	$("#playDisplay").append(ruler);
//	
//	for(var i = 1; i < tune.length + 1; i++)
//	{
//		var check='<div id="check-'+i+'" style="position:absolute;z-index:5;top:'+markTop+'px;left:'+markLeft+'px; background-color:black;width:2px;height:'+markHeight+'px"></div>';
//		$("#ruler").append(check);
//	
//		if (i%5 == 0 || i == 1)
//		{				
//			var checkNum = '<b><div style="position:absolute;top:12px;left:-9px;width:20px;z-index:6;font-size:12px;text-align:center;background-color:clear";font-weight:bold>'+i+'</div></b>';
//			$("#check-"+i).append(checkNum);
//		}
//		
//		measureBoxLeft = markLeft;
//		measureBoxTop = markTop;
//		measureBoxWidth = rulerWidth/(tune.length-1);
//		measureBoxHeight = markHeight;
//		var measureBox='<div class="measureBox" id="measureBox-'+i+'" style="position:absolute;z-index:7;top:'+measureBoxTop+'px;left:'+measureBoxLeft+'px; background-color:clear;width:'+measureBoxWidth+'px;height:'+measureBoxHeight+'px"></div>';
//		$("#ruler").append(measureBox);
//		
//		markLeft += rulerWidth/(tune.length-1);
//	}
//
//	playIntervalLeft = 0;
//	playIntervalWidth = rulerWidth/(tune.length-1);
//	var playInterval='<div id="playInterval" style="position:absolute;top:'+markTop+'px;left:'+playIntervalLeft+'px; background-color:green;width:'+playIntervalWidth+'px;height:'+markHeight+'px;z-index:4"></div>';
//	$("#ruler").append(playInterval);
//
//	var curPosition='<div id="curPosition" style="position:absolute;z-index:5;top:'+markTop+'px;left:0px; background-color:red;width:3px;height:'+markHeight+'px"></div>';
//	$("#ruler").append(curPosition);
//	
//	$(".measureBox").click(function(){
//		selectedMeasureBox = $(this).attr('id');
//		selectedMeasure = Number(selectedMeasureBox.replace(/measureBox-/g,''));
//		updatePosition(selectedMeasure);
//	  });
//}

/* --- ================ SLIDER ================== */
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