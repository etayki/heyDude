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
	drawPiano();
	drawControls();
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
	$("body").append('<div id="measureGridHeader">');
	measureGridHeaderWidth = Math.floor(screenWidth * 0.8) - 1; // Subtract one to account for border of measureBox
	measureGridHeaderLeft = (screenWidth - measureGridHeaderWidth)/2;
	measureGridHeaderTop = 50;
	measureGridHeaderHeight = 40;
	measureGridHeaderColor = "#919191";
	tagAdjust("measureGridHeader", measureGridHeaderLeft, measureGridHeaderTop, measureGridHeaderWidth, measureGridHeaderHeight, measureGridHeaderColor);

	/* MEASURE BOX */
	measureBoxWidth = measureGridHeaderWidth * 0.05;
	measureBoxHeight = measureBoxWidth;
	measureBoxTop = measureGridHeaderTop + measureGridHeaderHeight;
	measureBoxColor = "#cbcbcb";

	for (row = 1; row <= 4; row++)
	{
		measureBoxLeft = (screenWidth - measureGridHeaderWidth)/2;
		for (col = 1; col <= 20; col++)
		{
			number = (row-1) * 20 + col;
			$("body").append('<div id="measureBox-'+number+'" style="border-style:solid; border-width:1px">');
			measureBoxHeight = measureBoxWidth;
			tagAdjust("measureBox-"+number, measureBoxLeft, measureBoxTop, measureBoxWidth, measureBoxHeight, measureBoxColor);
			measureBoxLeft += measureBoxWidth;
			
			var measureBoxLabel = '<div id="measureBoxLabel-'+number+'" style="text-align:center">'+number+'</div>';
			$("#measureBox-"+number).append(measureBoxLabel);
			measureBoxLabelWidth = measureBoxWidth * 0.4;
			measureBoxLabelLeft = (measureBoxWidth - measureBoxLabelWidth)/2;
			measureBoxLabelTop = measureBoxLabelLeft;
			measureBoxLabelHeight = measureBoxLabelWidth;
			tagAdjust("measureBoxLabel-"+number, measureBoxLabelLeft, measureBoxLabelTop, measureBoxLabelWidth, measureBoxLabelHeight, "yellow");
		}
		measureBoxTop += measureBoxHeight;
	}

	//var measureBoxLabel = '<b><div class="measureBoxLabel" id="measureBoxLabel-'+col+'" style="color:black;position:absolute;top:0px;left:0px;z-index:5;font-size:50px;font-weight:bold>1</div></b>';

	//
	//do {
	//    ourText.css('font-size', fontSize);
	//    textHeight = ourText.height();
	//    fontSize = fontSize + 2;
	//} while (textHeight < doNotTrepass );
}

function tagAdjust(tag, left, top, width, height, backgroundColor)
{
	$("#"+tag).css("position", "absolute");
	$("#"+tag).css("left", left);
	$("#"+tag).css("top", top);
	$("#"+tag).css("width", width);
	$("#"+tag).css("height", height);
	$("#"+tag).css("background-color", backgroundColor);
}

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
	
	infoTop = chairTop + 50;//350;
	infoLeft = chairLeft + 30;//150;
	infoWidth = chairWidth - 50;//800;
	var infoArea = '<b><div id="info" style="position:absolute;top:'+infoTop+'px;left:'+infoLeft+'px;width:'+infoWidth+'px;height:50px;background-color:clear;color:white;font-size:22px"></b>';
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
		repeatMask();
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