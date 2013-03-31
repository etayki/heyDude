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
	setSceenWidth();
	drawHeader();
	drawMeasureGrid();
	drawMarkers();
	colorizeMeasures();
	drawControls();
	drawPiano();
	setEvents();
	//feedbackForm();
	//playDisplay();
	display();
}

function setSceenWidth()
{
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
}

function display()
{
	$("#loading").css("display","none");
	//$("#controls").css("display","");
	//$("#pianoWrapper").css("display","");
	//$("#chair").css("display","");
	//$("#feedback").css("display","");
}

function drawHeader()
{
	/* MEASURE GRID HEADER */
	$("body").append('<div id="measureGridHeader"></div>');
	measureGridHeaderWidth = Math.floor(screenWidth * 0.8) - 1; // Subtract one to account for border of measureBox
	measureGridHeaderLeft = (screenWidth - measureGridHeaderWidth)/2;
	measureGridHeaderTop = 0;
	measureGridHeaderHeight = measureGridHeaderWidth * 0.065;
	measureGridHeaderColor = "#919191";
	adjustTag("measureGridHeader", measureGridHeaderLeft, measureGridHeaderTop, measureGridHeaderWidth, measureGridHeaderHeight, measureGridHeaderColor);	
	
	/* LOGO */
	$("body").append('<img id="logo" src="./images/logo.png"></img>');
	logoLeft = measureGridHeaderLeft + measureGridHeaderWidth * 0.03;
	logoHeight = measureGridHeaderHeight * 0.8;
	logoTop = measureGridHeaderTop + (measureGridHeaderHeight - logoHeight)/2;
	logoWidth = measureGridHeaderHeight * 1.3;
	adjustTag("logo", logoLeft, logoTop, logoWidth, logoHeight, "clear");
	
	/* COMPOSER PIC */
	$("body").append('<img id="composerPic" src="./images/beethoven.jpeg"></img>');
	composerPicTop = measureGridHeaderTop;
	composerPicHeight = measureGridHeaderHeight;
	composerPicWidth = measureGridHeaderHeight * 1.2;
	composerPicLeft = measureGridHeaderLeft + measureGridHeaderWidth - composerPicWidth;
	adjustTag("composerPic", composerPicLeft, composerPicTop, composerPicWidth, composerPicHeight, "clear");
	
	/* TUNE LABEL */
	$("body").append('<div id="tuneLabel">Moonlight Sonata</div>');
	tuneLabelLeft =  measureGridHeaderLeft;
	tuneLabelTop = measureGridHeaderTop + measureGridHeaderHeight * 0.1;
	tuneLabelWidth = measureGridHeaderWidth;
	tuneLabelHeight = measureGridHeaderHeight * 0.4;
	adjustTag("tuneLabel", tuneLabelLeft, tuneLabelTop, tuneLabelWidth, tuneLabelHeight, "clear");
	
	/* ARTIST LABEL */
	$("body").append('<div id="artisitLabel">L.V. Beethoven</div>');
	artisitLabelLeft =  measureGridHeaderLeft;
	artisitLabelTop = measureGridHeaderTop + measureGridHeaderHeight * 0.55;
	artisitLabelWidth = measureGridHeaderWidth;
	artisitLabelHeight = measureGridHeaderHeight * 0.25;
	adjustTag("artisitLabel", artisitLabelLeft, artisitLabelTop, artisitLabelWidth, artisitLabelHeight, "clear");
}

function drawMeasureGrid()
{
	maxColumn = 23;
	maxBoxes = Math.floor(tune.length/maxColumn);
	maxBoxes = maxColumn * (maxBoxes+1);
	
	/* MEASURE BOX */
	measureBoxLeft = measureGridHeaderLeft;
	measureBoxWidth = measureGridHeaderWidth/maxColumn;
	measureBoxHeight = measureBoxWidth;
	measureBoxTop = measureGridHeaderTop + measureGridHeaderHeight;
	measureBoxColor = "#cbcbcb";

	/* MEASURE LABEL */
	measureBoxLabelWidth = measureBoxWidth * 0.4;
	measureBoxLabelLeft = (measureBoxWidth - measureBoxLabelWidth)/2;
	measureBoxLabelTop = measureBoxLabelLeft;
	measureBoxLabelHeight = measureBoxLabelWidth;
	

	/* MEASURE GRID */
	for (number = 1; number <= maxBoxes; number++)
	{			
		/* MEASURE BOX */
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="border-style:solid; border-width:1px"></div>');
		adjustTag("measureBox-"+number, measureBoxLeft, measureBoxTop, measureBoxWidth, measureBoxHeight, measureBoxColor);
		
		if (number < tune.length)
		{
			/* MEASURE BOX LABEL */
			measureBoxLabel = '<div id="measureBoxLabel-'+number+'">'+number+'</div>';
			$("#measureBox-"+number).append(measureBoxLabel);
			adjustTag("measureBoxLabel-"+number, measureBoxLabelLeft, measureBoxLabelTop, measureBoxLabelWidth, measureBoxLabelHeight, "clear");
			$("#measureBoxLabel-"+number).css("position", "absolute");
		}
		else
		{
			/* ROW FILL MEASURE BOXES SHOULD NOT RESPOND TO EVENTS */
			$("#measureBox-"+number).attr("class", "");
		}
	
		measureBoxLeft += measureBoxWidth;
		if (measureBoxLeft >= (measureGridHeaderLeft + measureGridHeaderWidth - measureBoxWidth/2)) // Need to subtract a little, don't know why
		{
			measureBoxLeft = (screenWidth - measureGridHeaderWidth)/2;
			measureBoxTop += measureBoxHeight;
		}
	}	
}


