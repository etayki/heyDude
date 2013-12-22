var markerOffset = activeMarker = null;

function drawMeasureTrack()
{
	$("body").append('<div id="trackHeader" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth*0.0255+';background-color:#919191"></div>');
	topOffset += screenWidth*0.0255;
	$("body").append('<div id="track" style="position:absolute;left:0%;top:'+topOffset+';width:'+screenWidth+';height:'+screenWidth*0.04+';background-color:#919191;'+
	 				 'border-style:solid;border-width:1 0 1 0"></div>');

	/* MEASURE BOX */
	measureBoxWidth = screenWidth/(tune.length+7); // 8 more boxes than measures to give room for markers
	measureBoxLeft = measureBoxWidth*4;
	measureBoxTop = topOffset;

	/* MEASURE TRACK */
	for (number = 1; number < tune.length; number++)
	{			
		$("#track").append('<div id="measureBox-'+number+'" class="measureBox" style="cursor:pointer;z-index:0;border-style:solid;'+
						 'border-width:0 0 1 1;position:absolute;background-color:#FFFF99;'+
						 'left:'+measureBoxLeft+';top:0%;width:'+measureBoxWidth+';height:'+screenWidth*0.04+'"></div>');
    	if (number != 0 &&(number%5==0 || number==1) && number < tune.length)
    	{
        	$("#measureBox-"+number).append('<b><div class="msrBoxLabel" id="msrBoxLabel-'+number+'" style="z-index:0;text-align:center;'+
        					   'position:absolute;left:0;top:35%;width:100%;height:35%;background-color:clear">'+number+'</div></b>');
        }
		measureBoxLeft += measureBoxWidth;
	}

	$(".msrBoxLabel").css("font-size",getFontSize($("#msrBoxLabel-1").height()));
	/* SET CURRENT MEASURE */
	$(".measureBox").bind(onClickEvent, function(e){
		selectedMeasure = Math.floor(Number(eval(positionX))/measureBoxWidth)-3;
		if (selectedMeasure > 0 && selectedMeasure < tune.length)
		{
			setCurrentMeasure(selectedMeasure);
			setCurrentMarker();
		}
	});
}

function drawMarkers()
{
	/* CURRENT MARKER */
	$("#trackHeader").append('<div id="currentMarker" class="marker" style="z-index:10;background-color:clear;position:absolute;'+
					 'left:'+(measureBoxWidth*2.5)+';top:0%;width:'+(measureBoxWidth*3)+';height:100%"><div>');
	$("#currentMarker").append('<div id="currentMarkerLabel" style="z-index:1;position:absolute;background-color:green;text-align:center;'+
								'left:0%;top:0%;width:100%;height:100%">'+startMeasure+'</div>');
	$("#currentMarker").append('<div id="currentMarkerLine" style="z-index:1;position:absolute;background-color:green;'+
		                        'left:'+(measureBoxWidth*1.5-1)+';top:105%;width:'+Math.floor(measureBoxWidth*0.3)+';height:'+$("#track").height()+'"></div>');

	$("#currentMarkerLabel").css("font-size",getFontSize($("#currentMarkerLabel").height()));

	/* START MARKER */
	$("#track").append('<div id="startMarker" class="marker" style="z-index:10;position:absolute;'+
					   'left:0%;top:0%;width:'+measureBoxWidth*4+';height:100%"><div>');
	$("#startMarker").append('<img id="startMarkerImg" src="./images/startMarker.png" style="z-index:1;position:absolute;'+
							 'left:'+(measureBoxWidth*2)+';top:0%;width:'+(measureBoxWidth*2)+';height:100%">');
	$("#startMarker").append('<div id="startMarkerLabel" style="z-index:10;position:absolute;background-color:green;'+
							 'left:0%;top:20%;width:'+(measureBoxWidth*2)+';height:60%;text-align:center;line-height:120%;">1</div>');
	$("#startMarkerLabel").css("font-size",getFontSize($("#startMarkerLabel").height()));

	/* END MARKER */
	$("#track").append('<div id="endMarker" class="marker" style="z-index:10;position:absolute;'+
					   'right:0%;top:0%;width:'+measureBoxWidth*4+';height:100%"><div>');
	$("#endMarker").append('<img id="endMarkerImg" src="./images/endMarker.png" style="z-index:1;position:absolute;'+
							 'right:'+(measureBoxWidth*2-1)+';top:0%;width:'+(measureBoxWidth*2)+';height:100%">');
	$("#endMarker").append('<div id="endMarkerLabel" style="z-index:10;position:absolute;background-color:red;'+
							 'right:0%;top:20%;width:'+(measureBoxWidth*2)+';height:60%;text-align:center;line-height:120%;">1</div>');
	$("#endMarkerLabel").css("font-size",getFontSize($("#endMarkerLabel").height()));
}

function setMarkerEvents()
{
	$('.marker').bind(startEvent, function(e){
		e.preventDefault();
		activeMarker = $(this).attr('id');
		newMeasure = Math.floor(Number(eval(positionX))/measureBoxWidth)-3;
		markerOffset = eval(activeMarker.replace(/Marker/g, 'Measure')) - newMeasure;
	});

	addEvent(document, 'mouseout', function(evt) {
	  if (evt.toElement == null && evt.relatedTarget == null) {
	  	activeMarker = null;
	  }
	});

	$('body').bind("mouseup", function(e){
		activeMarker = null;
	});

	$(markerElement).bind(moveEvent, function(e){
		e.preventDefault();
		if (!activeMarker) return;
		newMeasure = Math.floor(eval(positionX)/measureBoxWidth)-3+markerOffset;
		if (newMeasure > 0 && newMeasure < tune.length)
		{
			if (activeMarker == "endMarker" && newMeasure != endMeasure) setEndMeasure(newMeasure);
			if (activeMarker == "startMarker" && newMeasure != startMeasure) setStartMeasure(newMeasure);
			if (activeMarker == "currentMarker" && newMeasure != currentMeasure){
				setCurrentMeasure(newMeasure);
				setCurrentMarker();
			}
		}
	});
}

function addEvent(obj, evt, fn) {
    obj.addEventListener(evt, fn, false);
}

function setCurrentMarker()
{
	/* SET POSITION LABEL */
	position = (Math.floor((delay/delayPerMeasure + 1)*100)/100).toFixed(2);
	$("#positionLabel").text(delay);
	
	/* SET POSITION MARKER */
	nowMeasure = Number(Math.floor(position));
	if (nowMeasure != currentMeasure)
	{
		currentMeasure = nowMeasure;
		colorizeMeasures();
	}

	currentMarkerLeft = measureBoxWidth*(Number(currentMeasure)+1.5);
	$("#currentMarker").css("left", currentMarkerLeft);
	$("#currentMarker").css("width", measureBoxWidth*3);
	$("#currentMarkerLabel").text(currentMeasure);

	// if (currentMeasure == endMeasure)
	// {
	// 	remainingMeasureWidth = measureBoxWidth - (position-currentMeasure) * measureBoxWidth;
	// 	if (currentMarkerWidth > remainingMeasureWidth)
	// 		$("#currentMarker").css("width", remainingMeasureWidth);
	// }
}

function setStartMarker(measure)
{
	startMarkerLeft = measureBoxWidth*(measure-1);
	$("#startMarker").css("left", startMarkerLeft);
	$("#startMarkerLabel").text(measure);
	//console.log("setStartMarker: "+startMarkerLeft+", "+startMarkerTop);
}

function setEndMarker(measure)
{
	endMarkerLeft = measureBoxWidth*(measure+4);
	$("#endMarker").css("left", endMarkerLeft);
	//console.log("measure: "+measure+" endMarkerLeft: " + endMarkerLeft);
	$("#endMarkerLabel").text(measure);

}