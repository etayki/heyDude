var browser;
var clickEvent;

function drawScreen()
{
	startTime = new Date().getTime();
	//console.log("setSceenWidth: " + (new Date().getTime() - startTime));
	setSceenWidth();
	//console.log("drawHeader: " + (new Date().getTime() - startTime));
	drawHeader();
	//console.log("drawMeasureTrack: " + (new Date().getTime() - startTime));
	drawMeasureTrack();
	//console.log("drawMarkers: " + (new Date().getTime() - startTime));
	drawMarkers();
	//console.log("colorizeMeasures: " + (new Date().getTime() - startTime));
	colorizeMeasures();
	//console.log("drawControls: " + (new Date().getTime() - startTime));
	drawControls();
	//console.log("drawTransposition: " + (new Date().getTime() - startTime));
	// if (isiPad)
	// //if (1)
	// {
	// 	drawTranspositionTablet();
	// 	drawSpeedTablet();
	// }
	// else
	// {
	// 	drawMetronome();
	// 	drawTransposition();
	// }
	//console.log("drawMetronome: " + (new Date().getTime() - startTime));
	//console.log("drawPiano: " + (new Date().getTime() - startTime));
	//drawPiano(8,68);
	//drawPiano(0,88);
	//console.log("setEvents: " + (new Date().getTime() - startTime));
	//setEvents();
	//console.log("drawfeedback: " + (new Date().getTime() - startTime));
	//drawfeedback();
	//console.log("display: " + (new Date().getTime() - startTime));
	display();
	//console.log("reportBrowser: " + (new Date().getTime() - startTime));
	reportBrowser();
	//console.log("done: " + (new Date().getTime() - startTime));
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

function drawHeader()
{
	/* MEASURE GRID HEADER */
	$("body").append('<div id="measureGridHeader"></div>');
	measureGridHeaderWidth = screenWidth;
	measureGridHeaderLeft = 0
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
	$("body").append('<div id="artistLabel">L.V. Beethoven</div>');
	artisitLabelLeft =  measureGridHeaderLeft;
	artisitLabelTop = measureGridHeaderTop + measureGridHeaderHeight * 0.55;
	artisitLabelWidth = measureGridHeaderWidth;
	artisitLabelHeight = measureGridHeaderHeight * 0.25;
	adjustTag("artistLabel", artisitLabelLeft, artisitLabelTop, artisitLabelWidth, artisitLabelHeight, "clear");

	/* MEASURE GRID Bar */
	$("body").append('<div id="measureGridBar" style="border-style:solid;border-width:1px"></div>');
	measureGridBarWidth = measureGridHeaderWidth - 1; // Subtract 1 because of the border width which adds one pixel on either side 
	measureGridBarLeft = measureGridHeaderLeft;
	measureGridBarTop = measureGridHeaderTop + measureGridHeaderHeight;
	measureGridBarHeight = measureGridHeaderHeight * 0.4;
	measureGridBarColor = "#919191";
	adjustTag("measureGridBar", measureGridBarLeft, measureGridBarTop, measureGridBarWidth, measureGridBarHeight, measureGridBarColor);
}

function drawMeasureTrack()
{
	/* MEASURE BOX */
	measureBoxWidth = screenWidth/(tune.length+7); // 8 more boxes than measures to give room for markers
	measureBoxLeft = 0;
	measureBoxHeight = 50;
	measureBoxTop = measureGridBarTop + measureGridBarHeight;
	measureBoxColor = "clear";//"#cbcbcb";

	/* MEASURE LABEL */
	measureBoxLabelWidth = measureBoxWidth * 0.4;
	measureBoxLabelLeft = (measureBoxWidth - measureBoxLabelWidth)/2;
	measureBoxLabelTop = measureBoxLabelLeft;
	measureBoxLabelHeight = measureBoxLabelWidth;
	measureBoxFontSize = getFontSize(measureBoxLabelHeight);

	/* MEASURE GRID */
	for (number = -3; number < tune.length + 4; number++)
	{			
		/* MEASURE BOX */ // border-style:solid; border-width:0px; z-index:1
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="border-style:solid;border-width:1px;cursor:pointer;z-index:1"></div>');
		adjustTag("measureBox-"+number, measureBoxLeft, measureBoxTop-40, measureBoxWidth, measureBoxHeight+80, measureBoxColor);

       //if (number < tune.length)
		{
        	/* MEASURE BOX LABEL */
        	measureBoxLabel = '<div id="measureBoxLabel-'+number+'">'+number+'</div>';
        	$("#measureBox-"+number).append(measureBoxLabel);
        	adjustTag("measureBoxLabel-"+number, measureBoxLabelLeft, measureBoxLabelTop, measureBoxLabelWidth, measureBoxLabelHeight, "clear");
        	//$("#measureBoxLabel-"+number).css("position", "absolute");
		}

		measureBoxLeft += measureBoxWidth;
		//console.log(measureBoxWidth);
		if (measureBoxLeft >= (measureGridHeaderLeft + measureGridHeaderWidth - measureBoxWidth/2)) // Need to subtract a little, don't know why
		{
			measureBoxLeft = 0;//(screenWidth - measureGridHeaderWidth)/2;
			measureBoxTop += measureBoxHeight;
		}
	}	
}

var	startMarkerMouseDown = 0;
var	endMarkerMouseDown = 0;
var startMarkerOffset = endMarkerOffset = -1;

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
	$("body").append('<div id="startMarker" style="z-index:1"><div>');
	startMarkerWidth = measureBoxWidth*4;
	startMarkerLeft = $("#measureBox--3").css("left").replace(/px/g, '');
	startMarkerTop = measureGridBarTop+measureGridBarHeight;
	startMarkerHeight = measureBoxHeight;
	adjustTag("startMarker", startMarkerLeft, startMarkerTop, startMarkerWidth, startMarkerHeight, "clear");
	$("#startMarker").append('<img id="startMarkerImg" src="./images/startMarker.png" style="z-index:1">');
	adjustTag("startMarkerImg", 0, 0, startMarkerWidth, startMarkerHeight, "clear");
	$("#startMarker").append('<div id="startMarkerLabel" style="z-index:2">'+startMeasure+'</div>');
    adjustTag("startMarkerLabel", 0, -startMarkerHeight*0.5, startMarkerWidth, startMarkerHeight*0.5, "clear");

	$("#startMarker").mousedown(function() {
		if (isiPad) return;
		startMarkerMouseDown = 1;
		//console.log("startMarkerMouseDown = 1");
		$("#startMarker").css("z-index", 0);
		$(".measureBox").css("z-index", 10);
	});

	$(".measureBox").mouseover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		if (startMarkerOffset == -1 && startMarkerMouseDown)
		{
			startMarkerOffset = newMeasure - startMeasure;
			if (startMarkerOffset < 0) // Hack to compensate for fact that initially startMeasure is 1
				startMarkerOffset += 4;
			console.log("startMarkerOffset= "+startMarkerOffset);
		}

		newMeasure -= startMarkerOffset;
		if (startMarkerMouseDown && newMeasure != startMeasure)
		{
			setStartMeasure(newMeasure);
		}
	});

	$("body").mouseup(function() {
		startMarkerMouseDown = 0;
		$("#startMarker").css("z-index", 1);
		$(".measureBox").css("z-index", 1);
		startMarkerOffset = -1;
	});

	/* END MARKER */
	$("body").append('<div id="endMarker" style="z-index:1"><div>');
	endMarkerWidth = measureBoxWidth*4;
	endMarkerLeft = $("#measureBox-"+endMeasure).css("left").replace(/px/g, '');
	endMarkerTop = measureGridBarTop+measureGridBarHeight;
	endMarkerHeight = measureBoxHeight;
	adjustTag("endMarker", endMarkerLeft, endMarkerTop, endMarkerWidth, endMarkerHeight, "clear");
	$("#endMarker").append('<img id="endMarkerImg" src="./images/endMarker.png" style="z-index:1">');
	adjustTag("endMarkerImg", 0, 0, endMarkerWidth, endMarkerHeight, "clear");
	$("#endMarker").append('<div id="endMarkerLabel" style="z-index:2">'+endMeasure+'</div>');
    adjustTag("endMarkerLabel", 0, -endMarkerHeight*0.5, endMarkerWidth, endMarkerHeight*0.5, "clear");

	$("#endMarker").mousedown(function() {
		if (isiPad) return;
		endMarkerMouseDown = 1;
		//console.log("endMarkerMouseDown = 1");
		$("#endMarker").css("z-index", 0);
		$(".measureBox").css("z-index", 10);
	});

	$(".measureBox").mouseover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		if (endMarkerOffset == -1 && endMarkerMouseDown)
		{
			endMarkerOffset = newMeasure - endMeasure;
			//console.log("newMeasure= "+newMeasure+" endMeasure= "+endMeasure);
		}

		newMeasure -= endMarkerOffset;
		if (endMarkerMouseDown && newMeasure != endMeasure)
		{
			setEndMeasure(newMeasure);
		}
	});

	$("body").mouseup(function() {
		endMarkerMouseDown = 0;
		$("#endMarker").css("z-index", 1);
		$(".measureBox").css("z-index", 1);
		endMarkerOffset = -1;
	});

	// Don't allow to save image
	$('#endMarker').bind('touchend', function(e){
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
					setendMeasure(number);
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
}

function setStartMarker(measure)
{
	startMarkerLeft = $("#measureBox-"+measure).css("left").replace(/px/g, '');
	$("#startMarker").css("left", startMarkerLeft);
	$("#startMarkerLabel").text(measure+4);
	//console.log("setStartMarker: "+startMarkerLeft+", "+startMarkerTop);
}

function setEndMarker(measure)
{
	endMarkerLeft = $("#measureBox-"+measure).css("left").replace(/px/g, '');
	$("#endMarker").css("left", endMarkerLeft);
	console.log("measure: "+measure+" endMarkerLeft: " + endMarkerLeft);
	$("#endMarkerLabel").text(measure-1);

}

function drawControls()
{
	/* CONTROLS BACKGROUND */
	$("body").append('<img id="controlsBackground" src="./images/controlsBackground.png"></img>');
	controlsBackgroundLeft =  measureGridHeaderLeft;
	controlsBackgroundTop = startMarkerTop+startMarkerHeight;
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

	/* DIVIDER */
	$("body").append('<img id="divider4" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundWidth * 0.38;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider4", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	/* NOTE BUTTON */
	$("body").append('<img id="notesButton" src="./images/notesDisabled.png "'+clickEvent+'="didPressNotes()"></img>');
	noteButtonLeft =  controlsBackgroundWidth * 0.33;
	noteButtonHeight = rightHandHeight * 0.97;
	noteButtonTop = leftHandTop;
	noteButtonWidth = noteButtonHeight;
	adjustTag("notesButton", noteButtonLeft, noteButtonTop, noteButtonWidth, noteButtonHeight, "clear");
	
	/* NOTE BUTTON LABEL */
	$("body").append('<div id="notesLabel">Notes Off</div>');
	noteButtonLabelLeft =  noteButtonLeft - noteButtonWidth;
	noteButtonLabelTop = leftHandLabelTop;
	noteButtonLabelWidth = noteButtonWidth * 3;
	noteButtonLabelHeight = controlsBackgroundHeight * 0.145;
	adjustTag("notesLabel", noteButtonLabelLeft, noteButtonLabelTop, noteButtonLabelWidth, noteButtonLabelHeight, "clear");

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

	/* METRONOME BUTTON */
	$("body").append('<img id="metronome" src="./images/metronomeDisabled.png "'+clickEvent+'="didPressMetronome()"></img>');
	metronomeLeft =  controlsBackgroundWidth * 0.53;
	metronomeHeight = playButtonHeight * 0.95;
	metronomeTop = leftHandTop;
	metronomeWidth = metronomeHeight;
	adjustTag("metronome", metronomeLeft, metronomeTop, metronomeWidth, metronomeHeight, "clear");
	
	/* METRONOME LABEL */
	$("body").append('<div id="metroLabel">Metro Off</div>');
	tempoLabelLeft =  metronomeLeft - metronomeWidth;
	tempoLabelTop = leftHandLabelTop;
	tempoLabelWidth = metronomeWidth * 3;
	tempoLabelHeight = leftHandLabelHeight;
	adjustTag("metroLabel", tempoLabelLeft, tempoLabelTop, tempoLabelWidth, tempoLabelHeight, "clear");

	/* POSITION LABEL */
	$("body").append('<div id="positionLabel">1.00</div>');
	positionLabelLeft =  controlsBackgroundLeft + controlsBackgroundWidth * 0.37;
	positionLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.38;
	positionLabelWidth = controlsBackgroundWidth * 0.03;
	positionLabelHeight = positionLabelWidth;
	adjustTag("positionLabel", positionLabelLeft, positionLabelTop, positionLabelWidth, positionLabelHeight, "clear");
	$('#positionLabel').css("display","none");

	/* SLOW LABEL */
	$("body").append('<div id="slowLabel">Slow</div>');
	slowLabelLeft =  metronomeLeft + leftHandWidth;
	slowLabelTop = controlsBackgroundTop + controlsBackgroundHeight * 0.65;
	slowLabelWidth = controlsBackgroundWidth * 0.05;
	slowLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("slowLabel", slowLabelLeft, slowLabelTop, slowLabelWidth, slowLabelHeight, "clear");
	$('#slowLabel').css("display","none");
	
	/* FAST LABEL */
	$("body").append('<div id="fastLabel">Fast</div>');
	fastLabelLeft =  slowLabelLeft + leftHandWidth * 3.5;
	fastLabelTop = slowLabelTop;
	fastLabelWidth = controlsBackgroundWidth * 0.05;
	fastLabelHeight = controlsBackgroundHeight * 0.2;
	adjustTag("fastLabel", fastLabelLeft, fastLabelTop, fastLabelWidth, fastLabelHeight, "clear");
	$('#fastLabel').css("display","none");

	/* DIVIDER */
	$("body").append('<img id="divider3" src="./images/divider.png"></img>');
	dividerLeft =  controlsBackgroundWidth * 0.75;
	dividerTop = controlsBackgroundTop;
	dividerWidth = 20;
	dividerHeight = controlsBackgroundHeight;
	adjustTag("divider3", dividerLeft, dividerTop, dividerWidth, dividerHeight, "clear");

	/* ZOOM BUTTON */
	$("body").append('<img id="zoom" src="./images/zoomIn.png "'+clickEvent+'="didPressZoom()"></img>');
	zoomLeft =  controlsBackgroundWidth * 0.78;
	zoomHeight = playButtonHeight * 0.99;
	zoomTop = leftHandTop*1.005;
	zoomWidth = zoomHeight;
	adjustTag("zoom", zoomLeft, zoomTop, zoomWidth, zoomHeight, "clear");
	
	/* ZOOM LABEL */
	$("body").append('<div id="zoomLabel">Zoom In</div>');
	zoomLabelLeft =  zoomLeft - zoomWidth;
	zoomLabelTop = leftHandLabelTop;
	zoomLabelWidth = zoomWidth * 3;
	zoomLabelHeight = leftHandLabelHeight;
	adjustTag("zoomLabel", zoomLabelLeft, zoomLabelTop, zoomLabelWidth, zoomLabelHeight, "clear");

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

var whiteKeyLabelHeight, blackKeyFingerLabelHeight, blackKeyNoteLabelHeight, zoom;
function drawPiano(startKey, endKey)
{
	if (startKey == 0 && endKey == 88)
		zoom = "zoomOff";
	else
		zoom = "zoomOn";

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
	whiteKeyLeft = controlsBackgroundLeft + controlsBackgroundWidth * 0.005;
	whiteKeyTop = redLineTop + redLineHeight;
	whiteKeyHeight = whiteKeyWidth * 4.3;
	
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

	/* KEYBOARD BACKGROUND */
	$("body").append('<div id="'+zoom+'keyboardBgrd" class="'+zoom+'"></div>');
	keyboardBgrdLeft =  controlsBackgroundLeft;
	keyboardBgrdTop = redLineTop + redLineHeight;
	keyboardBgrdWidth = controlsBackgroundWidth;
	keyboardBgrdHeight = whiteKeyHeight * 1.07;
	adjustTag(zoom+"keyboardBgrd", keyboardBgrdLeft, keyboardBgrdTop, keyboardBgrdWidth, keyboardBgrdHeight, "black");

	noteNames = ["A","Bb","B","C","C#","D","Eb","E","F","F#","G","Ab"];
	for (var key = startKey; key < endKey; key++)
	{
		keyIdx = key % 12;
		if (!(keyIdx==1 || keyIdx==4 || keyIdx==6 || keyIdx == 9 || keyIdx==11))
		{
			if (key!=startKey) whiteKeyLeft += whiteKeyWidth;
			/* WHITE KEY */
			$("body").append('<div id="'+zoom+'key-'+key+'" class="key '+zoom+'" style="border-style:solid; border-width:2px; z-index:2"></div>');
			adjustTag(zoom+"key-"+key, whiteKeyLeft, whiteKeyTop, whiteKeyWidth, whiteKeyHeight, "white");
			/* WHITE KEY LABEL */
			$("#"+zoom+"key-"+key).append('<b><div id="'+zoom+'keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag(zoom+"keyLabel-"+key, whiteKeyLabelLeft, whiteKeyLabelTop, whiteKeyLabelWidth, whiteKeyLabelHeight, "clear");
			$("#"+zoom+"keyLabel-"+key).css("font-family", "arial");
			/* WHITE KEY NOTE LABEL */
			$("#"+zoom+"key-"+key).append('<b><div id="'+zoom+'keyNoteLabel-'+key+'" class="keyNoteLabel" style="color:black">'+noteNames[keyIdx]+'</div></b>');			
			adjustTag(zoom+"keyNoteLabel-"+key, whiteKeyLabelLeft, whiteKeyLabelTop*0.73, whiteKeyLabelWidth, whiteKeyLabelHeight, "clear");
			$("#"+zoom+"keyNoteLabel-"+key).css("font-family", "arial");
		}
		else
		{
			/* BLACK KEY */
			blackKeyLeft =  whiteKeyLeft + Math.floor(whiteKeyWidth * 0.75);
			$("body").append('<div id="'+zoom+'key-'+key+'" class="key '+zoom+'" style="z-index:3; border-style:solid; border-width:1px"></div>');
			adjustTag(zoom+"key-"+key, blackKeyLeft, blackKeyTop, blackKeyWidth, blackKeyHeight, "black");
			/* BLACK KEY LABEL */
			$("#"+zoom+"key-"+key).append('<b><div id="'+zoom+'keyLabel-'+key+'" class="keyLabel" style="color:black"></div></b>');			
			adjustTag(zoom+"keyLabel-"+key, blackKeyLabelLeft, blackKeyLabelTop, blackKeyLabelWidth, blackKeyLabelHeight, "clear");
			$("#"+zoom+"keyLabel-"+key).css("font-family", "arial");
			/* BLACK KEY NOTE LABEL */
			$("#"+zoom+"key-"+key).append('<b><div id="'+zoom+'keyNoteLabel-'+key+'" class="keyNoteLabel" style="color:black">'+noteNames[keyIdx]+'</div></b>');
			adjustTag(zoom+"keyNoteLabel-"+key, blackKeyLabelLeft-10, blackKeyLabelTop*0.15, blackKeyLabelWidth+20, blackKeyLabelHeight*0.4, "clear");
			$("#"+zoom+"keyNoteLabel-"+key).css("font-family", "arial");
		}
	}
	$('.keyNoteLabel').css("display","none");
	$('.zoomOn').css("display","none");
}


function setEvents()
{
	$('img').on('dragstart', function(event) { event.preventDefault(); });



 	// iPad
 	document.body.addEventListener('touchmove',function(e){
	      //e.preventDefault();
	  });

 	// var tagList=[".measureBox","#playBtn","#metronome","#rightHand","#leftHand","#infoButton","#startMarker",
 	//              "#startMarker","#notesButton","#measureGridHeader","#logo","#composerPic","#tuneLabel",
 	//              "#artistLabel","#measureGridBar","#positionMarker","#startMarkerInfoLabel","#endMarkerInfoLabel",
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



	/* SET CURRENT MEASURE */
	$(".measureBox").bind(onClickEvent, function(e){
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		setCurrentMeasure(newMeasure);
		setPositionMarker();
	});		

	keyPressTimer = 0;
	/* KEY TAP */
	$(".key").bind(onClickEvent, function (e) {
		/* RELEASE PREVIOUS NOTE */
		clearTimeout(keyPressTimer);
		resetNote(notePress);
		
		/* TURN ON NOTE */
		keyPress = ($(this).attr('id')).replace(new RegExp(zoom+'key-','g'),'');
		notePress = Number(keyPress) + 21;
		console.log(notePress);
		MIDI.noteOn(0,notePress,90,0);
		MIDI.noteOff(0,notePress,0.4);
		$("#zoomOnkey-"+keyPress).css("background-color","yellow");
		$("#zoomOffkey-"+keyPress).css("background-color","yellow");

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
	//position = (Math.floor((delay/4 + 1)*100)/100).toFixed(2);
	position = (Math.floor((delay/delayPerMeasure + 1)*100)/100).toFixed(2);
	$("#positionLabel").text(delay);
	
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

function colorizeMeasures()
{
	return;
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
	for (number = endMeasure + 1; number <= (tune.length-1); number++)
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
		$('.zoomOff').css("display","");
		$('.zoomOn').css("display","none");
		zoom = "zoomOff";
		zoomEnabled = 0;
	}
	else
	{
		$("#zoom").attr("src", "./images/zoomOut.png");
		$('#zoomLabel').text("Zoom Out");
		$('.zoomOff').css("display","none");
		$('.zoomOn').css("display","");
		zoom = "zoomOn";
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