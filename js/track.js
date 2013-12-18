function drawMeasureTrack()
{
	$("body").append('<div id="track" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:51;background-color:#919191;'+
					 'border-style:solid;border-bottom-width:1px;border-right-width:0px;border-left-width:0px;border-top-width:0px"></div>');

	/* MEASURE BOX */
	measureBoxWidth = screenWidth/(tune.length+7); // 8 more boxes than measures to give room for markers
	measureBoxLeft = 0;
	measureBoxHeight = 50;
	measureBoxTop = topOffset;

	measureBoxFontSize = getFontSize(measureBoxHeight)-30;
	measureBoxDisplayTop = topOffset-15;
	/* MEASURE GRID */
	for (number = -3; number < tune.length + 4; number++)
	{			
		if (number != tune.length+3) // hack to keep bar from showing at bottom during development
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="border-style:solid;border-width:0 0 0 1;cursor:pointer;z-index:10;'+
					  		'opacity:0.3;position:absolute;left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:100%;background-color:purple"></div>');

        if (number > 0 && number < tune.length)
		{
			$("body").append('<div id="measureBoxDisplay-'+number+'" class="measureBoxDisplay" style="cursor:pointer;z-index:0;border-style:solid;'+
							 'border-width:0 0 1 1;position:absolute;'+ //change color to #919191
							 'left:'+measureBoxLeft+';top:'+topOffset+';width:'+measureBoxWidth+';height:'+screenWidth*0.04+';background-color:blue"></div>');
	    	if (number != 0 &&(number%5==0 || number==1) && number < tune.length)
	    	{
	        	$("body").append('<div class="measureBoxLabel" id="measureBoxLabel-'+number+'" style="z-index:0;position:absolute;text-align:center;background-color:green;'+
	        					 'left:'+measureBoxLeft+';top:'+topOffset+';width:'+measureBoxWidth+';height:'+measureBoxWidth+'">'+number+'</div>');
	        }
		}

		measureBoxLeft += measureBoxWidth;
	}
	//return;
	// for (number = -2; number <= 0; number++)
	// {			
	// 	$("#measureBoxDisplay-"+number).css("background-color","#919191");
	// 	$("#measureBoxDisplay-"+number).css("border-width",0);
	// }	
	// for (number = tune.length; number <= tune.length+3; number++)
	// {			
	// 	$("#measureBoxDisplay-"+number).css("background-color","#919191");
	// 	$("#measureBoxDisplay-"+number).css("border-width",0);
	// }

	// $("body").append('<div id="blackLine" style="z-index:0"></div>');
	// adjustTag("blackLine", 0, measureBoxDisplayTop+15, screenWidth, 1, "black");


	/* SET CURRENT MEASURE */
	$(".measureBoxDisplay").bind(onClickEvent, function(e){
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBoxDisplay-/g, '');
		setCurrentMeasure(newMeasure);
		setPositionMarker();
	});
	$(".measureBox").bind(onClickEvent, function(e){
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		setCurrentMeasure(newMeasure);
		setPositionMarker();
	});	
}

var	startMarkerMouseDown = endMarkerMouseDown = positionMarkerMouseDown = 0;
var startMarkerOffset = endMarkerOffset = positionMarkerOffset = -1;

