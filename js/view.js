var browser;
var clickEvent;
var startTime;
var topOffset;

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
	topOffset = barTop + barHeight;
}

function drawPiano(startKey, endKey)
{
	/* RED LINE */
	redLineLeft =  controlsBackgroundLeft;
	redLineTop = topOffset;
	redLineWidth = controlsBackgroundWidth;
	redLineHeight = 5;

    $("body").append('<img id="redVelvet" src="./images/redLine.png" style="z-index:5"></img>');
    adjustTag("redVelvet", 0, redLineTop, screenWidth, "5", "clear");

	$("body").append('<div id="pianoKeyboard" style="border-style:solid; border-width:2px; z-index:2"></div>');
	adjustTag("pianoKeyboard", 0, redLineTop+redLineHeight, screenWidth, screenWidth*0.086, "black");

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
			$("#pianoKeyboard").append('<div id="key-'+key+'" class="key" style="border-style:solid;border-width:2px;z-index:2;text-align:center;'+
									   'position:absolute;left:'+whiteKeyLeft+'%;top:0px;width:'+keyWidth+'%;height:94%;background-color:white"></div>');				
			/* WHITE KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel whiteKeyLabel" style="color:black;background-color:clear'+
								  'left:0;top:77%;width:100%;height:25%;position:absolute;text-align:center;font-family:arial">5</div></b>');
			/* WHITE KEY NOTE LABEL */
			$("#key-"+key).append('<b><div id="keyNoteLabel-'+key+'" class="keyNoteLabel whiteKeyNoteLabel" style="color:black;background-color:clear">'+noteNames[keyIdx]+'</div></b>');			
			adjustTag("keyNoteLabel-"+key, 0, "58%", "100%", "23%", "clear");
			$("#keyNoteLabel-"+key).css("font-family", "arial");
		}
		else
		{
			/* BLACK KEY */
			blackKeyLeft =  whiteKeyLeft + keyWidth*0.74;
			$("#pianoKeyboard").append('<div id="key-'+key+'" class="key" style="border-style:solid; border-width:1px;z-index:3;text-align:center;'+
									   'position:absolute;left:'+blackKeyLeft+'%;top:0px;width:'+keyWidth*0.55+'%;height:52.5%;background-color:black"></div>');
			/* BLACK KEY LABEL */
			$("#key-"+key).append('<b><div id="keyLabel-'+key+'" class="keyLabel blackKeyLabel" style="color:black;background-color:clear"></div></b>');			
			adjustTag("keyLabel-"+key, 0, "50%", "100%", "35%", "clear");
			$("#keyLabel-"+key).css("font-family", "arial");
			/* BLACK KEY NOTE LABEL */
			$("#key-"+key).append('<b><div id="keyNoteLabel-'+key+'" class="keyNoteLabel blackKeyNoteLabel" style="color:black;background-color:clear">'+noteNames[keyIdx]+'</div></b>');
			adjustTag("keyNoteLabel-"+key, 0, "15%", "100%", "18%", "clear");
			$("#keyNoteLabel-"+key).css("font-family", "arial");
		}
	}

 	$(".whiteKeyLabel").css("font-size", getFontSize($("#keyLabel-"+0).height())+"px");
 	$(".whiteKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+0).height())+"px");
 	$(".blackKeyLabel").css("font-size", getFontSize($("#keyLabel-"+1).height())+"px");
 	$(".blackKeyNoteLabel").css("font-size", getFontSize($("#keyNoteLabel-"+1).height())+"px");
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
	$("body").append('<div id="textLabel"><span id="textSpan">TextTest</span></div>');
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