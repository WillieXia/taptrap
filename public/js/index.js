import Cell from "./cell.js";

//called on page load
$(function() {
	
	
	//map from cell id to cell object
	//TODO this and other state stuff should probably go in an object
	var cells = []
	
	//the id of which cell is waiting for a key
	var waitingOnKey = null;
	
	// var c = new Cell(500, 123);
	// c.test();
	// c.switchMode();
	
	var $grid = $("#grid");
	
	var gridWidth = 5;
	var gridHeight = 5;
	
	//id is 0 to width*height-1
	function handleGrid(event, id) {
		
		var target = $(event.target);

		if(!target.hasClass("btbtn")){
			return;
		}

		console.log("clicked on cell", id);
		console.log(event);

		target.toggleClass("red");
		
		if (id == 0) {
			cells[id].audio.play();
		}
		
	}

	function changeMode(event, id) {
		
		var target = $(event.target);
		var cell = cells[id];
		
		//switches to the next mode, and returns the mode
		var mode = cell.nextMode();
		
		//TODO this manipulation could be done by the Cell object itself
		target.text(mode);
	}

	//TODO later
	/*
	function waitKey(event, id, t){
		t.innerHTML = String.fromCharCode(event.keycode);
		t.removeEventListener("onkeypress", waitKey);
	}

	function changeKey(event, id) {
		
		
		
		if (target.hasClass("red")) {
			return; //already clicked
		}
		
		console.log("changekey:", event, id);
		
		var target = $(event.target);
		
		target.addClass("red");
		
		if (target.hasClass("red")) {
			var t = event.target;
			t.addEventListener("onkeypress", function(event) {
				
			});
		}

		
	}
	*/
	
	
	
	
	//we use this to make a closure, so each cell has a different id value
	//without this, all cells would report the same (highest/last) id
	function eventWithId(func, id) {
		return function(event) {func(event, id);};
	}
			
	
	
	
	//TODO could change table to css grid?
	
	
	//create the grid
	for (var i = 0; i < gridHeight; i++) {
		var row = $("<tr/>");
		
		for (var j = 0; j < gridWidth; j++) {
			
			var id = i*gridHeight + j;
			
			var cell = $("<div class='btbtn'></div>");
			cell.click(eventWithId(handleGrid, id));
			
			//append to array
			//this makes the new Cell object have a jquery "pointer" to the element in the dom
			cells.push(new Cell(id, cell));
			

			var md_button = $("<button class='mdbtn'>Cut</button>");
			md_button.click(eventWithId(changeMode, id));
			
			var key_button = $("<button class='mdbtn keybtn'>&nbsp;</button>");
			//key_button.click(eventWithId(changeKey, id));
			

			cell.append(md_button, key_button);
			row.append($("<td/>").html(cell));
			
		}
		
		$grid.append(row);
	}
	
	//for testing, TODO remove
	//window.cells = cells;
	
	
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
		
		$micIcon.css("color", recording ? "black" : "red");
		recording = !recording;
	}

	function handlePlay(event) {
		if (sound == null) {
			//put here for now, as chrome complains about trying to use webaudio
			//without user input
			sound = new Howl({
				src: ['sound.mp3'],
				loop: true
			});
		}
		
		
		if (playing) {
			sound.pause();
		} else {
			sound.play();
		}
		
		$playIcon.css("color", playing ? "black" : "lime");
		
		playing = !playing;
	}
	
	
	$("#record-btn").click(handleRecord);
	$("#play-btn").click(handlePlay);
	
	
	$("#fileInput").on("change", function(event) {
		
		console.log("file event fired")
		
		if (event.target.files.length == 0) {
			return;
		}
		
		// Read the file from the input
		var file = event.target.files[0];
		var reader = new FileReader();
		
		console.log("reader");
		
		reader.addEventListener("load", function() {
			console.log("in event listener");
			var data = reader.result;
			
			//console.log("data")
			//console.log(data)
			
			// Create a Howler sound
			// var sound = new Howl({
				// src: data,
				// // always give file extension: this is optional but helps
				// format: file.name.split(".").pop().toLowerCase(),
				
				// onend: function() {
					// //clean out input. this doesn't retrigger the event listener
					// $("#fileInput").val("");
					// this.unload();
					// console.log("done. unloaded");
				// }
			// });
			
			var sound = new Howl({
				src: data,
				// always give file extension: this is optional but helps
				format: file.name.split(".").pop().toLowerCase()
			});
			
			cells[0].audio = sound;
			
			// console.log('playing');
			// sound.play();
		});
		
		console.log('reading');
		reader.readAsDataURL(file);
		
	});
	
	
	console.log("ready");
});