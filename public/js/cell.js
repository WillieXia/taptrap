const modes = {
	CUT: "Cut",
	OVERLAP: "Overlap",
	LOOP: "Loop"
};

export default class Cell {

	constructor(id, obj) {
		this.id = id;
		this.obj = obj;
		
		this.mode = modes.CUT;
		
		this.key = null;
		this.audio = null;
		
		//TODO does this need to hold more things?
	}
	
	
	test() {
		//"this" is required to access id
		console.log("this is a cell with id", this.id);
	}
	
	nextMode() {
		switch (this.mode) {
			case modes.CUT:
				this.mode = modes.OVERLAP;
				break;
				
			case modes.OVERLAP:
				this.mode = modes.LOOP;
				break;
				
			case modes.LOOP:
				this.mode = modes.CUT;
				break;
		}
		
		return this.mode;
	}
	
	//TODO remove. for testing
	switchMode() {
		console.log("old mode", this.mode);
		this.nextMode();
		console.log("new mode", this.mode);
	}
	
}

Cell.modes = modes;
