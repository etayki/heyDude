function drawControls()
{
	$("body").append('<div id="controls" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth * 0.0645+'"></div>');
	$("#controls").append('<img src="./images/controlsBackground.png" style="position:absolute;left:0%;top:0%;width:100%;height:100%">');

	/* LEFT HAND */
	$("#controls").append('<img id="leftHand" src="./images/leftHandEnabled.png" on'+startEvent+'="didPressLeftHand()" style="position:absolute;left:3%;top:25%;height:60%">');
	$("#controls").append('<div id="leftHandLabel" style="position:absolute;left:3%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Left On</div>');

	/* RIGHT HAND */
	$("#controls").append('<img id="rightHand" src="./images/rightHandEnabled.png" on'+startEvent+'="didPressRightHand()"  style="position:absolute;left:9%;top:25%;height:60%">');
	$("#controls").append('<div id="rightHandLabel" style="position:absolute;left:9%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Right On</div>');

	/* DIVIDER */
	$("#controls").append('<img id="divider1" src="./images/divider.png" style="position:absolute;left:15%;top:0%;width:1.3%;height:100%">');

	/* TRANSPOSITION BUTTONS */
	$("#controls").append('<img id="transMinusButton" src="./images/minusButtonEnabled.png" on'+startEvent+'="didPressTransMinusButton()" style="position:absolute;left:20%;top:25%;height:60%">');
	$("#controls").append('<img id="transPlusButton" src="./images/plusButtonEnabled.png" on'+startEvent+'="didPressTransPlusButton()" style="position:absolute;left:25%;top:25%;height:60%">');
	$("#controls").append('<div id="transpositionLabel" style="position:absolute;left:20%;top:6%;height:15%;width:9%;text-align:center;background-color:clear" class="ctrlLabel">Transpostion (0)</div>');

	/* NOTE BUTTON */
	$("#controls").append('<img id="notesButton" src="./images/notesDisabled.png" on'+startEvent+'="didPressNotes()" style="position:absolute;left:32%;top:25%;height:60%">');
	$("#controls").append('<div id="notesLabel" style="position:absolute;left:32%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Notes Off</div>');

	/* DIVIDER */
	$("#controls").append('<img id="divider2" src="./images/divider.png" style="position:absolute;left:40%;top:0%;width:1.3%;height:100%">');

	/* PLAY BUTTON */
	$("#controls").append('<img id="playBtn" src="./images/playLoading.gif" on'+startEvent+'="didPressPlayButton()" style="position:absolute;left:42%;top:25%;height:60%;width:4%">');
	$("#controls").append('<div id="playLabel" style="position:absolute;left:42%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Play</div>');

	/* DIVIDER */
	$("#controls").append('<img id="divider3" src="./images/divider.png" style="position:absolute;left:47%;top:0%;width:1.3%;height:100%">');

	// $("body").append('<img id="playBtn" src="./images/loading.gif "'+clickEvent+'="didPressPlayButton()"></img>');
	// playButtonLeft =  controlsBackgroundWidth * 0.43;
	// playButtonTop = leftHandTop;
	// playButtonWidth = controlsBackgroundHeight * 0.6;
	// playButtonHeight = leftHandHeight;
	// adjustTag("playBtn", playButtonLeft, playButtonTop, playButtonWidth, playButtonHeight, "clear");

	// /* PLAY LABEL */
	// $("body").append('<div id="playLabel">Play</div>');
	// playLabelLeft =  playButtonLeft - playButtonWidth;
	// playLabelTop = leftHandLabelTop;
	// playLabelWidth = leftHandLabelWidth;
	// playLabelHeight = controlsBackgroundHeight * 0.145;
	// adjustTag("playLabel", playLabelLeft, playLabelTop, playLabelWidth, playLabelHeight, "clear");
	
	// /* DIVIDER */
	// $("body").append('<img id="divider2" src="./images/divider.png"></img>');
	// dividerLeft =  controlsBackgroundWidth * 0.5;
	// dividerTop = controlsBackgroundTop;
	// dividerWidth = 20;
	// dividerHeight = controlsBackgroundHeight;
	// adjustTag("divider2", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	// /* METRONOME BUTTON */
	// $("body").append('<img id="metronome" src="./images/metronomeDisabled.png "'+clickEvent+'="didPressMetronome()"></img>');
	// metronomeLeft =  controlsBackgroundWidth * 0.53;
	// metronomeHeight = playButtonHeight * 0.95;
	// metronomeTop = leftHandTop;
	// metronomeWidth = metronomeHeight;
	// adjustTag("metronome", metronomeLeft, metronomeTop, metronomeWidth, metronomeHeight, "clear");
	
	// /* METRONOME LABEL */
	// $("body").append('<div id="metroLabel">Metro Off</div>');
	// tempoLabelLeft =  metronomeLeft - metronomeWidth;
	// tempoLabelTop = leftHandLabelTop;
	// tempoLabelWidth = metronomeWidth * 3;
	// tempoLabelHeight = leftHandLabelHeight;
	// adjustTag("metroLabel", tempoLabelLeft, tempoLabelTop, tempoLabelWidth, tempoLabelHeight, "clear");

	// /* POSITION LABEL */
	// $("body").append('<div id="positionLabel">1.00</div>');
	// positionLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.37;
	// positionLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.38;
	// positionLabelWidth = controlsBackgroundWidth * 0.03;
	// positionLabelHeight = positionLabelWidth;
	// adjustTag("positionLabel", positionLabelLeft, positionLabelTop, positionLabelWidth, positionLabelHeight, "clear");
	// $('#positionLabel').css("display","none");

	// /* SLOW LABEL */
	// $("body").append('<div id="slowLabel">Slow</div>');
	// slowLabelLeft =  metronomeLeft + leftHandWidth;
	// slowLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.65;
	// slowLabelWidth = controlsBackgroundWidth * 0.05;
	// slowLabelHeight = controlsBackgroundHeight * 0.2;
	// adjustTag("slowLabel", slowLabelLeft, slowLabelTop, slowLabelWidth, slowLabelHeight, "clear");
	// $('#slowLabel').css("display","none");
	
	// /* FAST LABEL */
	// $("body").append('<div id="fastLabel">Fast</div>');
	// fastLabelLeft =  slowLabelLeft + leftHandWidth * 3.5;
	// fastLabelTop = slowLabelTop;
	// fastLabelWidth = controlsBackgroundWidth * 0.05;
	// fastLabelHeight = controlsBackgroundHeight * 0.2;
	// adjustTag("fastLabel", fastLabelLeft, fastLabelTop, fastLabelWidth, fastLabelHeight, "clear");
	// $('#fastLabel').css("display","none");

	// /* DIVIDER */
	// $("body").append('<img id="divider3" src="./images/divider.png"></img>');
	// dividerLeft =  controlsBackgroundWidth * 0.75;
	// dividerTop = controlsBackgroundTop;
	// dividerWidth = 20;
	// dividerHeight = controlsBackgroundHeight;
	// adjustTag("divider3", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	// /* ZOOM BUTTON */
	// $("body").append('<img id="zoom" src="./images/zoomIn.png "'+clickEvent+'="didPressZoom()"></img>');
	// zoomLeft =  controlsBackgroundWidth * 0.78;
	// zoomHeight = playButtonHeight * 0.99;
	// zoomTop = leftHandTop*1.005;
	// zoomWidth = zoomHeight;
	// adjustTag("zoom", zoomLeft, zoomTop, zoomWidth, zoomHeight, "clear");
	
	// /* ZOOM LABEL */
	// $("body").append('<div id="zoomLabel">Zoom In</div>');
	// zoomLabelLeft =  zoomLeft - zoomWidth;
	// zoomLabelTop = leftHandLabelTop;
	// zoomLabelWidth = zoomWidth * 3;
	// zoomLabelHeight = leftHandLabelHeight;
	// adjustTag("zoomLabel", zoomLabelLeft, zoomLabelTop, zoomLabelWidth, zoomLabelHeight, "clear");

	// /* FULL SCREEN BUTTON */
	// $("body").append('<img id="fullScreenButton" src="./images/fullScreen.png "'+clickEvent+'="didPressFullScreenButton()"></img>');
	// fullScreenButtonLeft =  controlsBackgroundWidth * 0.85;
	// fullScreenButtonTop = leftHandTop;
	// fullScreenButtonWidth = controlsBackgroundHeight * 0.6;
	// fullScreenButtonHeight = leftHandHeight * 1.07;
	// adjustTag("fullScreenButton", fullScreenButtonLeft, fullScreenButtonTop, fullScreenButtonWidth, fullScreenButtonHeight, "clear");
	// if (isiPad)
	// 	$('#fullScreenButton').css("display","none");

	// /* FULL SCREEN LABEL */
	// $("body").append('<div id="fullScreenLabel">Full Screen</div>');
	// fullScreenLabelWidth = leftHandLabelWidth * 0.6;
	// fullScreenLabelLeft =  fullScreenButtonLeft - (fullScreenLabelWidth - fullScreenButtonWidth)/2;
	// fullScreenLabelTop = leftHandLabelTop;
	// fullScreenLabelHeight = leftHandLabelHeight;
	// adjustTag("fullScreenLabel", fullScreenLabelLeft, fullScreenLabelTop, fullScreenLabelWidth, fullScreenLabelHeight, "clear");
	// if (isiPad)
	// 	$('#fullScreenLabel').css("display","none");

	// /* FEEDBACK BUTTON */
	// $("body").append('<img id="feedbackButton" src="./images/feedbackIcon.png "'+clickEvent+'="didPressFeedbackButton()"></img>');
	// feedbackButtonLeft =  fullScreenButtonLeft + 2 * fullScreenButtonWidth;
	// feedbackButtonTop = leftHandTop;
	// feedbackButtonWidth = controlsBackgroundHeight * 0.6;
	// feedbackButtonHeight = leftHandHeight;
	// adjustTag("feedbackButton", feedbackButtonLeft, feedbackButtonTop, feedbackButtonWidth, feedbackButtonHeight, "clear");

	// /* FEEDBACK LABEL */
	// $("body").append('<div id="feedbackLabel">Feedback</div>');
	// feedbackLabelWidth = leftHandLabelWidth * 0.6;
	// feedbackLabelLeft =  feedbackButtonLeft - (feedbackLabelWidth - feedbackButtonWidth)/2;
	// feedbackLabelTop = leftHandLabelTop;
	// feedbackLabelHeight = leftHandLabelHeight;
	// adjustTag("feedbackLabel", feedbackLabelLeft, feedbackLabelTop, feedbackLabelWidth, feedbackLabelHeight, "clear");
	$(".ctrlLabel").css("font-size", getFontSize($("#leftHandLabel").height())+"px");
}

function drawTransposition()
{
	/* TRANSPOSITION BOX */
	transpositionBoxLeft = controlsBackgroundWidth * 0.18;
	transpositionBoxWidth = (fastLabelLeft - slowLabelLeft)/7;
	transpositionBoxHeight = controlsBackgroundHeight;
	transpositionBoxTop = controlsBackgroundTop + (controlsBackgroundHeight - transpositionBoxHeight)/2;
	transpositionBoxColor = "clear";
	
	/* TRANSPOSITION DRAGGER TRACK */
	draggerTrackLeft = transpositionBoxLeft;
	draggerTrackWidth = (fastLabelLeft - slowLabelLeft)*0.955;
	draggerTrackHeight = transpositionBoxWidth * 0.4;
	draggerTrackTop = controlsBackgroundTop + (controlsBackgroundHeight - draggerTrackHeight)/2;
	draggerTrackColor = "5884F1";
	$("body").append('<div id="draggerTransTrack"></div>');
	adjustTag("draggerTransTrack", draggerTrackLeft, draggerTrackTop, draggerTrackWidth, draggerTrackHeight, draggerTrackColor);

	/* TRANSPOSITION LABEL */
	$("body").append('<div id="transpositionLabel">Transposition (0)</div>');
	transpositionLabelLeft =  draggerTrackLeft;
	transpositionLabelTop = leftHandLabelTop;
	transpositionLabelWidth = draggerTrackWidth;
	transpositionLabelHeight = leftHandLabelHeight;
	adjustTag("transpositionLabel", transpositionLabelLeft, transpositionLabelTop, transpositionLabelWidth, transpositionLabelHeight, "clear");

	transpositionBoxLeft += 5;
	transpositionBoxMax = 13;
	for (number = 1; number <= transpositionBoxMax; number++)
	{	
		/* transposition BOX */
		$("body").append('<div id="transpositionBox-'+number+'" class="transpositionBox" style="border-style:solid; border-width:0px; z-index:1"></div>');
		adjustTag("transpositionBox-"+number, transpositionBoxLeft, transpositionBoxTop, transpositionBoxWidth/2, transpositionBoxHeight, transpositionBoxColor);
		transpositionBoxLeft += transpositionBoxWidth/2;
	}
	
	/* TRANSPOSITION DRAGGER */
	draggerTransBoxLeft = $("#transpositionBox-"+7).css("left").replace(/px/g, '');
	draggerTransBoxWidth = transpositionBoxWidth;
	draggerTransBoxHeight = draggerTransBoxWidth;
	draggerTransBoxTop = transpositionBoxTop - (draggerTransBoxHeight-transpositionBoxHeight)/2;
	$("body").append('<img id="draggerTrans" src="./images/dragger.png" style="z-index:2"></img>');
	adjustTag("draggerTrans", draggerTransBoxLeft, draggerTransBoxTop, draggerTransBoxWidth, draggerTransBoxHeight, "clear");

	/* EVENTS */
	$(".transpositionBox").bind(onClickEvent, function (e) {
		newtranspositionBox = $(this).attr('id');
		newtranspositionBox = Number(newtranspositionBox.replace(/transpositionBox-/g,''));
		draggerBoxLeft = $("#transpositionBox-"+newtranspositionBox).css("left").replace(/px/g, '') - 12;
		$("#draggerTrans").css("left", draggerBoxLeft);
		setTransposition(newtranspositionBox-7);	
	  });
	
	$(".transpositionBox").hover(function() {
		transpositionBoxId = $(this).attr('id');
		newTransposition = Number(transpositionBoxId.replace(/transpositionBox-/g, ''));
		if (draggerMouseDown)
		{
			draggerBoxLeft = $("#transpositionBox-"+newTransposition).css("left").replace(/px/g, '') - 12;
			$("#draggerTrans").css("left", draggerBoxLeft);
			setTransposition(newTransposition-7);
		}
	});
	
	draggerMouseDown = 0;
	$("#draggerTrans").mousedown(function() {
		$("#draggerTrans").css("z-index", 0);
		draggerMouseDown = 1;
	});

	$("body").mouseup(function() {
		$("#draggerTrans").css("z-index", 2);
	});
}

function drawTranspositionTablet()
{
	/* TRANSPOSITION MINUS BUTTON */
	$("body").append('<img id="transMinusButton" src="./images/minusButtonEnabled.png"'+clickEvent+'="didPressTransMinusButton()"></img>');
	transMinusButtonLeft =  controlsBackgroundWidth * 0.2;
	transMinusButtonTop = leftHandTop;
	transMinusButtonWidth = controlsBackgroundHeight * 0.6;
	transMinusButtonHeight = leftHandHeight;
	adjustTag("transMinusButton", transMinusButtonLeft, transMinusButtonTop, transMinusButtonWidth, transMinusButtonHeight, "clear");

	/* TRANSPOSITION MINUS BUTTON */
	$("body").append('<img id="transPlusButton" src="./images/plusButtonEnabled.png"'+clickEvent+'="didPressTransPlusButton()"></img>');
	transPlusButtonLeft =  controlsBackgroundWidth * 0.25;
	transPlusButtonTop = leftHandTop;
	transPlusButtonWidth = controlsBackgroundHeight * 0.6;
	transPlusButtonHeight = leftHandHeight;
	adjustTag("transPlusButton", transPlusButtonLeft, transPlusButtonTop, transPlusButtonWidth, transPlusButtonHeight, "clear");

	/* TRANSPOSITION LABEL */
	$("body").append('<div id="transpositionLabel">Transposition (0)</div>');
	transLabelLeft =  transMinusButtonLeft;
	transLabelTop = leftHandLabelTop;
	transLabelWidth = transPlusButtonLeft + transPlusButtonWidth - transMinusButtonLeft;
	transLabelHeight = leftHandLabelHeight;
	adjustTag("transpositionLabel", transLabelLeft, transLabelTop, transLabelWidth, transLabelHeight, "clear");
}

function drawSpeedTablet()
{
	/* SPEED MINUS BUTTON */
	$("body").append('<img id="speedMinusButton" src="./images/minusButtonEnabled.png"'+clickEvent+'="didPressSpeedMinusButton()"></img>');
	speedMinusButtonLeft =  controlsBackgroundWidth * 0.6;
	speedMinusButtonTop = leftHandTop;
	speedMinusButtonWidth = controlsBackgroundHeight * 0.6;
	speedMinusButtonHeight = leftHandHeight;
	adjustTag("speedMinusButton", speedMinusButtonLeft, speedMinusButtonTop, speedMinusButtonWidth, speedMinusButtonHeight, "clear");

	/* SPEED PLUS BUTTON */
	$("body").append('<img id="speedPlusButton" src="./images/plusButtonDisabled.png"'+clickEvent+'="didPressSpeedPlusButton()"></img>');
	speedPlusButtonLeft =  controlsBackgroundWidth * 0.65;
	speedPlusButtonTop = leftHandTop;
	speedPlusButtonWidth = controlsBackgroundHeight * 0.6;
	speedPlusButtonHeight = leftHandHeight;
	adjustTag("speedPlusButton", speedPlusButtonLeft, speedPlusButtonTop, speedPlusButtonWidth, speedPlusButtonHeight, "clear");

	/* SPEED LABEL */
	$("body").append('<div id="speedLabel">Speed: (100%)</div>');
	speedLabelLeft =  speedMinusButtonLeft;
	speedLabelTop = leftHandLabelTop;
	speedLabelWidth = speedPlusButtonLeft + speedPlusButtonWidth - speedMinusButtonLeft;
	speedLabelHeight = leftHandLabelHeight;
	adjustTag("speedLabel", speedLabelLeft, speedLabelTop, speedLabelWidth, speedLabelHeight, "clear");
}

function drawMetronome()
{
	/* METRONOME BOX */
	metronomeBoxLeft = slowLabelLeft + slowLabelWidth/2;
	metronomeBoxWidth = (fastLabelLeft - slowLabelLeft)/7;
	metronomeBoxHeight = controlsBackgroundHeight;
	metronomeBoxTop = controlsBackgroundTop + (controlsBackgroundHeight - metronomeBoxHeight)/2;
	metronomeBoxColor = "clear";
	
	/* DRAGGER TRACK */
	draggerTrackLeft = metronomeBoxLeft;
	draggerTrackWidth = (fastLabelLeft - slowLabelLeft);
	draggerTrackHeight = metronomeBoxWidth * 0.4;
	draggerTrackTop = controlsBackgroundTop + (controlsBackgroundHeight - draggerTrackHeight)/2;
	draggerTrackColor = "5884F1";
	$("body").append('<div id="draggerTrack"></div>');
	adjustTag("draggerTrack", draggerTrackLeft, draggerTrackTop, draggerTrackWidth, draggerTrackHeight, draggerTrackColor);

	/* SPEED LABEL */
	$("body").append('<div id="speedLabel">Speed (100%)</div>');
	speedLabelLeft =  draggerTrackLeft;
	speedLabelTop = leftHandLabelTop;
	speedLabelWidth = draggerTrackWidth;
	speedLabelHeight = leftHandLabelHeight;
	adjustTag("speedLabel", speedLabelLeft, speedLabelTop, speedLabelWidth, speedLabelHeight, "clear");

	metronomeBoxLeft += 8;
	metronomeMaxBox = 100;
	for (number = 1; number <= metronomeMaxBox; number++)
	{	
		/* METRONOME BOX */
		$("body").append('<div id="metronomeBox-'+number+'" class="metronomeBox" style="border-style:solid; border-width:0px; z-index:1"></div>');
		adjustTag("metronomeBox-"+number, metronomeBoxLeft, metronomeBoxTop, metronomeBoxWidth/16, metronomeBoxHeight, metronomeBoxColor);
		metronomeBoxLeft += metronomeBoxWidth/16;
	}
	
	/* DRAGGER */
	draggerBoxLeft = $("#metronomeBox-"+92).css("left").replace(/px/g, '');
	draggerBoxWidth = metronomeBoxWidth;
	draggerBoxHeight = draggerBoxWidth;
	draggerBoxTop = metronomeBoxTop - (draggerBoxHeight-metronomeBoxHeight)/2;
	$("body").append('<img id="dragger" src="./images/dragger.png" style="z-index:2"></img>');
	adjustTag("dragger", draggerBoxLeft, draggerBoxTop, draggerBoxWidth, draggerBoxHeight, "clear");

	/* EVENTS */
	$(".metronomeBox").bind(onClickEvent, function (e) {
		newMetronomeBox = $(this).attr('id');
		newMetronomeBox = Number(newMetronomeBox.replace(/metronomeBox-/g,''));
		draggerBoxLeft = $("#metronomeBox-"+newMetronomeBox).css("left").replace(/px/g, '') - 12;
		$("#dragger").css("left", draggerBoxLeft);
		setTempo(newMetronomeBox);	
	  });
	
	$(".metronomeBox").hover(function() {
		metronomeBoxId = $(this).attr('id');
		newTempo = metronomeBoxId.replace(/metronomeBox-/g, '');
		if (draggerMouseDown)
		{
			draggerBoxLeft = $("#metronomeBox-"+newTempo).css("left").replace(/px/g, '') - 12;
			$("#dragger").css("left", draggerBoxLeft);
			setTempo(newTempo);
		}
	});
	
	draggerMouseDown = 0;	
	$("#dragger").mousedown(function() {
		$("#dragger").css("z-index", 0);
		draggerMouseDown = 1;
	});

	$("body").mouseup(function() {
		$("#dragger").css("z-index", 2);
	});

	// $('#dragger').bind('touchstart', function(e){
	// 	e.preventDefault();
	// });

	$('#dragger').bind('touchmove', function(e){
		//e.preventDefault();
		for (number = 1; number <= metronomeMaxBox; number++)
		{
			metronomeBoxLeft = Number($("#metronomeBox-"+number).css('left').replace(/px/g, ''));
			//debug (number + " " + metronomeBoxLeft + " " + metronomeBoxTop + " " + metronomeBoxWidth);
			//debug (number + " " + event.touches[0].pageY + ">" + (measureBoxTop + measureBoxWidth));
			//debug (number + " " + event.touches[0].pageX + " " + metronomeBoxLeft)
			if (event.touches[0].pageX == metronomeBoxLeft)
			{
					//debug(number);
					draggerBoxLeft = $("#metronomeBox-"+number).css("left").replace(/px/g, '') - 12;
					$("#dragger").css("left", draggerBoxLeft);
					setTempo(number);
			}
		}
	});
}

function didPressFullScreenButton()
{
	element = document.body;
	requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        requestMethod.call(element);
	$("#fullScreenButton").attr("src", "./images/cancelFullScreen.jpeg");
	$("#fullScreenButton").attr(clickEvent, "didPressCancelFullScreenButton()");
	$("#fullScreenLabel").text("Exit Full Screen");
}

function didPressFeedbackButton()
{
	if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
		didPressPauseButton();
	feedbackFormDisplayed = 1;
	$('#feedbackForm').css("display","");
	//$("#feedbackFormTextArea").focus();	
}

function didPressCancelFullScreenButton()
{
	element = document;
	requestMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.exitFullscreen;
        requestMethod.call(element);
	$("#fullScreenButton").attr("src", "./images/fullScreen.png");
	$("#fullScreenButton").attr("onclick", "didPressFullScreenButton()");
	$("#fullScreenLabel").text("Full Screen");
}

function didPressLeftHand()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (leftHandEnabled)
	{
		$("#leftHand").attr("src", "./images/leftHandDisabled.png");
		leftHandEnabled = 0
		if (!rightHandEnabled) didPressRightHand();
		$("#leftHand").attr("src", "./images/leftHandDisabled.png");
		$('#leftHandLabel').text("Left Off");
		clearHand("left");
	}
	else
	{
		$("#leftHand").attr("src", "./images/leftHandEnabled.png");
		$('#leftHandLabel').text("Left On");
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
		$('#rightHandLabel').text("Right Off");
		clearHand("right");
	}
	else
	{
		$("#rightHand").attr("src", "./images/rightHandEnabled.png");
		$('#rightHandLabel').text("Right On");
		rightHandEnabled = 1;
	}
}

