const modes = {
	CUT: "Cut",
	OVERLAP: "Overlap",
	LOOP: "Loop"
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
		this.audio = null;
		
		//TODO does this need to hold more things?
	}
	
	setMode(mode) {
		this.mode = mode;
		this.modeButton.text(mode);
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
	
	//will be called when the cell is clicked on
	//"performs" its action
	run() {
		//TODO should be fleshed out later
		//this is just a basic example
		
		console.log("clicked on cell", this.id);

		this.cellButton.toggleClass("red");
		
		if (this.audio !== null) {
			this.audio.play();
		}
	}
}
