"use strict";

class Colour {
	_colourName;
	_colour;
	constructor(colourName, colour) {
		this._colourName = colourName;
		this._colour = colour;
	}
	get name() {
		return this._colourName;
	}
	get hex() {
		return this._colour;
	}
}

export default Colour;