function drawMarkers()
{
	/* POSITION MARKER */
	$("body").append('<div id="positionMarker" style="z-index:10;position:absolute;'+
					 'left:'+(measureBoxWidth*2.5)+';top:'+(topOffset-35)+';width:'+(measureBoxWidth*3)+';height:'+(measureBoxWidth*2.05)+'"><div>');
	//console.log("height="+$("#measureBoxDisplay-1").height());
	$("#positionMarker").append('<div id="positionMarkerLabel" style="z-index:1;position:absolute;background-color:green;text-align:center'+
								'left:'+(-measureBoxWidth/2)+';top:'+"0"+';width:'+"50"+';height:'+(measureBoxWidth*2.05)+'">'+startMeasure+'</div>');
	//adjustTag("positionMarkerLabel", -measureBoxWidth/2, 0, "50", measureBoxWidth*2.05, "green");
	// $("#positionMarker").append('<img id="positionMarkerImg" src="./images/positionMarker.png" style="z-index:2">');
	// adjustTag("positionMarkerImg", 0, barHeight, measureBoxWidth*4, measureBoxWidth*1.8, "clear");
	$("#positionMarker").append('<div id="positionMarkerLine" style="z-index:1;position:absolute;background-color:green;'+
		                        'left:'+(measureBoxWidth*1.5-1)+';top:35;width:'+Math.floor(measureBoxWidth*0.3)+';height:'+(measureBoxHeight+1)+'"></div>');
	// positionMarkerWidth = Math.floor(measureBoxWidth * 0.3);
	// positionMarkerHeight = measureBoxHeight+1;
	// adjustTag("positionMarkerLine", measureBoxWidth*1.5-1, "35", positionMarkerWidth, positionMarkerHeight, "green");

	$("#positionMarker").mousedown(function() {
		if (isiPad) return;
		positionMarkerMouseDown = 1;
		//console.log(positionMarkerMouseDown);
		$("#positionMarker").css("z-index", 0);
		$(".measureBox").css("height",measureBoxHeight+180);
	});

	$(".measureBox").mouseover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');
		//console.log("positionMarkerOffset: "+positionMarkerOffset + " positionMarkerMouseDown: " + positionMarkerMouseDown+" "+newMeasure);
		// if (positionMarkerOffset == -1 && positionMarkerMouseDown)
		// {

		// 	positionMarkerOffset = newMeasure - 1;
		// 	if (positionMarkerOffset < 0) // Hack to compensate for fact that initially positionMeasure is 1
		// 		positionMarkerOffset += -10;
		// }

		// newMeasure -= positionMarkerOffset;
		if (newMeasure < -3 || newMeasure > tune.length-1) return;
		if (positionMarkerMouseDown && newMeasure != currentMeasure && newMeasure>0)
		{
			setCurrentMeasure(newMeasure);
			setPositionMarker();
		}
	});

	$("body").mouseup(function() {
		positionMarkerMouseDown = 0;
		$("#positionMarker").css("z-index", 1);
		$(".measureBox").css("height",measureBoxHeight+82);
		positionMarkerOffset = -1;
	});

	/* START MARKER */
	startMarkerWidth = measureBoxWidth*4;
	startMarkerLeft = $("#measureBox--3").css("left").replace(/px/g, '');
	startMarkerTop = topOffset;
	startMarkerHeight = measureBoxHeight;
	$("body").append('<div id="startMarker" style="z-index:10;position:absolute;'+
					 'left:'+startMarkerLeft+';top:'+startMarkerTop+';width:'+startMarkerWidth+';height:'+measureBoxHeight+'"><div>');

	$("#startMarker").append('<img id="startMarkerImg" src="./images/startMarker.png" style="z-index:1;position:absolute;'+
							 'left:'+(startMarkerWidth*0.5)+';top:'+0+';width:'+(startMarkerWidth*0.5)+';height:'+startMarkerHeight+'">');
	$("#startMarker").append('<div id="startMarkerLabel" style="z-index:10;position:absolute;background-color:green;'+
							 'left:'+0+';top:'+(startMarkerHeight*0.2)+';width:'+(startMarkerWidth*0.5+1)+';height:'+(startMarkerHeight*0.6)+'"</div>');
   	//adjustTag("startMarkerLabel",0,startMarkerHeight*0.2,startMarkerWidth*0.5+1,startMarkerHeight*0.6, "green");

	$("#startMarker").mousedown(function() {
		if (isiPad) return;
		startMarkerMouseDown = 1;
		$("#startMarker").css("z-index", 0);
		$(".measureBox").css("height",measureBoxHeight+180);
	});

	$(".measureBox").mouseover(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBox-/g, '');

		if (startMarkerOffset == -1 && startMarkerMouseDown)
		{
			startMarkerOffset = newMeasure - startMeasure;
			if (startMarkerOffset < 0) // Hack to compensate for fact that initially startMeasure is 1
				startMarkerOffset += 4;
		}

		newMeasure -= startMarkerOffset;
		if (newMeasure < -3 || newMeasure > 65) return;
		if (startMarkerMouseDown && newMeasure != startMeasure)
		{
			setStartMeasure(newMeasure+4);
		}
	});

	$("body").mouseup(function() {
		startMarkerMouseDown = 0;
		$("#startMarker").css("z-index", 1);
		$(".measureBox").css("height",measureBoxHeight+82);
		startMarkerOffset = -1;
	});

	/* END MARKER */
	$("body").append('<div id="endMarker" style="z-index:10"><div>');
	endMarkerWidth = measureBoxWidth*4;
	endMarkerLeft = $("#measureBox-"+(endMeasure+1)).css("left").replace(/px/g, '');
	endMarkerTop = topOffset;
	endMarkerHeight = measureBoxHeight;
		adjustTag("endMarker", endMarkerLeft, endMarkerTop, endMarkerWidth, endMarkerHeight, "clear");
		$("#endMarker").append('<img id="endMarkerImg" src="./images/endMarker.png" style="z-index:1">');
		adjustTag("endMarkerImg", 0, 0, measureBoxWidth*2+1, endMarkerHeight, "clear");
		$("#endMarker").append('<div id="endMarkerLabel" style="z-index:2">'+endMeasure+'</div>');
	    adjustTag("endMarkerLabel", measureBoxWidth*2, endMarkerHeight*0.2, endMarkerWidth*0.5, endMarkerHeight*0.6, "red");
	// adjustTag("startMarkerImg", startMarkerWidth*0.5, 0, startMarkerWidth*0.5, startMarkerHeight, "clear");
	// $("#startMarker").append('<div id="startMarkerLabel" style="z-index:2">'+startMeasure+'</div>');
 //    adjustTag("startMarkerLabel",0,startMarkerHeight*0.2,startMarkerWidth*0.5+1,startMarkerHeight*0.6, "green");
	$("#endMarker").mousedown(function() {
		if (isiPad) return;
		endMarkerMouseDown = 1;
		//console.log("endMarkerMouseDown = 1");
		$("#endMarker").css("z-index", 0);
		$(".measureBox").css("z-index", 10);
		$(".measureBox").css("height",measureBoxHeight+180);
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
		if (newMeasure < 1 || newMeasure > 69) return;
		if (endMarkerMouseDown && newMeasure != endMeasure)
		{
			setEndMeasure(newMeasure);
		}
	});

	$("body").mouseup(function() {
		endMarkerMouseDown = 0;
		$("#endMarker").css("z-index", 1);
		$(".measureBox").css("z-index", 1);
		$(".measureBox").css("height",measureBoxHeight+32);
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

function setPositionMarker()
{
	/* SET POSITION LABEL */
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
	positionMarkerLeft = measureBoxLeft + (position-currentMeasure - 1) * measureBoxWidth;
	$("#positionMarker").css("left", positionMarkerLeft);
	$("#positionMarker").css("width", positionMarkerWidth);
	$("#positionMarkerLabel").text(currentMeasure);

	if (currentMeasure == endMeasure)
	{
		remainingMeasureWidth = measureBoxWidth - (position-currentMeasure) * measureBoxWidth;
		if (positionMarkerWidth > remainingMeasureWidth)
			$("#positionMarker").css("width", remainingMeasureWidth);
	}

}

function setStartMarker(measure)
{
	startMarkerLeft = $("#measureBox-"+(measure-4)).css("left").replace(/px/g, '');
	$("#startMarker").css("left", startMarkerLeft);
	$("#startMarkerLabel").text(measure);
	//console.log("setStartMarker: "+startMarkerLeft+", "+startMarkerTop);
}

function setEndMarker(measure)
{
	endMarkerLeft = $("#measureBox-"+(measure+1)).css("left").replace(/px/g, '');
	$("#endMarker").css("left", endMarkerLeft);
	//console.log("measure: "+measure+" endMarkerLeft: " + endMarkerLeft);
	$("#endMarkerLabel").text(measure);

}