function didPressTransMinusButton()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (transMinusButtonEnabled)
	{
		$("#transPlusButton").attr("src", "./images/plusButtonEnabled.png");
		transPlusButtonEnabled = 1;
		setTransposition(transposeValue-1);
		if (transposeValue == -6)
		{
			$("#transMinusButton").attr("src", "./images/minusButtonDisabled.png");
			transMinusButtonEnabled = 0;
		}		
	}
}

function didPressTransPlusButton()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (transPlusButtonEnabled)
	{
		$("#transMinusButton").attr("src", "./images/minusButtonEnabled.png");
		transMinusButtonEnabled = 1;
		setTransposition(transposeValue+1);
		if (transposeValue == 6)
		{
			$("#transPlusButton").attr("src", "./images/plusButtonDisabled.png");
			transPlusButtonEnabled = 0;
		}		
	}
}

function didPressSpeedMinusButton()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (speedMinusButtonEnabled)
	{
		$("#speedPlusButton").attr("src", "./images/plusButtonEnabled.png");
		speedPlusButtonEnabled = 1;
		setTempo(currentMetronomeBox - 10);
		if (currentMetronomeBox == 10)
		{
			$("#speedMinusButton").attr("src", "./images/minusButtonDisabled.png");
			speedMinusButtonEnabled = 0;
		}		
	}
}

