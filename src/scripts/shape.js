'use strict';

import Colour from "./colour.js";

class Shape {
	static NAMES = [
		"circle",
		"square",
		//"triangle", //Unfortunately way too difficult to add at the moment
		"arc"
	];
	_type = "";
	_colour;

	constructor(colour, type) {
		this._colour = colour;
		this._type = type;
	}
	/** @returns {string} */
	get type() {
		return this._type;
	}
	/** @returns {string} */
	get colourName() {
		return this._colour.name;
	}
	/** @returns {string} */
	get colourHex() {
		return this._colour.hex;
	}

	getInfo() {
		return `${this.colourName} ${this.type}`;
	}
	// destroy() { //actually, the shape class will not be responsible for the html element

	// }
}


export default Shape;