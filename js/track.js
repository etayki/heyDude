var	startMarkerMouseDown = endMarkerMouseDown = positionMarkerMouseDown = 0;
var startMarkerOffset = endMarkerOffset = positionMarkerOffset = null;

function drawMeasureTrack()
{ // 0 0 1 0
	$("body").append('<div id="trackHeader" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth*0.0255+';background-color:#919191"></div>');
	topOffset += screenWidth*0.0255;
	$("body").append('<div id="track" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth*0.04+';background-color:#919191;'+
	 				 'border-style:solid;border-width:1 0 1 0"></div>');

	/* MEASURE BOX */
	measureBoxWidth = screenWidth/(tune.length+7); // 8 more boxes than measures to give room for markers
	measureBoxLeft = 0;
	measureBoxTop = topOffset;

	/* MEASURE TRACK */
	for (number = -3; number < tune.length + 4; number++)
	{			
		//if (number != tune.length+3) // hack to keep bar from showing at bottom during development
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="display:none;border-style:solid;border-width:0 0 0 0;cursor:pointer;z-index:11;'+
					  	  'opacity:0;position:absolute;left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:100%;background-color:purple"></div>');

        if (number > 0 && number < tune.length)
		{
			$("#track").append('<div id="measureBoxDisplay-'+number+'" class="measureBoxDisplay" style="cursor:pointer;z-index:0;border-style:solid;'+
							 'border-width:0 0 1 1;position:absolute;background-color:#FFFF99;'+
							 'left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:'+screenWidth*0.04+'"></div>');
	    	if (number != 0 &&(number%5==0 || number==1) && number < tune.length)
	    	{
	        	$("#measureBoxDisplay-"+number).append('<b><div class="msrBoxLabel" id="msrBoxLabel-'+number+'" style="z-index:0;text-align:center;'+
	        					   'position:absolute;left:0;top:35%;width:100%;height:35%;background-color:clear">'+number+'</div></b>');
	        }
		}

		measureBoxLeft += measureBoxWidth;
	}

	$(".msrBoxLabel").css("font-size",getFontSize($("#msrBoxLabel-1").height()));
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

function drawMarkers()
{
	/* POSITION MARKER */
	$("#trackHeader").append('<div id="positionMarker" style="z-index:10;background-color:clear;position:absolute;'+
					 'left:'+(measureBoxWidth*2.5)+';top:0%;width:'+(measureBoxWidth*3)+';height:100%"><div>');
	$("#positionMarker").append('<div id="positionMarkerLabel" style="z-index:1;position:absolute;background-color:green;text-align:center;'+
								'left:0%;top:0%;width:100%;height:100%">'+startMeasure+'</div>');
	$("#positionMarker").append('<div id="positionMarkerLine" style="z-index:1;position:absolute;background-color:green;'+
		                        'left:'+(measureBoxWidth*1.5-1)+';top:105%;width:'+Math.floor(measureBoxWidth*0.3)+';height:'+$("#track").height()+'"></div>');

	$("#positionMarkerLabel").css("font-size",getFontSize($("#positionMarkerLabel").height()));

	// $("#positionMarker").mousedown(function() {
	// 	if (isiPad) return;
	// 	positionMarkerMouseDown = 1;
	// 	$(".measureBox").css("display", "");
	// });

	// $("body").mouseup(function() {
	// 	positionMarkerMouseDown = 0;
	// 	$(".measureBox").css("display", "none");
	// });

	// $(".measureBox").mouseover(function() {
	// 	if (!positionMarkerMouseDown) return;
	// 	measureBoxId = $(this).attr('id');
	// 	newMeasure = measureBoxId.replace(/measureBox-/g, '');
	// 	if (newMeasure < 1 || newMeasure > tune.length-1) return;
	// 	setCurrentMeasure(newMeasure);
	// 	setPositionMarker();
	// });


	/* START MARKER */
	$("#track").append('<div id="startMarker" style="z-index:10;position:absolute;'+
					   'left:0%;top:0%;width:'+measureBoxWidth*4+';height:100%"><div>');
	$("#startMarker").append('<img id="startMarkerImg" src="./images/startMarker.png" style="z-index:1;position:absolute;'+
							 'left:'+(measureBoxWidth*2)+';top:0%;width:'+(measureBoxWidth*2)+';height:100%">');
	$("#startMarker").append('<div id="startMarkerLabel" style="z-index:10;position:absolute;background-color:green;'+
							 'left:0%;top:20%;width:'+(measureBoxWidth*2)+';height:60%;text-align:center;line-height:120%;">1</div>');
	$("#startMarkerLabel").css("font-size",getFontSize($("#startMarkerLabel").height()));

	// $("#startMarker").mousedown(function() {
	// 	if (isiPad) return;
	// 	startMarkerMouseDown = 1;
	// 	$(".measureBox").css("display", "");
	// });

	// $("body").mouseup(function() {
	// 	startMarkerMouseDown = 0;
	// 	startMarkerOffset = null;
	// });

	// $(".measureBox").mouseover(function() {
	// 	if (!startMarkerMouseDown) return;
	// 	measureBoxId = $(this).attr('id');
	// 	newMeasure = Number(measureBoxId.replace(/measureBox-/g, ''));

	// 	if (!startMarkerOffset && startMarkerMouseDown)
	// 		startMarkerOffset = startMeasure - newMeasure;

	// 	newMeasure += startMarkerOffset;
	// 	if (startMarkerMouseDown && newMeasure != startMeasure && newMeasure>0 && newMeasure < tune.length)
	// 	{
	// 		setStartMeasure(newMeasure);
	// 	}
	// });

	/* END MARKER */
	$("#track").append('<div id="endMarker" style="z-index:10;position:absolute;'+
					   'right:0%;top:0%;width:'+measureBoxWidth*4+';height:100%"><div>');
	$("#endMarker").append('<img id="endMarkerImg" src="./images/endMarker.png" style="z-index:1;position:absolute;'+
							 'right:'+(measureBoxWidth*2-1)+';top:0%;width:'+(measureBoxWidth*2)+';height:100%">');
	$("#endMarker").append('<div id="endMarkerLabel" style="z-index:10;position:absolute;background-color:red;'+
							 'right:0%;top:20%;width:'+(measureBoxWidth*2)+';height:60%;text-align:center;line-height:120%;">1</div>');
	$("#endMarkerLabel").css("font-size",getFontSize($("#endMarkerLabel").height()));

	// $("#endMarker").mousedown(function() {
	// 	if (isiPad) return;
	// 	endMarkerMouseDown = 1;
	// 	$(".measureBox").css("display", "");
	// });

	// $("body").mouseup(function() {
	// 	endMarkerMouseDown = 0;
	// 	endMarkerOffset = null;
	// });

	// $(".measureBox").mouseover(function() {
	// 	if (!endMarkerMouseDown) return;
	// 	measureBoxId = $(this).attr('id');
	// 	newMeasure = Number(measureBoxId.replace(/measureBox-/g, ''));

	// 	if (!endMarkerOffset && endMarkerMouseDown)
	// 		endMarkerOffset = endMeasure - newMeasure;

	// 	newMeasure += endMarkerOffset;
	// 	if (endMarkerMouseDown && newMeasure != endMeasure && newMeasure>0 && newMeasure < tune.length)
	// 	{
	// 		setEndMeasure(newMeasure);
	// 	}
	// });

	// Don't allow to save image
	$('#startMarker').bind('touchstart', function(e){
		e.preventDefault();
		newMeasure = Math.floor(event.touches[0].pageX/measureBoxWidth)-3;
		startMarkerOffset = startMeasure - newMeasure;
		console.log("x= "+event.touches[0].pageX+" y= "+event.touches[0].pageY+" newMasure="+newMeasure+" currentMeasure="+currentMeasure+" startMarkerOffset="+startMarkerOffset);

	});

	$('#startMarker').bind('touchmove', function(e){
		e.preventDefault();
		newMeasure = Math.floor(event.touches[0].pageX/measureBoxWidth)-3+startMarkerOffset;
		console.log("x= "+event.touches[0].pageX+" y= "+event.touches[0].pageY+" measure="+newMeasure+ " startMarkerOffset="+startMarkerOffset);
		if (newMeasure != startMeasure && newMeasure > 0 && newMeasure < tune.length)
			setStartMeasure(newMeasure);//+startMarkerOffset);
	});

	// $('#endMarker').bind('touchend', function(e){
	// 	e.preventDefault();
	// });

	// $('#endMarker').bind('touchmove', function(e){
	// 	e.preventDefault();
	// 	for (number = 1; number <= maxBoxes; number++)
	// 	{
	// 		measureBoxLeft = Number($("#measureBox-"+number).css('left').replace(/px/g, ''));
	// 		measureBoxTop = Number($("#measureBox-"+number).css('top').replace(/px/g, ''));
	// 		measureBoxWidth = Number($("#measureBox-"+number).css('width').replace(/px/g, ''));
	// 		//debug (number + " " + event.touches[0].pageY + ">" + (measureBoxTop + measureBoxWidth));
	// 		if (event.touches[0].pageX > measureBoxLeft &&
	// 			event.touches[0].pageX < (measureBoxLeft + measureBoxWidth) &&
	// 			event.touches[0].pageY > measureBoxTop && 
	// 			event.touches[0].pageY < (measureBoxTop + measureBoxWidth))
	// 		{
	// 			if (number != endMeasure)
	// 			{				
	// 				//debug(number);
	// 				setEndMeasure(number);
	// 			}
	// 		}
	// 	}
	// });
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
	positionMarkerLeft = measureBoxLeft + (position-currentMeasure - 1.5) * measureBoxWidth;
	$("#positionMarker").css("left", positionMarkerLeft);
	$("#positionMarker").css("width", measureBoxWidth*3);
	$("#positionMarkerLabel").text(currentMeasure);

	// if (currentMeasure == endMeasure)
	// {
	// 	remainingMeasureWidth = measureBoxWidth - (position-currentMeasure) * measureBoxWidth;
	// 	if (positionMarkerWidth > remainingMeasureWidth)
	// 		$("#positionMarker").css("width", remainingMeasureWidth);
	// }

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