function drawMarkers()
{
	/* POSITION MARKER */
	$("body").append('<div id="positionMarker" ></div>');
	positionMarkerLeft = $("#measureBox-1").css("left").replace(/px/g, '');
	positionMarkerTop = $("#measureBox-1").css("top").replace(/px/g, '');
	positionMarkerWidth = Math.floor(measureBoxWidth * 0.1);
	positionMarkerHeight = measureBoxHeight;
	adjustTag("positionMarker", positionMarkerLeft, positionMarkerTop, positionMarkerWidth, positionMarkerHeight, "green");
	
	/* LEFT MARKER */
	$("body").append('<img id="leftMarker" src="./images/leftMark.png"></img>');
	leftMarkLeft = $("#measureBox-1").css("left").replace(/px/g, '');
	leftMarkTop = $("#measureBox-1").css("top").replace(/px/g, '');
	leftMarkWidth = Math.floor(measureBoxWidth * 0.4);
	leftMarkHeight = measureBoxHeight;
	adjustTag("leftMarker", leftMarkLeft, leftMarkTop, leftMarkWidth, leftMarkHeight, "clear");
	
	/* RIGHT MARKER */
	$("body").append('<img id="rightMarker" src="./images/rightMark.png"></img>');
	rightMarkLeft = $("#measureBox-"+endMeasure).css("left").replace(/px/g, '')  - leftMarkWidth + 1 + measureBoxWidth; // Add 1 because PowerPoint gives padding of 1;
	rightMarkTop = leftMarkTop;
	rightMarkWidth = leftMarkWidth;
	rightMarkHeight = measureBoxHeight;
	adjustTag("rightMarker", rightMarkLeft, rightMarkTop, rightMarkWidth, rightMarkHeight, "clear");
}

function setEvents()
{
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

	/* SET LEFT/RIGHT MARKERS */
	$(".measureBox").hover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		if (leftMarkerMouseDown)
		{
			setStartMeasure(newMeasure);
		}
		else if (rightMarkerMouseDown)
		{
			setEndMeasure(newMeasure);
		}
	});
	
	/* SET CURRENT MEASURE */
	$(".measureBox").click(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		setCurrentMeasure(newMeasure);
	});
}


function setPositionMarker()
{
	/* SET POSITION LABEL */
	position = (Math.floor((delay/4 + 1)*100)/100).toFixed(2);
	$("#positionLabel").text(position);
	
	/* SET POSITION MARKER */
	currentMeasure = Math.floor(position);
	measureBoxLeft = Number($("#measureBox-"+currentMeasure).css("left").replace(/px/g, ''));
	measureBoxTop = Number($("#measureBox-"+currentMeasure).css("top").replace(/px/g, ''));
	$("#positionMarker").css("left", measureBoxLeft + (position-currentMeasure) * measureBoxWidth);
	$("#positionMarker").css("top", measureBoxTop);	
}

function setStartMarker(measure)
{
	leftMarkLeft = $("#measureBox-"+measure).css("left").replace(/px/g, '');
	leftMarkTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#leftMarker").css("left", leftMarkLeft);
	$("#leftMarker").css("top", leftMarkTop);	
}

function setEndMarker(measure)
{
	rightMarkLeft =  $("#measureBox-"+measure).css("left").replace(/px/g, '') - leftMarkWidth + 1 + measureBoxWidth;
	rightMarkTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#rightMarker").css("left", rightMarkLeft);
	$("#rightMarker").css("top", rightMarkTop);	
}

