/* --- ================ KEY PRESS ================== */

$(document).keydown(function(e){
	
	if (e.keyCode == 27) // Esc
	{
		$("#cancel").click();
	}
	if (feedbackFormDisplayed)
	{
		return;
	}
	if (e.keyCode == 37) // Left arrow
	{ 
		updatePosition("-");
	}
	else if (e.keyCode == 39) // Right arrow
	{ 
		updatePosition("+");
	}
	if (e.keyCode == 38) // Up arrow
	{
		updateTempo("tempo","+");
	}
	else if (e.keyCode == 40) // Down arrow
	{
		updateTempo("tempo","-");
	}
	else if (e.keyCode == 191) // ?
	{
		updateEndMeasure("+");
	}
	else if (e.keyCode == 190) // . >
	{
		updateEndMeasure("-");
	}
	else if (e.keyCode == 90) // z
	{
		updateStartMeasure("-");
	}
	else if (e.keyCode == 88) // . x
	{
		updateStartMeasure("+");
	}
	else if (e.keyCode == 32) // Space
	{
		if (didPressPlayBtn)
		{
			didPressPauseButton();
		}
		else
		{
			didPressPlayButton(STARTPLAY);		
		}
	}
	else if (e.keyCode == 13) // Enter
	{
		$('#startMeasure').blur();
		$('#endMeasure').blur();
	}
	else if (e.keyCode == 76) // l
	{
		$('input[name=hand][value=left]').prop("checked",true);
		didSelectHand('left');
	}
	else if (e.keyCode == 82) // r
	{
		$('input[name=hand][value=right]').prop("checked",true);
		didSelectHand('right');
	}
	else if (e.keyCode == 66) // b
	{
		$('input[name=hand][value=both]').prop("checked",true);	
	}
	else if (e.keyCode == 83) // s
	{
		didPressPauseButton(STOP);	
	}
	else if (e.keyCode == 84) // t
	{
		repeatToggle();
	}
});