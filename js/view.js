var info = {
	'measureControl' : "Press LEFT and RIGHT keys to change the Start Measure.<br>Press UP and DOWN keys to change the End Measure.<br>Press T to toggle between repeat and NO repeat.",
	'playControl'    : "Press SPACE key to toggle between Play and Pause.<br>Press S to stop.",
	'tempoControl'   : "Press < to decrease tempo.<br>Press > to increase tempo.",
	'handControl'    : "Press L for left hand only.<br>Press R for right hand only.<br>Press B to display both leftHand.",
	'repeatControl'  : "<br>Press 1 to repeat one measure.<br>Press 2 to repeat two measures."
};

var browser;
var clickEvent;

function drawScreen()
{
	setSceenWidth();
	drawHeader();
	drawMeasureGrid();
	drawMarkers();
	colorizeMeasures();
	drawControls();
	drawTransposition();
	drawMetronome();
	drawPiano();
	setEvents();
	drawfeedback();
	display();
	reportBrowser();
}

function setSceenWidth()
{
	//screenWidth = 950;
	screenWidth = screen.width;
	userAgent = navigator.userAgent;
	isiPad = navigator.userAgent.match(/iPad/i) != null;

	if(userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1)
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

function display()
{
	$("#loading").css("display","none");
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

 	// Report Browser
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","city.php?brsr="+browser,true);
	xmlhttp.send();
}

function drawHeader()
{
	/* MEASURE GRID HEADER */
	$("body").append('<div id="measureGridHeader"></div>');
	measureGridHeaderWidth = Math.floor(screenWidth * 1) - 1; // Subtract one to account for border of measureBox
	measureGridHeaderLeft = 0//(screenWidth - measureGridHeaderWidth)/2;
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
	composerPicLeft = measureGridHeaderLeft + measureGridHeaderWidth - composerPicWidth + 1;
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

	/* MEASURE GRID Bar */
	$("body").append('<div id="measureGridBar" style="border-style:solid;border-width:1px"></div>');
	measureGridBarWidth = measureGridHeaderWidth - 1; // Subtract 1 because of the border width which adds one pixel on either side 
	measureGridBarLeft = measureGridHeaderLeft;
	measureGridBarTop = measureGridHeaderTop + measureGridHeaderHeight;
	measureGridBarHeight = measureGridHeaderHeight * 0.4;
	measureGridBarColor = "#919191";
	adjustTag("measureGridBar", measureGridBarLeft, measureGridBarTop, measureGridBarWidth, measureGridBarHeight, measureGridBarColor);
}

function drawMeasureGrid()
{
	maxColumn = 23;
	maxRows = Math.floor(tune.length/maxColumn);
	maxBoxes = maxColumn * (maxRows);
	
	/* MEASURE BOX */
	measureBoxLeft = measureGridHeaderLeft;
	measureBoxWidth = measureGridHeaderWidth/maxColumn;
	measureBoxHeight = measureBoxWidth;
	measureBoxTop = measureGridBarTop + measureGridBarHeight;
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
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="border-style:solid;border-width:1px;cursor:pointer"></div>');
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
			measureBoxLeft = 0;//(screenWidth - measureGridHeaderWidth)/2;
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
	
	/* START MARKER */
	$("body").append('<img id="startMarker" src="./images/startMarker.png"></img>');
	startMarkerLeft = $("#measureBox-1").css("left").replace(/px/g, '');
	startMarkerTop = $("#measureBox-1").css("top").replace(/px/g, '');
	startMarkerWidth = Math.floor(measureBoxWidth * 0.4);
	startMarkerHeight = measureBoxHeight;
	adjustTag("startMarker", startMarkerLeft, startMarkerTop, startMarkerWidth, startMarkerHeight, "clear");
	
	/* END MARKER */
	$("body").append('<img id="endMarker" src="./images/endMarker.png"></img>');
	endMarkerLeft = $("#measureBox-"+endMeasure).css("left").replace(/px/g, '')  - startMarkerWidth + 1 + measureBoxWidth; // Add 1 because PowerPoint gives padding of 1;
	endMarkerTop = startMarkerTop;
	endMarkerWidth = startMarkerWidth;
	endMarkerHeight = measureBoxHeight;
	adjustTag("endMarker", endMarkerLeft, endMarkerTop, endMarkerWidth, endMarkerHeight, "clear");

	/* START MARKER INFO LABEL */
	$("body").append('<div id="startMarkerInfoLabel" style="color:white">Drag to Start</div>');
	startMarkerInfoLabelLeft =  measureGridHeaderLeft + measureBoxWidth * 0.1;
	startMarkerInfoLabelHeight = measureGridBarHeight * 0.5;
	startMarkerInfoLabelTop = measureGridBarTop + (measureGridBarHeight - startMarkerInfoLabelHeight)/2;
	startMarkerInfoLabelWidth = measureBoxWidth * 2;
	adjustTag("startMarkerInfoLabel", startMarkerInfoLabelLeft, startMarkerInfoLabelTop, startMarkerInfoLabelWidth, startMarkerInfoLabelHeight, "clear");
	$("#startMarkerInfoLabel").css("text-align", "left");
	
	/* END MARKER INFO LABEL */
	$("body").append('<div id="endMarkerInfoLabel" style="color:white">Drag to End</div>');
	endMarkerInfoLabelLeft =  measureGridHeaderLeft + measureBoxWidth * (endMeasure-2);
	endMarkerInfoLabelHeight = measureGridBarHeight * 0.5;
	endMarkerInfoLabelTop = measureGridBarTop + (measureGridBarHeight - endMarkerInfoLabelHeight)/2;
	endMarkerInfoLabelWidth = measureBoxWidth * 4;
	adjustTag("endMarkerInfoLabel", endMarkerInfoLabelLeft, endMarkerInfoLabelTop, endMarkerInfoLabelWidth, endMarkerInfoLabelHeight, "clear");
}

function drawControls()
{
	/* CONTROLS BACKGROUND */
	$("body").append('<img id="controlsBackground" src="./images/controlsBackground.png"></img>');
	controlsBackgroundLeft =  measureGridHeaderLeft;
	controlsBackgroundTop = Number($("#measureBox-68").css("top").replace(/px/g, '')) + measureBoxHeight;
	controlsBackgroundWidth = measureGridHeaderWidth + 2;
	controlsBackgroundHeight = measureBoxHeight * 1.5;
	adjustTag("controlsBackground", controlsBackgroundLeft, controlsBackgroundTop, controlsBackgroundWidth, controlsBackgroundHeight, "clear");


	/* LEFT HAND */
	$("body").append('<img id="leftHand" src="./images/leftHandEnabled.png "'+clickEvent+'="didPressLeftHand()"></img>');
	leftHandWidth = controlsBackgroundHeight * 0.6;
	leftHandHeight = leftHandWidth;
	leftHandLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.02;
	leftHandTop = controlsBackgroundTop + (controlsBackgroundHeight - leftHandHeight) * 0.6;
	adjustTag("leftHand", leftHandLeft, leftHandTop, leftHandWidth, leftHandHeight, "clear");

	/* LEFT HAND LABEL */
	$("body").append('<div id="leftHandLabel">Left On</div>');
	leftHandLabelLeft =  leftHandLeft - leftHandWidth;
	leftHandLabelTop = leftHandTop - leftHandHeight * 0.3;
	leftHandLabelWidth = leftHandWidth * 3;
	leftHandLabelHeight = controlsBackgroundHeight * 0.145;
	adjustTag("leftHandLabel", leftHandLabelLeft, leftHandLabelTop, leftHandLabelWidth, leftHandLabelHeight, "clear");
	
	/* RIGHT HAND */
	$("body").append('<img id="rightHand" src="./images/rightHandEnabled.png "'+clickEvent+'="didPressRightHand()"></img>');
	rightHandWidth = controlsBackgroundHeight * 0.6;
	rightHandHeight = leftHandHeight;
	rightHandLeft =  leftHandLeft + leftHandWidth * 2;
	rightHandTop = leftHandTop;
	adjustTag("rightHand", rightHandLeft, rightHandTop, rightHandWidth, rightHandHeight, "clear");

	/* RIGHT HAND LABEL */
	$("body").append('<div id="rightHandLabel">Right On</div>');
	rightHandLabelLeft =  rightHandLeft - rightHandWidth;
	rightHandLabelTop = leftHandLabelTop;
	rightHandLabelWidth = rightHandWidth * 3;
	rightHandLabelHeight = controlsBackgroundHeight * 0.145;
	adjustTag("rightHandLabel", rightHandLabelLeft, rightHandLabelTop, rightHandLabelWidth, rightHandLabelHeight, "clear");
	
	/* INFO BUTTON */
	$("body").append('<img id="infoButton" src="./images/info.png"></img>');
	infoButtonWidth = controlsBackgroundHeight * 0.3;
	infoButtonHeight = infoButtonWidth;
	infoButtonLeft =  leftHandLeft + leftHandWidth + ((rightHandLeft - (leftHandLeft + leftHandWidth)) - infoButtonWidth)/2;
	infoButtonTop = rightHandTop + (rightHandHeight - infoButtonHeight)/2;
	adjustTag("infoButton", infoButtonLeft, infoButtonTop, infoButtonWidth, infoButtonHeight, "clear");

	$('#infoButton').bind(onClickEvent, function (e) {
 		if ($("#playBtn").attr("src") ==  "http://watchandrepeat.com/images/pauseButton.png")
			didPressPauseButton();
		feedbackFormDisplayed = 1;
		$('#handInfoPopup').css("display","");
		$('#handInfoPopupCloseButton').css("display","");
	});
	
	/* HAND INFO POPUP */
	$("body").append('<img id="handInfoPopup" src="./images/handInfo.png"></img>');
	handInfoPopupWidth = controlsBackgroundWidth * 0.3;
	handInfoPopupHeight = handInfoPopupWidth * 0.9;
	handInfoPopupLeft = controlsBackgroundLeft + (controlsBackgroundWidth - handInfoPopupWidth)/2;
	handInfoPopupTop = controlsBackgroundTop - 2 * measureBoxHeight;
	
	adjustTag("handInfoPopup", handInfoPopupLeft, handInfoPopupTop, handInfoPopupWidth, handInfoPopupHeight, "clear");
	$('#handInfoPopup').css("z-index","6");
	$('#handInfoPopup').css("display","none");

	$("#handInfoPopup").bind(onClickEvent, function (e) {
		feedbackFormDisplayed = 0;
		$('#handInfoPopup').css("display","none");
		//$('#handInfoPopupCloseButton').css("display","none");
	});
	
	/* DIVIDER */
	$("body").append('<img id="divider1" src="./images/divider.png"></img>');
	dividerLeft =  infoButtonLeft + leftHandWidth * 2.2;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider1", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	/* PLAY BUTTON */
	$("body").append('<img id="playBtn" src="./images/loading.gif "'+clickEvent+'="didPressPlayButton()"></img>');
	playButtonLeft =  controlsBackgroundWidth * 0.43;
	playButtonTop = leftHandTop;
	playButtonWidth = controlsBackgroundHeight * 0.6;
	playButtonHeight = leftHandHeight;
	adjustTag("playBtn", playButtonLeft, playButtonTop, playButtonWidth, playButtonHeight, "clear");

	/* PLAY LABEL */
	$("body").append('<div id="playLabel">Play</div>');
	playLabelLeft =  playButtonLeft - playButtonWidth;
	playLabelTop = leftHandLabelTop;
	playLabelWidth = leftHandLabelWidth;
	playLabelHeight = controlsBackgroundHeight * 0.145;
	adjustTag("playLabel", playLabelLeft, playLabelTop, playLabelWidth, playLabelHeight, "clear");
	
	/* DIVIDER */
	$("body").append('<img id="divider2" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundWidth * 0.5;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider2", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	/* METRONOME IMAGE */
	$("body").append('<img id="metronome" src="./images/metronome.png"></img>');
	metronomeLeft =  controlsBackgroundWidth * 0.53;
	metronomeHeight = controlsBackgroundHeight * 0.6;
	metronomeTop = controlsBackgroundTop + (controlsBackgroundHeight - metronomeHeight) * 0.7;
	metronomeWidth = metronomeHeight * 0.6;
	adjustTag("metronome", metronomeLeft, metronomeTop, metronomeWidth, metronomeHeight, "clear");
	
	/* TEMPO LABEL */
	$("body").append('<div id="metroLabel">Metro Off</div>');
	tempoLabelLeft =  metronomeLeft - metronomeWidth;
	tempoLabelTop = leftHandLabelTop;
	tempoLabelWidth = metronomeWidth * 3;
	tempoLabelHeight = leftHandLabelHeight;
	adjustTag("metroLabel", tempoLabelLeft, tempoLabelTop, tempoLabelWidth, tempoLabelHeight, "clear");
	
	/* SLOW LABEL */
	$("body").append('<div id="slowLabel">Slow</div>');
	slowLabelLeft =  metronomeLeft + leftHandWidth;
	slowLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.65;
	slowLabelWidth = controlsBackgroundWidth * 0.05;
	slowLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("slowLabel", slowLabelLeft, slowLabelTop, slowLabelWidth, slowLabelHeight, "clear");
	
	/* FAST LABEL */
	$("body").append('<div id="fastLabel">Fast</div>');
	fastLabelLeft =  slowLabelLeft + leftHandWidth * 3.5;
	fastLabelTop = slowLabelTop;
	fastLabelWidth = controlsBackgroundWidth * 0.05;
	fastLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("fastLabel", fastLabelLeft, fastLabelTop, fastLabelWidth, fastLabelHeight, "clear");

	/* DIVIDER */
	$("body").append('<img id="divider3" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundWidth * 0.78;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider3", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	/* FULL SCREEN BUTTON */
	$("body").append('<img id="fullScreenButton" src="./images/fullScreen.png "'+clickEvent+'="didPressFullScreenButton()"></img>');
	fullScreenButtonLeft =  controlsBackgroundWidth * 0.85;
	fullScreenButtonTop = leftHandTop;
	fullScreenButtonWidth = controlsBackgroundHeight * 0.6;
	fullScreenButtonHeight = leftHandHeight * 1.07;
	adjustTag("fullScreenButton", fullScreenButtonLeft, fullScreenButtonTop, fullScreenButtonWidth, fullScreenButtonHeight, "clear");
	if (isiPad)
		$('#fullScreenButton').css("display","none");

	/* FULL SCREEN LABEL */
	$("body").append('<div id="fullScreenLabel">Full Screen</div>');
	fullScreenLabelWidth = leftHandLabelWidth * 0.6;
	fullScreenLabelLeft =  fullScreenButtonLeft - (fullScreenLabelWidth - fullScreenButtonWidth)/2;
	fullScreenLabelTop = leftHandLabelTop;
	fullScreenLabelHeight = leftHandLabelHeight;
	adjustTag("fullScreenLabel", fullScreenLabelLeft, fullScreenLabelTop, fullScreenLabelWidth, fullScreenLabelHeight, "clear");
	if (isiPad)
		$('#fullScreenLabel').css("display","none");

	/* FEEDBACK BUTTON */
	$("body").append('<img id="feedbackButton" src="./images/feedbackIcon.png "'+clickEvent+'="didPressFeedbackButton()"></img>');
	feedbackButtonLeft =  fullScreenButtonLeft + 2 * fullScreenButtonWidth;
	feedbackButtonTop = leftHandTop;
	feedbackButtonWidth = controlsBackgroundHeight * 0.6;
	feedbackButtonHeight = leftHandHeight;
	adjustTag("feedbackButton", feedbackButtonLeft, feedbackButtonTop, feedbackButtonWidth, feedbackButtonHeight, "clear");

	/* FEEDBACK LABEL */
	$("body").append('<div id="feedbackLabel">Feedback</div>');
	feedbackLabelWidth = leftHandLabelWidth * 0.6;
	feedbackLabelLeft =  feedbackButtonLeft - (feedbackLabelWidth - feedbackButtonWidth)/2;
	feedbackLabelTop = leftHandLabelTop;
	feedbackLabelHeight = leftHandLabelHeight;
	adjustTag("feedbackLabel", feedbackLabelLeft, feedbackLabelTop, feedbackLabelWidth, feedbackLabelHeight, "clear");
}

function drawTransposition()
{
	/* TRANSPOSITION BOX */
	transpositionBoxLeft = controlsBackgroundWidth * 0.21;
	transpositionBoxWidth = (fastLabelLeft - slowLabelLeft)/7;
	transpositionBoxHeight = controlsBackgroundHeight;
	transpositionBoxTop = controlsBackgroundTop + (controlsBackgroundHeight - transpositionBoxHeight)/2;
	transpositionBoxColor = "red";
	
	/* TRANSPOSITION DRAGGER TRACK */
	draggerTrackLeft = transpositionBoxLeft;
	draggerTrackWidth = (fastLabelLeft - slowLabelLeft);
	draggerTrackHeight = transpositionBoxWidth * 0.4;
	draggerTrackTop = controlsBackgroundTop + (controlsBackgroundHeight - draggerTrackHeight)/2;
	draggerTrackColor = "5884F1";
	$("body").append('<div id="draggerTransTrack"></div>');
	adjustTag("draggerTransTrack", draggerTrackLeft, draggerTrackTop, draggerTrackWidth, draggerTrackHeight, draggerTrackColor);

	/* TRANSPOSITION LABEL */
	$("body").append('<div id="transpositionLabel">Transposition</div>');
	speedLabelLeft =  draggerTrackLeft;
	speedLabelTop = leftHandLabelTop;
	speedLabelWidth = draggerTrackWidth;
	speedLabelHeight = leftHandLabelHeight;
	adjustTag("transpositionLabel", speedLabelLeft, speedLabelTop, speedLabelWidth, speedLabelHeight, "clear");

	transpositionBoxLeft += 5;
	transpositionBoxMax = 13;
	for (number = 1; number <= transpositionBoxMax; number++)
	{	
		/* transposition BOX */
		$("body").append('<div id="transpositionBox-'+number+'" class="transpositionBox" style="border-style:solid; border-width:1px; z-index:1"></div>');
		adjustTag("transpositionBox-"+number, transpositionBoxLeft, transpositionBoxTop, transpositionBoxWidth/2, transpositionBoxHeight, transpositionBoxColor);
		transpositionBoxLeft += transpositionBoxWidth/2;
	}
	
	// /* DRAGGER */
	// draggerBoxLeft = $("#transpositionBox-"+45).css("left").replace(/px/g, '');
	// draggerBoxWidth = transpositionBoxWidth;
	// draggerBoxHeight = draggerBoxWidth;
	// draggerBoxTop = transpositionBoxTop - (draggerBoxHeight-transpositionBoxHeight)/2;
	// $("body").append('<img id="dragger" src="./images/dragger.png" style="z-index:2"></img>');
	// adjustTag("dragger", draggerBoxLeft, draggerBoxTop, draggerBoxWidth, draggerBoxHeight, "clear");

	// /* EVENTS */
	// $(".transpositionBox").bind(onClickEvent, function (e) {
	// 	newtranspositionBox = $(this).attr('id');
	// 	newtranspositionBox = Number(newtranspositionBox.replace(/transpositionBox-/g,''));
	// 	draggerBoxLeft = $("#transpositionBox-"+newtranspositionBox).css("left").replace(/px/g, '') - 12;
	// 	$("#dragger").css("left", draggerBoxLeft);
	// 	setTempo(newtranspositionBox);	
	//   });
	
	// $(".transpositionBox").hover(function() {
	// 	transpositionBoxId = $(this).attr('id');
	// 	newTempo = transpositionBoxId.replace(/transpositionBox-/g, '');
	// 	if (draggerMouseDown)
	// 	{
	// 		draggerBoxLeft = $("#transpositionBox-"+newTempo).css("left").replace(/px/g, '') - 12;
	// 		$("#dragger").css("left", draggerBoxLeft);
	// 		setTempo(newTempo);
	// 	}
	// });
	
	// draggerMouseDown = 0;	
	// $("#dragger").mousedown(function() {
	// 	$("#dragger").css("z-index", 0);
	// 	draggerMouseDown = 1;
	// });

	// $("body").mouseup(function() {
	// 	$("#dragger").css("z-index", 2);
	// });

	// // $('#dragger').bind('touchstart', function(e){
	// // 	e.preventDefault();
	// // });

	// $('#dragger').bind('touchmove', function(e){
	// 	e.preventDefault();
	// 	for (number = 1; number <= transpositionMaxBox; number++)
	// 	{
	// 		transpositionBoxLeft = Number($("#transpositionBox-"+number).css('left').replace(/px/g, ''));
	// 		//debug (number + " " + transpositionBoxLeft + " " + transpositionBoxTop + " " + transpositionBoxWidth);
	// 		//debug (number + " " + event.touches[0].pageY + ">" + (measureBoxTop + measureBoxWidth));
	// 		//debug (number + " " + event.touches[0].pageX + " " + transpositionBoxLeft)
	// 		if (event.touches[0].pageX == transpositionBoxLeft)
	// 		{
	// 				//debug(number);
	// 				draggerBoxLeft = $("#transpositionBox-"+number).css("left").replace(/px/g, '') - 12;
	// 				$("#dragger").css("left", draggerBoxLeft);
	// 				setTempo(number);
	// 		}
	// 	}
	// });
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
	$("body").append('<div id="speedLabel">Speed</div>');
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
	draggerBoxLeft = $("#metronomeBox-"+45).css("left").replace(/px/g, '');
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
		e.preventDefault();
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

function drawPiano()
{
	/* RED LINE */
	$("body").append('<img id="redVelvet" src="./images/redLine.png" style="z-index:5"></img>');
	redLineLeft =  controlsBackgroundLeft;
	redLineTop = controlsBackgroundTop + controlsBackgroundHeight;
	redLineWidth = controlsBackgroundWidth;
	redLineHeight = 5;
	adjustTag("redVelvet", redLineLeft, redLineTop, redLineWidth, redLineHeight, "clear");
	
	/* WHITE KEY */
	whiteKeyWidth = controlsBackgroundWidth/52.5; // 52 white keys on keyboard, but we need room for margins
	whiteKeyLeft = controlsBackgroundLeft + (controlsBackgroundWidth - whiteKeyWidth * 52) * 0.4;
	whiteKeyTop = redLineTop + redLineHeight;
	whiteKeyHeight = whiteKeyWidth * 4.3;
	
	/* WHITE KEY LABEL */
	whiteKeyLabelLeft = 0;
	whiteKeyLabelTop = whiteKeyHeight * 0.6;
	whiteKeyLabelWidth = whiteKeyWidth;
	whiteKeyLabelHeight = whiteKeyLabelWidth * 1.6;
	
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

	/* KEYBOARD BACKGROUND */
	$("body").append('<div id="keyboardBgrd"></div>');
	keyboardBgrdLeft =  controlsBackgroundLeft;
	keyboardBgrdTop = redLineTop + redLineHeight;
	keyboardBgrdWidth = controlsBackgroundWidth;
	keyboardBgrdHeight = whiteKeyHeight * 1.07;
	adjustTag("keyboardBgrd", keyboardBgrdLeft, keyboardBgrdTop, keyboardBgrdWidth, keyboardBgrdHeight, "black");
	
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
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag("keyLabel-"+key, whiteKeyLabelLeft, whiteKeyLabelTop, whiteKeyLabelWidth, whiteKeyLabelHeight, "clear");
			$("#keyLabel-"+key).css("font-family", "arial");
		}
		else
		{
			/* BLACK KEY */
			blackKeyLeft =  whiteKeyLeft + Math.floor(whiteKeyWidth * 0.75);
			$("body").append('<div id="key-'+key+'" class="key" style="z-index:3; border-style:solid; border-width:1px"></div>');
			adjustTag("key-"+key, blackKeyLeft, blackKeyTop, blackKeyWidth, blackKeyHeight, "black");
			/* BLACK KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag("keyLabel-"+key, blackKeyLabelLeft, blackKeyLabelTop, blackKeyLabelWidth, blackKeyLabelHeight, "clear");
			$("#keyLabel-"+key).css("font-family", "arial");
		}
	}
}

function setEvents()
{
	$('img').on('dragstart', function(event) { event.preventDefault(); });

	startMarkerMouseDown = 0;
	endMarkerMouseDown = 0;

 	// iPad
 	document.body.addEventListener('touchmove',function(e){
	      //e.preventDefault();
	  });

	doubleTouchStartTimestamp = 0;
	$('#playBtn').bind("touchstart", function (event) {
	    var now = +(new Date());
	    if (doubleTouchStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchStartTimestamp = now;
	});

	doubleTouchRHandStartTimestamp = 0;
	$('#rightHand').bind("touchstart", function (event) {
	    var now = +(new Date());
	    if (doubleTouchRHandStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchRHandStartTimestamp = now;
	});

	doubleTouchLHandStartTimestamp = 0;
	$('#leftHand').bind("touchstart", function (event) {
	    var now = +(new Date());
	    if (doubleTouchLHandStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchLHandStartTimestamp = now;
	});

	doubleTouchInfoBtnStartTimestamp = 0;
	$('#infoButton').bind("touchstart", function (event) {
	    var now = +(new Date());
	    if (doubleTouchInfoBtnStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchInfoBtnStartTimestamp = now;
	});

	$('#startMarker').bind('touchstart', function(e){
		e.preventDefault();
	});

	$('#startMarker').bind('touchmove', function(e){
		e.preventDefault();
		for (number = 1; number <= maxBoxes; number++)
		{
			measureBoxLeft = Number($("#measureBox-"+number).css('left').replace(/px/g, ''));
			measureBoxTop = Number($("#measureBox-"+number).css('top').replace(/px/g, ''));
			measureBoxWidth = Number($("#measureBox-"+number).css('width').replace(/px/g, ''));
			//debug (number + " " + event.touches[0].pageY + ">" + (measureBoxTop + measureBoxWidth));
			if (event.touches[0].pageX > measureBoxLeft &&
				event.touches[0].pageX < (measureBoxLeft + measureBoxWidth) &&
				event.touches[0].pageY > measureBoxTop && 
				event.touches[0].pageY < (measureBoxTop + measureBoxWidth))
			{
				if (number != endMeasure)
				{				
					//debug(number);
					setStartMeasure(number);
				}
			}
		}
	});

	$('#endMarker').bind('touchstart', function(e){
		e.preventDefault();
	});

	$('#endMarker').bind('touchmove', function(e){
		e.preventDefault();
		for (number = 1; number <= maxBoxes; number++)
		{
			measureBoxLeft = Number($("#measureBox-"+number).css('left').replace(/px/g, ''));
			measureBoxTop = Number($("#measureBox-"+number).css('top').replace(/px/g, ''));
			measureBoxWidth = Number($("#measureBox-"+number).css('width').replace(/px/g, ''));
			//debug (number + " " + event.touches[0].pageY + ">" + (measureBoxTop + measureBoxWidth));
			if (event.touches[0].pageX > measureBoxLeft &&
				event.touches[0].pageX < (measureBoxLeft + measureBoxWidth) &&
				event.touches[0].pageY > measureBoxTop && 
				event.touches[0].pageY < (measureBoxTop + measureBoxWidth))
			{
				if (number != endMeasure)
				{				
					//debug(number);
					setEndMeasure(number);
				}
			}
		}
	});
	
	// PC
	$("#startMarker").mousedown(function() {
		if (isiPad) return;
		startMarkerMouseDown = 1;
	});

	$("#endMarker").mousedown(function() {
		if (isiPad) return;		
		endMarkerMouseDown = 1;
	});

	$("body").mouseup(function() {
		startMarkerMouseDown = 0;
		endMarkerMouseDown = 0;
		draggerMouseDown = 0;	
	});

	/* SET START/END MARKERS */
	$(".measureBox").mouseover(function() {
		//debug("mouseover");
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		if (startMarkerMouseDown && newMeasure != startMeasure)
		{
			setStartMeasure(newMeasure);
		}
		else if (endMarkerMouseDown && newMeasure != endMeasure)
		{
			setEndMeasure(newMeasure);
		}
	});

	/* SET CURRENT MEASURE */
	$(".measureBox").bind(onClickEvent, function(e){
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		setCurrentMeasure(newMeasure);
	});		

	// iPad
	doubleTouchmMsrBoxStartTimestamp = 0;
	$('.measureBox').bind("touchstart", function (e) {
	    var now = +(new Date());
	    if (doubleTouchmMsrBoxStartTimestamp + 500 > now) {
	        event.preventDefault();
	    }
	    doubleTouchmMsrBoxStartTimestamp = now;
	});

	keyPressTimer = 0;
	/* KEY TAP */
	$(".key").bind(onClickEvent, function (e) {
		/* RELEASE PREVIOUS NOTE */
		clearTimeout(keyPressTimer);
		resetNote(notePress);
		
		/* TURN ON NOTE */
		keyPress = ($(this).attr('id')).replace(/key-/g,'');
		notePress = Number(keyPress) + 21;
		MIDI.noteOn(0,notePress,90,0);
		MIDI.noteOff(0,notePress,0.4);
		$("#key-"+keyPress).css("background-color","yellow");

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

function setPositionMarker()
{
	/* SET POSITION LABEL */
	position = (Math.floor((delay/4 + 1)*100)/100).toFixed(2);
	$("#positionLabel").text(position);
	
	/* SET POSITION MARKER */
	nowMeasure = Math.floor(position);
	if (nowMeasure != currentMeasure)
	{
		currentMeasure = nowMeasure;
		colorizeMeasures();
	}
	measureBoxLeft = Number($("#measureBox-"+currentMeasure).css("left").replace(/px/g, ''));
	measureBoxTop = Number($("#measureBox-"+currentMeasure).css("top").replace(/px/g, ''));
	positionMarkerLeft = measureBoxLeft + (position-currentMeasure) * measureBoxWidth;
	$("#positionMarker").css("left", positionMarkerLeft);
	$("#positionMarker").css("top", measureBoxTop);
	$("#positionMarker").css("width", positionMarkerWidth);
	
	if (currentMeasure == endMeasure)
	{
		remainingMeasureWidth = measureBoxWidth - (position-currentMeasure) * measureBoxWidth;
		if (positionMarkerWidth > remainingMeasureWidth)
			$("#positionMarker").css("width", remainingMeasureWidth);
	}

}

function setStartMarker(measure)
{
	startMarkerLeft = $("#measureBox-"+measure).css("left").replace(/px/g, '');
	startMarkerTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#startMarker").css("left", startMarkerLeft);
	$("#startMarker").css("top", startMarkerTop);	
}

function setEndMarker(measure)
{
	endMarkerLeft =  $("#measureBox-"+measure).css("left").replace(/px/g, '') - startMarkerWidth + 1 + measureBoxWidth;
	endMarkerTop = $("#measureBox-"+measure).css("top").replace(/px/g, '');
	$("#endMarker").css("left", endMarkerLeft);
	$("#endMarker").css("top", endMarkerTop);	
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
		$("#measureBox-"+number).css("background-color","#FFFF99");
	}
	for (number = endMeasure + 1; number <= maxBoxes; number++)
	{			
		/* MEASURE BOX */
		$("#measureBox-"+number).css("background-color",measureBoxColor);
	}
	$("#measureBox-"+currentMeasure).css("background-color","#FFFF00");
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

function didPressRepeatButton()
{
	/* TOGGLE FROM ENABLED TO DISABLED */
	if (repeatEnabled)
	{
		$("#repeatButton").attr("src", "./images/repeatDisabled.png");
		$('#repeatLabel').text("Repeat Off");
		repeatEnabled = 0;
	}
	else
	{
		$("#repeatButton").attr("src", "./images/repeatEnabled.png");
		$('#repeatLabel').text("Repeat On");
		repeatEnabled = 1;
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