function didPressSpeedPlusButton()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (speedPlusButtonEnabled)
	{
		$("#speedMinusButton").attr("src", "./images/minusButtonEnabled.png");
		speedMinusButtonEnabled = 1;
		setTempo(currentMetronomeBox + 10);
		if (currentMetronomeBox == 100)
		{
			$("#speedPlusButton").attr("src", "./images/plusButtonDisabled.png");
			speedPlusButtonEnabled = 0;
		}		
	}
}

function didPressMetronome()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (metronomeEnabled)
	{
		$("#metronome").attr("src", "./images/metronomeDisabled.png");
		$('#metroLabel').text("Metro Off");
		metronomeEnabled = 0;
	}
	else
	{
		$("#metronome").attr("src", "./images/metronomeEnabled.png");
		$('#metroLabel').text("Metro On");
		metronomeEnabled = 1;
	}
}

function didPressZoom()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (zoomEnabled)
	{
		$("#zoom").attr("src", "./images/zoomIn.png");
		$('#zoomLabel').text("Zoom In");
		$("#pianoKeyboard").css("left", "0%");
		$("#pianoKeyboard").css("width", screenWidth);
		$("#pianoKeyboard").css("height", screenWidth*0.085);
		zoomEnabled = 0;
	 	$(".whiteKeyLabel").css("font-size", getFontSize($("#keyLabel-"+0).height())+"px");
	 	$(".whiteKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+0).height())+"px")
	 	$(".blackKeyLabel").css("font-size", getFontSize($("#keyLabel-"+1).height())+"px");
	 	$(".blackKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+1).height())+"px");
	}
	else
	{
		$("#zoom").attr("src", "./images/zoomOut.png");
		$('#zoomLabel').text("Zoom Out");
		//left = $("#key-8").position().left;
		//width = $("#key-69").position().left - $("#key-8").position().left;
		//console.log("left="+left+" width="+width);
		$("#pianoKeyboard").css("left", "-15%");
		$("#pianoKeyboard").css("width", "150.3%"); 
		$("#pianoKeyboard").css("height", screenWidth*0.124);
		zoomEnabled = 1;
	 	$(".whiteKeyLabel").css("font-size", getFontSize($("#keyLabel-"+0).height())+"px");
	 	$(".whiteKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+0).height())+"px")
	 	$(".blackKeyLabel").css("font-size", getFontSize($("#keyLabel-"+1).height())+"px");
	 	$(".blackKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+1).height())+"px");
	}
}

function didPressNotes()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (notesEnabled)
	{
		$("#notesButton").attr("src", "./images/notesDisabled.png");
		$('#notesLabel').text("Notes Off");
		notesEnabled = 0;
	}
	else
	{
		$("#notesButton").attr("src", "./images/notesEnabled.png");
		$('#notesLabel').text("Notes On");
		notesEnabled = 1;
	}
}

function drawfeedback()
{
	/* FEEDBACK TAB */
	feedbackTabLeft = 0
	feedbackTabTop = controlsBackgroundTop;
	feedbackTabHeight = screenWidth/55;

	//$("body").append('<div id="feedbackTabLabel" style="cursor:pointer">Feedback</div>');
	adjustTag("feedbackTabLabel", feedbackTabLeft, feedbackTabTop, 0, feedbackTabHeight, "green");
	$("#feedbackTabLabel").css("left", -feedbackTabWidth/2 + 2);

	/* FEEDBACK TAB 90 DEGREE ROTATION */
    $('#feedbackTabLabel').css({"-webkit-transform" : "rotate(-90deg)"});
    $('#feedbackTabLabel').css({"-moz-transform" : "rotate(-90deg)"});
	$("#feedbackTabLabel").css({"-o-transform" : "rotate(-90deg)"});
	$("#feedbackTabLabel").css({"-ms-transform" : "rotate(-90deg)"});
	$("#feedbackTabLabel").css({"-transform" : "rotate(-90deg)"});
	$("#feedbackTabLabel").css({"filter" : "progid:DXImageTransform.Microsoft.Matrix(M11=0.9396926207859084,M12=-0.3420201433256687,M21=0.3420201433256687,M22=0.9396926207859084,sizingMethod='auto expand')"});
	$("#feedbackTabLabel").css({"zoom" : "1"});

	$("#feedbackTabLabel").bind(onClickEvent, function (e) {
		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			didPressPauseButton();
		feedbackFormDisplayed = 1;
		$('#feedbackForm').css("display","");
		//$("#feedbackFormTextArea").focus();	
	});
	
	/* FEEDBACK FORM */
	feedbackFormWidth = controlsBackgroundWidth * 0.4;
	feedbackFormHeight = controlsBackgroundWidth * 0.3;
	feedbackFormLeft = controlsBackgroundLeft + (controlsBackgroundWidth - feedbackFormWidth)/2;
	feedbackFormTop = controlsBackgroundTop - 2 * measureBoxHeight;
	
	$("body").append('<div id="feedbackForm"></div>');
	adjustTag("feedbackForm", feedbackFormLeft, feedbackFormTop, feedbackFormWidth, feedbackFormHeight, "green");
	$('#feedbackForm').css("z-index","6");
	$('#feedbackForm').css("display","none");

	/* FEEDBACK FORM LABEL */
	feedbackFormLabelLeft = feedbackFormWidth * 0.1;
	feedbackFormLabelTop = feedbackFormHeight * 0.05;
	feedbackFormLabelWidth = feedbackFormWidth - feedbackFormLabelLeft;
	feedbackFormLabelHeight = feedbackFormHeight * 0.07;
	$("#feedbackForm").append('<div id="feedbackFormLabel">Tell us what you think about our site.</div>');
	adjustTag("feedbackFormLabel", feedbackFormLabelLeft, feedbackFormLabelTop, feedbackFormLabelWidth, feedbackFormLabelHeight, "clear");
	$("#feedbackFormLabel").css("text-align","left");

	/* FEEDBACK FORM EMAIL TEXTAREA */
	feedbackFormEmailTaWidth = feedbackFormWidth * 0.8;
	feedbackFormEmailTaLeft = (feedbackFormWidth - feedbackFormEmailTaWidth)/2;
	feedbackFormEmailTaTop = feedbackFormHeight * 0.15;
	feedbackFormEmailTaHeight = feedbackFormHeight * 0.09;
	$("#feedbackForm").append('<textarea name="message" id="feedbackFormEmailTa" rows="1" cols="30" wrap="SOFT">myEmail@domain.com</textarea>');
	adjustTag("feedbackFormEmailTa", feedbackFormEmailTaLeft, feedbackFormEmailTaTop, feedbackFormEmailTaWidth, feedbackFormEmailTaHeight, "clear");
	$("#feedbackFormEmailTa").css("text-align","left");
	$("#feedbackFormEmailTa").css("font-size",$("#feedbackFormLabel").css("font-size").replace(/px/g, '') - 4);

	$('#feedbackFormEmailTa').bind(onClickEvent, function (e) {
			$("#feedbackFormEmailTa").val('');
		});
		
	/* FEEDBACK FORM TEXTAREA */
	feedbackFormTextAreaWidth = feedbackFormWidth * 0.8;
	feedbackFormTextAreaLeft = (feedbackFormWidth - feedbackFormTextAreaWidth)/2;
	feedbackFormTextAreaTop = feedbackFormHeight * 0.3;
	feedbackFormTextAreaHeight = feedbackFormHeight * 0.55;
	$("#feedbackForm").append('<textarea name="message" id="feedbackFormTextArea" rows="5" cols="30" wrap="SOFT">Type your message here ...</textarea>');
	adjustTag("feedbackFormTextArea", feedbackFormTextAreaLeft, feedbackFormTextAreaTop, feedbackFormTextAreaWidth, feedbackFormTextAreaHeight, "clear");
	$("#feedbackFormTextArea").css("text-align","left");
	$("#feedbackFormTextArea").css("font-size",$("#feedbackFormLabel").css("font-size").replace(/px/g, '') - 4);

	$('#feedbackFormTextArea').bind(onClickEvent, function (e) {
			$("#feedbackFormTextArea").val('');
		});
	
	/* SEND BUTTON */
	sendButtonWidth = feedbackFormWidth * 0.15;
	sendButtonLeft = feedbackFormTextAreaLeft + feedbackFormTextAreaWidth - sendButtonWidth;
	sendButtonTop = feedbackFormHeight * 0.9;
	sendButtonHeight = feedbackFormHeight * 0.06;
	$("#feedbackForm").append('<input id="sendButton" type="button" name="send" value="Send" style="border:none">');
	adjustTag("sendButton", sendButtonLeft, sendButtonTop, sendButtonWidth, sendButtonHeight, "clear");

	$('#sendButton').bind(onClickEvent, function (e) {
		var message = $("textarea#feedbackFormTextArea").val();
		if (message == "") {
			$("#feedbackFormTextArea").focus();
			return false;
		}

		var email = $("textarea#feedbackFormEmailTa").val();
		if (email == "") {
			$("#feedbackFormEmailTa").focus();
			return false;
		}
		
		var dataString = '&message='+ message + '&email=' + email;
		$.ajax({
		  type: "POST",
		  url: "./php/feedback.php",
		  data: dataString,
		  success: function() {
			$('#feedbackForm').css("display","none");
			feedbackFormDisplayed = 0;
			$('#feedbackFormThanksLabel').css("display","");
			setTimeout(function() {
				$('#feedbackFormThanksLabel').css("display","none");
			}, 2000);
		  }
		});
		return false;
	});
	
	/* CANCEL BUTTON */
	cancelButtonLeft = sendButtonLeft - sendButtonWidth * 1.4;
	cancelButtonTop = feedbackFormHeight * 0.9;
	cancelButtonWidth = sendButtonWidth;
	cancelButtonHeight = sendButtonHeight;
	$("#feedbackForm").append('<input id="cancelButton" type="button" name="cancel" value="Cancel" style="border:none">');
	adjustTag("cancelButton", cancelButtonLeft, cancelButtonTop, cancelButtonWidth, cancelButtonHeight, "clear");

	$("#cancelButton").bind(onClickEvent, function (e) {
		$('#feedbackForm').css("display","none");
		feedbackFormDisplayed = 0;
	});
	
	/* FEEDBACK FORM THANKS */
	feedbackFormThanksLabelLeft = feedbackFormLeft;
	feedbackFormThanksLabelTop = feedbackFormTop;
	feedbackFormThanksLabelWidth = feedbackFormWidth;
	feedbackFormThanksLabelHeight = feedbackFormLabelHeight;
	$("body").append('<div id="feedbackFormThanksLabel">We appreciate your feedback. Thank you!</div>');
	adjustTag("feedbackFormThanksLabel", feedbackFormThanksLabelLeft, feedbackFormThanksLabelTop, feedbackFormThanksLabelWidth, feedbackFormThanksLabelHeight, "green");
	//$("#feedbackFormThanksLabel").css("text-align","left");
	$('#feedbackFormThanksLabel').css("display","none");

}