var browser;
var clickEvent;
var startTime;

function drawScreen()
{
	console.log("setSceenWidth: " + (new Date().getTime() - startTime));
	setSceenWidth();
	console.log("drawHeader: " + (new Date().getTime() - startTime));
	drawHeader();
	console.log("drawMeasureTrack: " + (new Date().getTime() - startTime));
	drawMeasureTrack();
	console.log("drawMarkers: " + (new Date().getTime() - startTime));
	drawMarkers();
	console.log("colorizeMeasures: " + (new Date().getTime() - startTime));
	colorizeMeasures();
	console.log("drawControls: " + (new Date().getTime() - startTime));
	drawControls();
	console.log("drawTransposition: " + (new Date().getTime() - startTime));
	if (isiPad)
	//if (1)
	{
		drawTranspositionTablet();
		drawSpeedTablet();
	}
	else
	{
		drawMetronome();
		drawTransposition();
	}
	console.log("drawMetronome: " + (new Date().getTime() - startTime));
	console.log("drawPiano: " + (new Date().getTime() - startTime));
	//drawPiano(8,68);
	drawPiano(0,88);
	console.log("setEvents: " + (new Date().getTime() - startTime));
	setEvents();
	console.log("drawfeedback: " + (new Date().getTime() - startTime));
	drawfeedback();
	console.log("display: " + (new Date().getTime() - startTime));
	$("#loading").css("display","none");
	console.log("reportBrowser: " + (new Date().getTime() - startTime));
	reportBrowser();
	console.log("done: " + (new Date().getTime() - startTime));
}

function setSceenWidth()
{
	screenWidth = screen.width;
	userAgent = navigator.userAgent;
	isiPad = navigator.userAgent.match(/iPad/i) != null;

	if(userAgent.indexOf("iPhone") !== -1 || isiPad)
		screenWidth = 981;

	/* SET BACKGROUND IMAGE */
	$('body').css('background-image', 'url("./images/redCarpet.jpg")');
	$("body").append('<img id="backgroundImg" src=""></img>'); // Hack to make background img work in full screen
	$("#backgroundImg").css("width",screenWidth);
	$("#backgroundImg").css("height","auto");
	
   	clickEvent = "onclick";
    if(userAgent.indexOf("iPad") !== -1)
    {
		clickEvent = "ontouchstart";
	}
	else if(userAgent.indexOf("iPhone") !== -1)
	{
		clickEvent = "ontouchstart";
	}
	onClickEvent = clickEvent.replace("on","");
}

function drawHeader()
{
	/* MEASURE GRID HEADER */
	$("body").append('<div id="header"></div>');
	headerWidth = screenWidth;
	headerLeft = 0
	headerTop = 0;
	headerHeight = headerWidth * 0.065;
	headerColor = "#919191";
	adjustTag("header", headerLeft, headerTop, headerWidth, headerHeight, headerColor);	
	
	/* LOGO */
	$("body").append('<img id="logo" src="./images/logo.png"></img>');
	logoLeft = headerLeft + headerWidth * 0.03;
	logoHeight = headerHeight * 0.8;
	logoTop = headerTop + (headerHeight - logoHeight)/2;
	logoWidth = headerHeight * 1.3;
	adjustTag("logo", logoLeft, logoTop, logoWidth, logoHeight, "clear");
	
	/* COMPOSER PIC */
	$("body").append('<img id="composerPic" src="./images/beethoven.jpeg"></img>');
	composerPicTop = headerTop;
	composerPicHeight = headerHeight;
	composerPicWidth = headerHeight * 1.2;
	composerPicLeft = headerLeft + headerWidth - composerPicWidth + 1;
	adjustTag("composerPic", composerPicLeft, composerPicTop, composerPicWidth, composerPicHeight, "clear");
	
	/* TUNE LABEL */
	$("body").append('<div id="tuneLabel">Moonlight Sonata</div>');
	tuneLabelLeft =  headerLeft;
	tuneLabelTop = headerTop + headerHeight * 0.1;
	tuneLabelWidth = headerWidth;
	tuneLabelHeight = headerHeight * 0.4;
	adjustTag("tuneLabel", tuneLabelLeft, tuneLabelTop, tuneLabelWidth, tuneLabelHeight, "clear");
	
	/* ARTIST LABEL */
	$("body").append('<div id="artistLabel">L.V. Beethoven</div>');
	artisitLabelLeft =  headerLeft;
	artisitLabelTop = headerTop + headerHeight * 0.55;
	artisitLabelWidth = headerWidth;
	artisitLabelHeight = headerHeight * 0.25;
	adjustTag("artistLabel", artisitLabelLeft, artisitLabelTop, artisitLabelWidth, artisitLabelHeight, "clear");

	/* MEASURE GRID Bar */
	$("body").append('<div id="bar" style="border-style:solid;border-width:1px"></div>');
	barWidth = headerWidth - 1; // Subtract 1 because of the border width which adds one pixel on either side 
	barLeft = headerLeft;
	barTop = headerTop + headerHeight;
	barHeight = headerHeight * 0.4;
	barColor = "#919191";
	adjustTag("bar", barLeft, barTop, barWidth, barHeight, barColor);
}

