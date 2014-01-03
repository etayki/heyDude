function drawControls()
{
	$("body").append('<div id="controls" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth * 0.0645+'"></div>');
	$("#controls").append('<img src="./images/controlsBackground.png" style="position:absolute;left:0%;top:0%;width:100%;height:100%">');
	controlsLeft = 3;
	/* LEFT HAND */
	$("#controls").append('<img id="leftHand" src="./images/leftHandEnabled.png" on'+startEvent+'="didPressLeftHand()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%">');
	$("#controls").append('<div id="leftHandLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Left On</div>');
	controlsLeft += 6;

	/* RIGHT HAND */
	$("#controls").append('<img id="rightHand" src="./images/rightHandEnabled.png" on'+startEvent+'="didPressRightHand()"  style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%">');
	$("#controls").append('<div id="rightHandLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Right On</div>');
	controlsLeft += 6;

	/* DIVIDER */
	$("#controls").append('<img id="divider1" src="./images/divider.png" style="position:absolute;left:'+controlsLeft+'%;top:0%;width:1.3%;height:100%">');
	controlsLeft += 3.5;
	
	/* TRANSPOSITION BUTTONS */
	$("#controls").append('<img id="transMinusButton" src="./images/minusButtonEnabled.png" on'+startEvent+'="didPressTransMinusButton()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%">');
	$("#controls").append('<img id="transPlusButton" src="./images/plusButtonEnabled.png" on'+startEvent+'="didPressTransPlusButton()" style="position:absolute;left:'+(controlsLeft+5)+'%;top:25%;height:60%">');
	$("#controls").append('<div id="transpositionLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:9%;text-align:center;background-color:clear" class="ctrlLabel">Transpostion (0)</div>');
	controlsLeft += 12;

	/* NOTE BUTTON */
	$("#controls").append('<img id="notesButton" src="./images/notesDisabled.png" on'+startEvent+'="didPressNotes()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%">');
	$("#controls").append('<div id="notesLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Notes Off</div>');
	controlsLeft += 6;

	/* DIVIDER */
	$("#controls").append('<img id="divider2" src="./images/divider.png" style="position:absolute;left:'+controlsLeft+'%;top:0%;width:1.3%;height:100%">');
	controlsLeft += 3;

	/* PLAY BUTTON */
	$("#controls").append('<img id="playBtn" src="./images/playLoading.gif" on'+startEvent+'="didPressPlayButton()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%;width:4%">');
	$("#controls").append('<div id="playLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Play</div>');
	controlsLeft += 5.5;

	/* DIVIDER */
	$("#controls").append('<img id="divider3" src="./images/divider.png" style="position:absolute;left:'+controlsLeft+'%;top:0%;width:1.3%;height:100%">');
	controlsLeft += 4;

	/* METRONOME BUTTON */
	$("#controls").append('<img id="metronome" src="./images/metronomeDisabled.png" on'+startEvent+'="didPressMetronome()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%;width:4%">');
	$("#controls").append('<div id="metroLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Metro Off</div>');
	controlsLeft += 7;

	/* SPEED BUTTONS */
	$("#controls").append('<img id="speedMinusButton" src="./images/minusButtonEnabled.png" on'+startEvent+'="didPressSpeedMinusButton()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%">');
	$("#controls").append('<img id="speedPlusButton" src="./images/plusButtonDisabled.png" on'+startEvent+'="didPressSpeedPlusButton()" style="position:absolute;left:'+(controlsLeft+5)+'%;top:25%;height:60%">');
	$("#controls").append('<div id="speedLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:9%;text-align:center;background-color:clear" class="ctrlLabel">Speed: (100%)</div>');
	controlsLeft += 11;

	/* DIVIDER */
	$("#controls").append('<img id="divider4" src="./images/divider.png" style="position:absolute;left:'+controlsLeft+'%;top:0%;width:1.3%;height:100%">');
	controlsLeft += 4;

	/* ZOOM BUTTON */
	$("#controls").append('<img id="zoom" src="./images/zoomIn.png" on'+startEvent+'="didPressZoom()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%;width:4%">');
	$("#controls").append('<div id="zoomLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Zoom</div>');
	controlsLeft += 8;

	/* FULL SCREEN BUTTON */
	$("#controls").append('<img id="fullScreenButton" src="./images/fullScreen.png" on'+startEvent+'="didPressFullScreenButton()" style="position:absolute;left:'+controlsLeft+'%;top:23%;height:67%;width:4%">');
	$("#controls").append('<div id="fullScreenLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Full Screen</div>');
	controlsLeft += 8;

	/* FEEDBACK BUTTON */
	$("#controls").append('<img id="feedbackButton" src="./images/feedbackIcon.png" on'+startEvent+'="didPressFeedbackButton()" style="position:absolute;left:'+controlsLeft+'%;top:25%;height:60%;width:4%">');
	$("#controls").append('<div id="feedbackLabel" style="position:absolute;left:'+controlsLeft+'%;top:6%;height:15%;width:4%;text-align:center;background-color:clear" class="ctrlLabel">Feedback</div>');
	controlsLeft += 5.5;
	
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

	// /* POSITION LABEL */
	// $("body").append('<div id="positionLabel">1.00</div>');
	// positionLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.37;
	// positionLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.38;
	// positionLabelWidth = controlsBackgroundWidth * 0.03;
	// positionLabelHeight = positionLabelWidth;
	// adjustTag("positionLabel", positionLabelLeft, positionLabelTop, positionLabelWidth, positionLabelHeight, "clear");
	// $('#positionLabel').css("display","none");
	$(".ctrlLabel").css("font-size", getFontSize($("#leftHandLabel").height())+"px");
}


function didPressFullScreenButton()
{
	element = document.body;
	requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        requestMethod.call(element);
	$("#fullScreenButton").attr("src", "./images/cancelFullScreen.jpeg");
	$("#fullScreenButton").attr("on"+startEvent, "didPressCancelFullScreenButton()");
	$("#fullScreenLabel").text("Exit");
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
	$("#fullScreenButton").attr("on"+startEvent, "didPressFullScreenButton()");
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