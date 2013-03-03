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

//window.onload = function () {
//
//			var delay = 0; // play one note every quarter second
//			var note = 65; // the MIDI note
//			var velocity = 127; // how hard the note hits
//			// play the note
//			MIDI.setVolume(0, 127);
//			MIDI.noteOn(0, note, velocity, delay);                        
//                        var key = note - 21;
//                        var idxKey = key%12;
//                        var octave = Math.floor(key/12);
//                        debug("Note="+note+"<br>Key="+key+"<br>idxKey="+idxKey+"<br>octave="+octave);
//                        topRecOffset = 7 + keys[idxKey][0] + 119 * octave;
//                        botRecOffset = 7 + keys[idxKey][2] + 119 * octave;
//                        var topRec='<div id="topRec" style="position: absolute; top: 211px; left: '+topRecOffset+'px; background-color:red;width:'+keys[idxKey][1]+'px;height:42px;border:0px solid #000"></div>';
//                        var botRec='<div id="botRec" style="position: absolute; top: 253px; left: '+botRecOffset+'px; background-color:red;width:'+keys[idxKey][3]+'px;height:31px;border:0px solid #000"></div>';
//                        $("img").after(topRec);
//                        $("img").after(botRec);
//
//                        var duration = 0.75
//                        setTimeout(function() {
//                            $("#topRec").remove();
//                            $("#botRec").remove();
//                            MIDI.noteOff(0, note, 0);
//                        }, duration*1000);
//
//};

function debug(param)
{
    $("div").after(param);
}

function play(param)
{
			var delay = 0; // play one note every quarter second
			var note = 65; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);                        
                        var key = note - 21;
                        var idxKey = key%12;
                        var octave = Math.floor(key/12);
                        debug("Note="+note+"<br>Key="+key+"<br>idxKey="+idxKey+"<br>octave="+octave);
                        topRecOffset = 7 + keys[idxKey][0] + 119 * octave;
                        botRecOffset = 7 + keys[idxKey][2] + 119 * octave;
                        var topRec='<div id="topRec" style="position: absolute; top: 211px; left: '+topRecOffset+'px; background-color:red;width:'+keys[idxKey][1]+'px;height:42px;border:0px solid #000"></div>';
                        var botRec='<div id="botRec" style="position: absolute; top: 253px; left: '+botRecOffset+'px; background-color:red;width:'+keys[idxKey][3]+'px;height:31px;border:0px solid #000"></div>';
                        $("img").after(topRec);
                        $("img").after(botRec);

                        var duration = 0.75
                        setTimeout(function() {
                            $("#topRec").remove();
                            $("#botRec").remove();
                            MIDI.noteOff(0, note, 0);
                        }, duration*1000);
}

$(document).ready(function() {
	/* Load the MIDI Player*/
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			// MIDI Player has loaded, so now allow user interaction
		}
	});	
	
});
