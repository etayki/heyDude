//          [top rec offset, top rec width, bottom rec offset, bottom rec width]
//          There are 85 keys. The lowest note is 21 and the highest is 108.
var keys = [
            [4,7,0,15],         // 0  - WHITE
            [11,11,0,0],        // 1  - BLACK
            [21,11,17,15],      // 2  - WHITE
            [34,10,34,15],      // 3  - WHITE
            [43,11,0,0],        // 4  - BLACK
            [54,9,51,15],      	// 5  - WHITE
            [62,11,0,0],        // 6  - BLACK
            [72,11,68,15],     	// 7  - WHITE
            [85,11,85,15],      // 8  - WHITE
            [95,10,0,0],       	// 9  - BLACK
            [105,8,102,15],     // 10 - WHITE
            [113,10,0,0]        // 11 - BLACK
           ];

$(document).ready(function() {
	/* Load the MIDI Player*/
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			// MIDI Player has loaded, so now allow user interaction
			playNote(65, 127, 1, 1)
			playNote(70, 127, 0.5, 0.5)			
		}
	});	
	
});

function debug(param)
{
    $("div").after(param);
}

function playNote(note, velocity, delay, duration)
{
	var key = note - 21;
	var idxKey = key % 12;
	var octave = Math.floor(key/12);
	//debug("Note="+note+"<br>Key="+key+"<br>idxKey="+idxKey+"<br>octave="+octave);
	topRecOffset = 7 + keys[idxKey][0] + 119 * octave;
	botRecOffset = 7 + keys[idxKey][2] + 119 * octave;
	var topRec='<div id="'+note+'topRec" style="position: absolute; top: 211px; left: '+topRecOffset+'px; background-color:red;width:'+keys[idxKey][1]+'px;height:42px;border:0px solid #000"></div>';
	var botRec='<div id="'+note+'botRec" style="position: absolute; top: 253px; left: '+botRecOffset+'px; background-color:red;width:'+keys[idxKey][3]+'px;height:31px;border:0px solid #000"></div>';
	
	// Turn note on
	setTimeout(function() {
		MIDI.setVolume(0, 127);
		MIDI.noteOn(0, note, velocity, 0);                        
		$("img").after(topRec);
		$("img").after(botRec);
	}, (delay)*1000);
	
	// Turn note off
	setTimeout(function() {
		$("#"+note+"topRec").remove();
		$("#"+note+"botRec").remove();
		MIDI.noteOff(0, note, 0);
	}, (delay+duration)*1000);
}