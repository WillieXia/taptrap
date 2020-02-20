$(function() {
	
	
	var $grid = $("#grid");
	
	var gridWidth = 5;
	var gridHeight = 5;
	
	//id is 0 to width*height
	function handleGrid(event, id) {
		console.log(event.target.tagName);

		if(event.target.tagName !== "DIV"){
			return;
		}

		console.log("clicked on cell", id);
		console.log(event);

		$(event.target).toggleClass("red");
		
	}

	function changeMode(event, id) {

		var t = event.target.innerHTML;

		if(t == "Cut") {
			t = "Overlap";
		}else if(t == "Overlap") {
			t = "Loop";
		}else{
			t = "Cut";
		}

		event.target.innerHTML = t;
	}

	function stopButtonWait(targetBtnID){
		for(var i = 0; i < gridHeight * gridWidth; i++){
			console.log(keyPressButtons[i].className);
			if(keyPressButtons[i].className.includes("red") && keyPressButtons[i].id !== targetBtnID){
				keyPressButtons[i].classList.remove("red");
			}
		}
	}

	function toggleKeyButton(event){
		$(event.target).toggleClass("red");
		stopButtonWait(event.target.id);
	}
	
	//TODO could change table to css grid?
	
	for (var i = 0; i < gridHeight; i++) {
		var row = $("<tr/>");
		
		for (var j = 0; j < gridWidth; j++) {
			
			var button = $("<div class='btbtn'></div>");
			var id = i*gridHeight + j;

			var md_button = $("<button class='mdbtn'>Cut</button>");

			var key_button = $("<button id='" + (i * gridWidth + j) + "' class='mdbtn keybtn'></button>");
			
			
			//we use this to make a closure, so each button has a different id value
			//without this, all buttons would report the highest/last id
			//doesn't need to be sitting inside this loop though, that's just
			//where it is for now
			function makeFunc(id) {
				return function(event) {handleGrid(event, id);};
			}
			
			button.click(makeFunc(id));

			function md_func(id){
				return function(event) {changeMode(event, id);};
			}

			md_button.click(md_func(id));

			function keybtn_func(){
				return function(event) {toggleKeyButton(event);};
			}

			key_button.click(keybtn_func());

			button.append(md_button);
			button.append(key_button);
			row.append($("<td/>").html(button));
			
		}
		
		$grid.append(row);
	}


	var keyPressButtons = document.getElementsByClassName("keybtn");
	var keyDict = {};
	
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
		if (sound == null){
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
			var sound = new Howl({
				src: data,
				// always give file extension: this is optional but helps
				format: file.name.split(".").pop().toLowerCase(),
				
				onend: function() {
					//clean out input. this doesn't retrigger the event listener
					$("#fileInput").val("");
					this.unload();
					console.log("done. unloaded");
				}
			});
			
			
			console.log('playing');
			sound.play();
		});
		
		console.log('reading');
		reader.readAsDataURL(file);
		
	});

	function handleKeyP(e){
		var b = false;

		for(var i = 0; i < gridHeight * gridWidth; i++){
			if(keyPressButtons[i].className.includes("red")){
				console.log(String.fromCharCode(e.code));
				keyPressButtons[i].innerHTML = e.key;
				keyPressButtons[i].classList.remove("red");
				keyDict[e.code] = keyPressButtons[i].parentElement;
				b = true;
			}
		}

		if(!b && e.code in keyDict){
			keyDict[e.code].click();
		}
	}

	const keyQuery = document.querySelector('html');
	keyQuery.onkeydown = handleKeyP;
	
	console.log("ready");
});