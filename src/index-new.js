$(function() {
	
	
	
	
	var $grid = $("#grid");
	
	var gridWidth = 5;
	var gridHeight = 5;
	
	//id is 0 to width*height
	function handleGrid(event, id) {
		console.log("clicked on cell", id);
		console.log(event);
		
		$(event.target).toggleClass("red");
		
	}
	
	
	//TODO could change table to css grid?
	
	for (var i = 0; i < gridHeight; i++) {
		var row = $("<tr/>");
		
		for (var j = 0; j < gridWidth; j++) {
			
			var cell = $("<td/>");
			
			var button = $("<button></button>");
			var id = i*gridHeight + j;
			
			
			function makeFunc(id) {
				
				return function(event) {handleGrid(event, id);};
			}
			
			
			//function(id) {return function(event) {handleGrid(event, id);}}(id);
			
			//(id => event => {handleGrid(event, id);})(id);
			
			
			button.click(makeFunc(id));
			
			
			//button.click(function() {handleGrid(id)});
			
			cell.html(button);
			
			row.append(cell);
			
			
			
		}
		
		$grid.append(row);
	}
	
	
	var $micIcon = $("#micIcon");
	var $playIcon = $("#playIcon");
	
	var recording = false;
	var playing = false;
	
	var sound = null;
	
	// var sound = new Howl({
		// src: ['sound.mp3'],
		// loop: true
	// });
	
	function handleRecord(event) {
		if (recording) {
			document.getElementById("micicon").style.color = "#000000";
		} else {
			document.getElementById("micicon").style.color = "#ff0000";
		}

		recording = !recording;
	}

	function handlePlay(event) {
		if (sound == null){
			//put here for now, as chrome complains about trying to use webaudio
			//without user input
			sound = new Howl({
				src: ['sound.mp3'],
				loop: true
			});
		}
		
		if (playing) {
			document.getElementById("playicon").style.color = "#000000";
			sound.pause();
		} else {
			document.getElementById("playicon").style.color = "#00ff00";
			sound.play();
		}

		playing = !playing;
	}
	
	
	$("#record-btn").click(handleRecord);
	$("#play-btn").click(handlePlay);
	
	
	console.log("ready");
});