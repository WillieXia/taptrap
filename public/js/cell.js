//each mode is an object that holds
//the mode name as text and a function
//the function says what to do with the sound when you click the cell

//TODO might make more sense for the play function to take a reference to the Cell
//then it could e.g. change how the color toggles with different modes
const modes = {
	CUT: {
		text: "Cut",
		play: function(sound) {
			
			//cut stops the current sound before restarting it
			if (sound.playing()) {
				sound.stop();
			}
			sound.play();
		}
	},
	
	OVERLAP: {
		text: "Overlap",
		play: function(sound) {
			
			//overlap plays the sound on top of the old version
			//this is what happens by default with Howler
			sound.play();
		}
	},
	
	LOOP: {
		text: "Loop",
		play: function(sound) {
			
			//loop pauses or resumes the sound loop
			if (sound.playing()) {
				sound.pause();
			} else {
				sound.play();
			}
			
		}
	}
};

function nextMode(mode) {
		
	switch (mode) {
		case modes.CUT:
			return modes.OVERLAP;
			
		case modes.OVERLAP:
			return modes.LOOP;
			
		case modes.LOOP:
			return modes.CUT;
	}
}

export default class Cell {

	//id is the the cell id
	//the three buttons are "pointers" to jquery objects in the dom
	constructor(id, cellButton, modeButton, keyButton) {
		this.id = id;
		
		this.cellButton = cellButton;
		this.modeButton = modeButton;
		this.keyButton = keyButton;
		
		this.mode = modes.CUT;
		
		this.hotkey = null;
		
		//TODO
		this.sound = null;
		
		//TODO does this need to hold more things?
	}
	
	setMode(mode) {
		this.mode = mode;
		this.modeButton.text(mode.text);
		
		//we need to make sure loop is on if we're in loop mode
		if (this.sound !== null) {
			this.sound.loop(this.mode === modes.LOOP);
		}
	}
	
	//changes to the next mode
	cycleMode() {
		this.setMode(nextMode(this.mode));
	}
	
	hasHotkey() {
		return this.hotkey !== null;
	}
	
	setHotkey(key) {
		this.hotkey = key;
		this.keyButton.text(key);
	}
	
	clearHotkey() {
		this.hotkey = null;
		this.keyButton.html("&nbsp;");
	}
	
	//TODO this will probably do more stuff later
	assign(sound) {
		this.sound = sound;
	}
	
	//will be called when the cell is clicked on
	//"performs" its action
	run() {
		//TODO should be fleshed out later
		//this is just a basic example
		
		console.log("clicked on cell", this.id);

		this.cellButton.toggleClass("red");
		
		if (this.sound !== null) {
			this.mode.play(this.sound);
		}
	}
}
