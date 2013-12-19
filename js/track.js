var	startMarkerMouseDown = endMarkerMouseDown = positionMarkerMouseDown = 0;
var startMarkerOffset = endMarkerOffset = positionMarkerOffset = -1;

function drawMeasureTrack()
{ // 0 0 1 0
	$("body").append('<div id="trackHeader" style="position:absolute;left:0%;top:'+topOffset+';width:100%;height:'+screenWidth*0.0255+';background-color:#919191"></div>');
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
		if (number != tune.length+3) // hack to keep bar from showing at bottom during development
		$("body").append('<div id="measureBox-'+number+'" class="measureBox" style="display:none;border-style:solid;border-width:0 0 0 1;cursor:pointer;z-index:11;'+
					  	  'opacity:0.3;position:absolute;left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:100%;background-color:purple"></div>');

        if (number > 0 && number < tune.length)
		{
			$("#track").append('<div id="measureBoxDisplay-'+number+'" class="measureBoxDisplay" style="cursor:pointer;z-index:0;border-style:solid;'+
							 'border-width:0 0 1 1;position:absolute;'+ //change color to #919191
							 'left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:'+screenWidth*0.04+';background-color:blue"></div>');
	    	if (number != 0 &&(number%5==0 || number==1) && number < tune.length)
	    	{
	        	$("#measureBoxDisplay-"+number).append('<b><div class="msrBoxLabel" id="msrBoxLabel-'+number+'" style="z-index:0;text-align:center;'+
	        					   'position:absolute;left:0;top:35%;width:100%;height:35%;background-color:clear">'+number+'</div></b>');
	        }
		}

		measureBoxLeft += measureBoxWidth;
	}

	$(".msrBoxLabel").css("font-size",getFontSize($("#msrBoxLabel-1").height()));
	//console.log("height="+$("#msrBoxLabel-1").height()+" fontSize="+getFontSize($("#msrBoxLabel-1").height()));
	/* SET CURRENT MEASURE */
	$(".msrBoxDisplay").bind(onClickEvent, function(e){
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

	$("#positionMarker").mousedown(function() {
		if (isiPad) return;
		positionMarkerMouseDown = 1;
		console.log(positionMarkerMouseDown);
		$(".measureBox").css("display", "");
		//$("#positionMarker").css("z-index", 0);
	});

	$(".measureBoxDisplay").mousedown(function() {
		measureBoxId = $(this).attr('id');
		newMeasure = measureBoxId.replace(/measureBoxDisplay-/g, '');
		console.log("newMeasure: "+newMeasure);
		if (newMeasure != currentMeasure)
		{
			setCurrentMeasure(newMeasure);
			setPositionMarker();
		}
		//$("#positionMarker").css("z-index", 0);
	});

	// $(".measureBoxDisplay").mouseover(function() {
	// 	measureBoxId = $(this).attr('id');
	// 	newMeasure = measureBoxId.replace(/measureBoxDisplay-/g, '');
	// 	console.log("measureBoxDisplay: 	");
	// 	// if (positionMarkerOffset == -1 && positionMarkerMouseDown)
	// 	// {

	// 	// 	positionMarkerOffset = newMeasure - 1;
	// 	// 	if (positionMarkerOffset < 0) // Hack to compensate for fact that initially positionMeasure is 1
	// 	// 		positionMarkerOffset += -10;
	// 	// }

	// 	// newMeasure -= positionMarkerOffset;
	// 	if (newMeasure < -3 || newMeasure > tune.length-1) return;
	// 	if (positionMarkerMouseDown && newMeasure != currentMeasure && newMeasure>0)
	// 	{
	// 		setCurrentMeasure(newMeasure);
	// 		setPositionMarker();
	// 	}
	// });

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
		//$("#positionMarker").css("z-index", 10);
		$(".measureBox").css("display", "none");
		positionMarkerOffset = -1;
	});
	return;

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
	endMarkerWidth = measureBoxWidth*4;
	endMarkerLeft = $("#measureBox-"+(endMeasure+1)).css("left").replace(/px/g, '');
	endMarkerTop = topOffset;
	endMarkerHeight = measureBoxHeight;
	$("body").append('<div id="endMarker" style="z-index:10;position:absolute;'+
					 'left:'+endMarkerLeft+';top:'+topOffset+';width:'+endMarkerWidth+';height:'+measureBoxHeight+'"</div>');
	$("#endMarker").append('<img id="endMarkerImg" src="./images/endMarker.png" style="z-index:1;position:absolute;'+
						   'left:0;top:0;width:'+(measureBoxWidth*2+1)+';height:'+endMarkerHeight+'">');
	$("#endMarker").append('<div id="endMarkerLabel" style="z-index:2;position:absolute;background-color:red;'+
						   'left:'+(measureBoxWidth*2)+';top:'+(endMarkerHeight*0.2)+';width:'+(endMarkerWidth*0.5)+';height:'+(endMarkerHeight*0.6)+'">'+endMeasure+'</div>');

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
	positionMarkerLeft = measureBoxLeft + (position-currentMeasure - 1.5) * measureBoxWidth;
	$("#positionMarker").css("left", positionMarkerLeft);
	$("#positionMarker").css("width", measureBoxWidth*3);
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