var whiteKeyLabelHeight, blackKeyFingerLabelHeight, blackKeyNoteLabelHeight;
function drawPiano(startKey, endKey)
{
	/* RED LINE */
	redLineLeft =  controlsBackgroundLeft;
	redLineTop = controlsBackgroundTop + controlsBackgroundHeight;
	redLineWidth = controlsBackgroundWidth;
	redLineHeight = 5;
	if (startKey == 0) // Draw only once
	{
		$("body").append('<img id="redVelvet" src="./images/redLine.png" style="z-index:5"></img>');
		adjustTag("redVelvet", redLineLeft, redLineTop, redLineWidth, redLineHeight, "clear");
	}

	/* WHITE KEY */
	whiteKeyCount = 0;
	for (var key = startKey; key < endKey; key++)
	{
		var keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
			whiteKeyCount++;
	}

	whiteKeyWidth = controlsBackgroundWidth/(whiteKeyCount*1.015); // 52 white keys on keyboard, but we need room for margins

	whiteKeyTop = redLineTop + redLineHeight;
	whiteKeyHeight = whiteKeyWidth * 4.3;
	//console.log(whiteKeyHeight/screenWidth);
	
	/* WHITE KEY LABEL */
	whiteKeyLabelLeft = 0;
	whiteKeyLabelTop = whiteKeyHeight * 0.76;
	whiteKeyLabelWidth = whiteKeyWidth;
	whiteKeyLabelHeight = whiteKeyLabelWidth * 1;
	whiteKeyLabelFontSize = getFontSize(whiteKeyLabelHeight); 

	/* BLACK KEY */
	blackKeyLeft =  controlsBackgroundLeft;
	blackKeyTop = whiteKeyTop;
	blackKeyWidth = Math.floor(whiteKeyWidth * 0.55);
	blackKeyHeight = Math.floor(whiteKeyHeight * 0.57);
	
	/* BLACK KEY LABEL */
	blackKeyLabelLeft = 0;
	blackKeyLabelTop = blackKeyHeight * 0.5;
	blackKeyLabelWidth = blackKeyWidth;
	blackKeyLabelHeight = blackKeyLabelWidth * 2;
	blackKeyFingerLabelFontSize = getFontSize(blackKeyLabelHeight);
	blackKeyNoteLabelFontSize = getFontSize(blackKeyLabelHeight*0.5);

	$("body").append('<div id="pianoKeyboard" style="border-style:solid; border-width:2px; z-index:2"></div>');
	adjustTag("pianoKeyboard", 0, 246, screenWidth, screenWidth*0.085, "black");

	noteNames = ["A","Bb","B","C","C#","D","Eb","E","F","F#","G","Ab"];
	keyWidth = 1/52.5*100; // 52 keys + 0.5% key for padding between keys
	whiteKeyLeft = 0.1;
	for (var key = startKey; key < endKey; key++)
	{
		keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key!=startKey) whiteKeyLeft += keyWidth;
			/* WHITE KEY */
			$("#pianoKeyboard").append('<div id="key-'+key+'" class="key " style="border-style:solid; border-width:2px; z-index:2"></div>');
			adjustTag("key-"+key, whiteKeyLeft+"%", 0, keyWidth+"%", screenWidth*0.0755+"%", "white");
			/* WHITE KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag("keyLabel-"+key, 0, whiteKeyLabelTop, "100%", whiteKeyLabelHeight, "clear");
			$("#keyLabel-"+key).css("font-family", "arial");
			/* WHITE KEY NOTE LABEL */
			$("#key-"+key).append('<b><div id="keyNoteLabel-'+key+'" class="keyNoteLabel" style="color:black">'+noteNames[keyIdx]+'</div></b>');			
			adjustTag("keyNoteLabel-"+key, 0, whiteKeyLabelTop*0.73, "100%", whiteKeyLabelHeight, "clear");
			$("#keyNoteLabel-"+key).css("font-family", "arial");
		}
		else
		{
			/* BLACK KEY */
			blackKeyLeft =  whiteKeyLeft + keyWidth*0.74;
			$("#pianoKeyboard").append('<div id="key-'+key+'" class="key " style="border-style:solid; border-width:1px;z-index:3; "></div>');
			adjustTag("key-"+key, blackKeyLeft+"%", 0, keyWidth*0.55+"%", screenWidth*0.043+"%", "black");
			/* BLACK KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag("keyLabel-"+key, blackKeyLabelLeft, blackKeyLabelTop, blackKeyLabelWidth, blackKeyLabelHeight, "clear");
			$("#keyLabel-"+key).css("font-family", "arial");
			/* BLACK KEY NOTE LABEL */
			$("#key-"+key).append('<b><div id="keyNoteLabel-'+key+'" class="keyNoteLabel" style="color:black">'+noteNames[keyIdx]+'</div></b>');
			adjustTag("keyNoteLabel-"+key, blackKeyLabelLeft-10, blackKeyLabelTop*0.15, blackKeyLabelWidth+20, blackKeyLabelHeight*0.4, "clear");
			$("#keyNoteLabel-"+key).css("font-family", "arial");
		}
	}
	$('.keyNoteLabel').css("display","none");
}