function colorizeMeasures()
{
	for (number = 1; number <= startMeasure; number++)
	{			
		/* MEASURE BOX */
		$("#measureBox-"+number).css("background-color",measureBoxColor);
	}
	for (number = startMeasure; number <= endMeasure; number++)
	{			
		/* MEASURE BOX */
		$("#measureBox-"+number).css("background-color","yellow");
	}
	for (number = endMeasure + 1; number <= maxBoxes; number++)
	{			
		/* MEASURE BOX */
		$("#measureBox-"+number).css("background-color",measureBoxColor);
	}
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
	$("body").append('<img id="leftHand" src="./images/leftHandEnabled.png" onclick="didPressLeftHand()"></img>');
	leftHandWidth = controlsBackgroundHeight * 0.6;
	leftHandHeight = leftHandWidth;
	leftHandLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.1;
	leftHandTop = controlsBackgroundTop + (controlsBackgroundHeight - leftHandHeight)/2;
	adjustTag("leftHand", leftHandLeft, leftHandTop, leftHandWidth, leftHandHeight, "clear");
	
	/* RIGHT HAND */
	$("body").append('<img id="rightHand" src="./images/rightHandEnabled.png" onclick="didPressRightHand()"></img>');
	rightHandWidth = controlsBackgroundHeight * 0.6;
	rightHandHeight = leftHandHeight;
	rightHandLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.2;
	rightHandTop = controlsBackgroundTop + (controlsBackgroundHeight - rightHandHeight)/2;
	adjustTag("rightHand", rightHandLeft, rightHandTop, rightHandWidth, rightHandHeight, "clear");
		
	/* INFO BUTTON */
	$("body").append('<img id="infoButton" src="./images/info.png"></img>');
	infoButtonWidth = controlsBackgroundHeight * 0.3;
	infoButtonHeight = infoButtonWidth;
	infoButtonLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.3;
	infoButtonTop = controlsBackgroundTop + controlsBackgroundHeight * 0.1;
	adjustTag("infoButton", infoButtonLeft, infoButtonTop, infoButtonWidth, infoButtonHeight, "clear");
	
	/* DIVIDER */
	$("body").append('<img id="divider1" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.35;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider1", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");
	
	/* PLAY LABEL */
	$("body").append('<div id="playLabel">Play</div>');
	playLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.37;
	playLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.1;
	playLabelWidth = controlsBackgroundWidth * 0.05;
	playLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("playLabel", playLabelLeft, playLabelTop, playLabelWidth, playLabelHeight, "clear");
	
	/* PLAY BUTTON */
	$("body").append('<img id="playBtn" src="./images/playButton.png" onclick="didPressPlayButton()"></img>');
	playButtonLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.45;
	playButtonTop = rightHandTop;
	playButtonWidth = controlsBackgroundHeight * 0.6;
	playButtonHeight = leftHandHeight;
	adjustTag("playBtn", playButtonLeft, playButtonTop, playButtonWidth, playButtonHeight, "clear");
	
	/* STOP BUTTON */
	$("body").append('<img id="stopBtn" src="./images/stopButton.png" onclick="didPressStopButton()"></img>');
	stopButtonLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.53;
	stopButtonTop = rightHandTop;
	stopButtonWidth = controlsBackgroundHeight * 0.6;
	stopButtonHeight = leftHandHeight;
	adjustTag("stopBtn", stopButtonLeft, stopButtonTop, stopButtonWidth, stopButtonHeight, "clear");
	
	/* DIVIDER */
	$("body").append('<img id="divider2" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.6;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider2", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");
	
	/* TEMPO LABEL */
	$("body").append('<div id="tempoLabel">Tempo</div>');
	tempoLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.65;
	tempoLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.1;
	tempoLabelWidth = controlsBackgroundWidth * 0.05;
	tempoLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("tempoLabel", tempoLabelLeft, tempoLabelTop, tempoLabelWidth, tempoLabelHeight, "clear");

	/* METRONOME BUTTON */
	$("body").append('<img id="metronome" src="./images/metronome.png"></img>');
	metronomeHeight = controlsBackgroundHeight * 0.6;
	metronomeLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.7;
	metronomeTop = controlsBackgroundTop + (controlsBackgroundHeight - metronomeHeight) * 0.7;
	metronomeWidth = metronomeHeight * 0.6;
	adjustTag("metronome", metronomeLeft, metronomeTop, metronomeWidth, metronomeHeight, "clear");
	
	/* SLOW LABEL */
	$("body").append('<div id="slowLabel">Slow</div>');
	slowLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.75;
	slowLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.6;
	slowLabelWidth = controlsBackgroundWidth * 0.05;
	slowLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("slowLabel", slowLabelLeft, slowLabelTop, slowLabelWidth, slowLabelHeight, "clear");
	
	/* FAST LABEL */
	$("body").append('<div id="fastLabel">Fast</div>');
	fastLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.85;
	fastLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.6;
	fastLabelWidth = controlsBackgroundWidth * 0.05;
	fastLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("fastLabel", fastLabelLeft, fastLabelTop, fastLabelWidth, fastLabelHeight, "clear");

	/* POSITION LABEL */
	$("body").append('<div id="positionLabel">1.00</div>');
	positionLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.37;
	positionLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.38;
	positionLabelWidth = controlsBackgroundWidth * 0.03;
	positionLabelHeight = positionLabelWidth;
	adjustTag("positionLabel", positionLabelLeft, positionLabelTop, positionLabelWidth, positionLabelHeight, "clear");	

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

function drawPiano()
{
	/* RED LINE */
	$("body").append('<img id="redVelvet" src="./images/redLine.png" style="z-index:5"></img>');
	redLineLeft =  controlsBackgroundLeft;
	redLineTop = controlsBackgroundTop + controlsBackgroundHeight;
	redLineWidth = controlsBackgroundWidth;
	redLineHeight = 5;
	adjustTag("redVelvet", redLineLeft, redLineTop, redLineWidth, redLineHeight, "clear");

	/* KEYBOARD BACKGROUND */
	$("body").append('<div id="keyboardBgrd"></div>');
	keyboardBgrdLeft =  controlsBackgroundLeft;
	keyboardBgrdTop = redLineTop + redLineHeight;
	keyboardBgrdWidth = controlsBackgroundWidth;
	keyboardBgrdHeight = controlsBackgroundWidth * 0.102;
	adjustTag("keyboardBgrd", keyboardBgrdLeft, keyboardBgrdTop, keyboardBgrdWidth, keyboardBgrdHeight, "black");	
	
	/* WHITE KEY */
	whiteKeyWidth = controlsBackgroundWidth/53; // 52 white keys on keyboard, but we need room for margins
	whiteKeyLeft = controlsBackgroundLeft + (controlsBackgroundWidth - whiteKeyWidth * 52) * 0.4;
	whiteKeyTop = keyboardBgrdTop;
	whiteKeyHeight = controlsBackgroundWidth * 0.095;
	
	/* WHITE KEY LABEL */
	whiteKeyLabelLeft = 0;
	whiteKeyLabelTop = whiteKeyHeight * 0.6;
	whiteKeyLabelWidth = whiteKeyWidth;
	whiteKeyLabelHeight = whiteKeyLabelWidth * 1.5;
	
	/* BLACK KEY */
	blackKeyLeft =  controlsBackgroundLeft;
	blackKeyTop = whiteKeyTop;
	blackKeyWidth = Math.floor(whiteKeyWidth * 0.65);
	blackKeyHeight = Math.floor(whiteKeyHeight * 0.58);
	
	/* BLACK KEY LABEL */
	blackKeyLabelLeft = 0;
	blackKeyLabelTop = blackKeyHeight * 0.5;
	blackKeyLabelWidth = blackKeyWidth;
	blackKeyLabelHeight = blackKeyLabelWidth * 1.5;

	for (var key = 0; key < 88; key++)
	{
		var keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key !=0) whiteKeyLeft += whiteKeyWidth;
			/* WHITE KEY */
			$("body").append('<div id="key-'+key+'" class="key" style="border-style:solid; border-width:2px; z-index:2"></div>');
			adjustTag("key-"+key, whiteKeyLeft, whiteKeyTop, whiteKeyWidth, whiteKeyHeight, "white");
			/* WHITE KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:#330099"></div></b>');			
			adjustTag("keyLabel-"+key, whiteKeyLabelLeft, whiteKeyLabelTop, whiteKeyLabelWidth, whiteKeyLabelHeight, "clear");
		}
		else
		{
			/* BLACK KEY */
			blackKeyLeft =  whiteKeyLeft + Math.floor(whiteKeyWidth * 0.75);
			$("body").append('<div id="key-'+key+'" class="key" style="z-index:3"></div>');
			adjustTag("key-"+key, blackKeyLeft, blackKeyTop, blackKeyWidth, blackKeyHeight, "black");
			/* BLACK KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:#330099"></div></b>');			
			adjustTag("keyLabel-"+key, blackKeyLabelLeft, blackKeyLabelTop, blackKeyLabelWidth, blackKeyLabelHeight, "clear");
		}
	}
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