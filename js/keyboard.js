/* --- ================ KEY PRESS ================== */

$(document).keydown(function(e){
	
	if (e.keyCode == ESCAPE) // Esc
	{
		$("#cancelButton").click();
	}
	if (feedbackFormDisplayed)
	{
		return;
	}
	if (e.keyCode == LEFT_ARROW)
	{ 
		setCurrentMeasure("-");
	}
	else if (e.keyCode == RIGHT_ARROW)
	{ 
		setCurrentMeasure("+");
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
	else if (e.keyCode == SPACE)
	{
		$("#playBtn").click();
	}
	else if (e.keyCode == 13) // Enter
	{
		$('#startMeasure').blur();
		$('#endMeasure').blur();
	}
	else if (e.keyCode == L)
	{
		didPressLeftHand()
	}
	else if (e.keyCode == R)
	{
		didPressRightHand()
	}
	else if (e.keyCode == 66) // b
	{
		$('input[name=hand][value=both]').prop("checked",true);	
	}
	else if (e.keyCode == S)
	{
		didPressStopButton();	
	}
	else if (e.keyCode == 84) // t
	{
		repeatToggle();
	}
});

SPACE = 32;
S = 83;
L = 76;
R = 82;
RIGHT_ARROW = 39;
LEFT_ARROW = 37;
ESCAPE = 27;