function setEvents()
{
	$('img').on('dragstart', function(event) { event.preventDefault(); });

 	// iPad
 	document.body.addEventListener('touchmove',function(e){
	      //e.preventDefault();
	  });

 	// var tagList=[".measureBox","#playBtn","#metronome","#rightHand","#leftHand","#infoButton","#startMarker",
 	//              "#startMarker","#notesButton","#header","#logo","#composerPic","#tuneLabel",
 	//              "#artistLabel","#bar","#positionMarker","#startMarkerInfoLabel","#endMarkerInfoLabel",
 	//              "#leftHand","#rightHand","#leftHandLabel","#rightHandLabel","#infoButton","#handInfoPopup","#metronome",
 	//              "#fullScreenButton","#feedbackButton","#draggerTransTrack",".transpositionBox","#draggerTrack","#dragger",
 	//              "#keyboardBgrd", ".key", "#controlsBackground", "#divider1", "#divider2", "#divider3", "#divider4"];

 	// Disable double tap zoom
	doubleTouchStartTimestamp = 0;
	$("body").bind("touchstart", function (e) {
	    var now = +(new Date());
	    if (doubleTouchStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchStartTimestamp = now;
	});

	// PC

	$("body").mouseup(function() {
		draggerMouseDown = 0;
	});	

	keyPressTimer = 0;
	/* KEY TAP */
	$(".key").bind(onClickEvent, function (e) {
		/* RELEASE PREVIOUS NOTE */
		clearTimeout(keyPressTimer);
		resetNote(notePress);
		
		/* TURN ON NOTE */
		keyPress = ($(this).attr('id')).replace(new RegExp('key-','g'),'');
		notePress = Number(keyPress) + 21;
		//console.log(notePress);
		MIDI.noteOn(0,notePress,90,0);
		MIDI.noteOff(0,notePress,0.4);
		$("#key-"+keyPress).css("background-color","yellow");
		console.log("keyPress="+keyPress);

		keyPressTimer = setTimeout(function() {
			resetNote(notePress);
		}, 300);
			
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

function colorizeMeasures()
{
	for (number = 1; number <= startMeasure; number++)
	{			
		/* MEASURE BOX */
		$("#measureBoxDisplay-"+number).css("background-color","#cbcbcb");
	}
	for (number = startMeasure; number <= endMeasure; number++)
	{			
		/* MEASURE BoxDisplay */
		$("#measureBoxDisplay-"+number).css("background-color","#FFFF99");
	}
	for (number = endMeasure + 1; number <= (tune.length-1); number++)
	{			
		/* MEASURE BoxDisplay */
		$("#measureBoxDisplay-"+number).css("background-color","#cbcbcb");
	}
	$("#measureBoxDisplay-"+currentMeasure).css("background-color","#FFFF00");
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

function reportBrowser()
{
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    browser = M[0];
  	var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    browser = browser + " " + M[1];
    if(userAgent.indexOf("iPad") !== -1)
    {
		browser = "iPad " + browser;
	}
	else if(userAgent.indexOf("iPhone") !== -1)
	{
		browser = "iPhone " + browser;
	}
	else if(userAgent.indexOf("Nexus") !== -1)
	{
		browser = "Nexus " + browser;
	}
	else if(userAgent.indexOf("SM-T210R") !== -1)
	{
		browser = "SamsungTab3 " + browser;
	}
	else if(userAgent.indexOf("Android") !== -1)
	{
		browser = "Android " + browser;
	}
	//debug(userAgent);

 	// Report Browser
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","city.php?brsr="+browser,true);
	xmlhttp.send();
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
	
	if (tag.indexOf("Label") !== -1 || tag.indexOf("Button") !== -1)
	{
		if (tag.indexOf("measureBoxLabel") !== -1) // Save 400ms by doing this once earlier
			fontSize = measureBoxFontSize;
		else if (height == whiteKeyLabelHeight) 
			fontSize = whiteKeyLabelFontSize; 
		else if (height == blackKeyFingerLabelHeight) 
			fontSize = blackKeyFingerLabelFontSize; 
		else if (height == blackKeyNoteLabelHeight) 
			fontSize = blackKeyNoteLabelFontSize; 
		else
			fontSize = getFontSize(height); 

		if (tag.indexOf("feedbackTabLabel") !== -1)
		    fontSize -= 2;
		    
		if (tag.indexOf("Button") !== -1)
		    fontSize -= 4;
		    
		$("#"+tag).css("font-size", fontSize+"px");
		$("#"+tag).css("text-align","center");
	}
	
	if (tag.indexOf("feedbackTabLabel") !== -1)
	{
		$("#"+tag).css("width",feedbackTabWidth * 1.2);
	}
}

function getFontSize(labelHeight)
{
	$("body").append('<div id="textLabel"><span id="textSpan">Feedback</span></div>');

	fontSize = 0;
	do {
	    fontSize += 2;
	    $("#textLabel").css('font-size', fontSize);
	    spanHeight = Number($("#textSpan").css('height').replace(/px/g, ''));
	    feedbackTabWidth = Number($("#textSpan").css('width').replace(/px/g, ''));
	} while (spanHeight < labelHeight)
	
	$('#textLabel').remove();
	return fontSize;
}