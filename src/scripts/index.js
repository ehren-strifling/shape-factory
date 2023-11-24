"use strict";

import Shape from "./shape.js";
import Colour from "./colour.js";

const colours = [
	new Colour("red", "#ff0000"),
	new Colour("orange", "#ffa000"),
	new Colour("yellow", "#ffff00"),
	new Colour("green", "#00ff00"),
	new Colour("cyan", "#00ffff"),
	new Colour("blue", "#0000ff"),
	new Colour("purple", "#ff00ff"),
	new Colour("white", "#ffffff"),
	new Colour("black", "#000000")
];

function loadColours() {
	let datalist = document.getElementById("colour-names");
	colours.forEach(c=>{
		let option = document.createElement("option");
		option.value = c.name;
		datalist.appendChild(option);
	});
}
function loadShapes() {
	[...document.getElementsByClassName("shape-names")].forEach(datalist=>{
		Shape.NAMES.forEach(name=>{
			let option = document.createElement("option");
			option.innerHTML = name;
			datalist.appendChild(option);
		});
	});
}

const MAX_SHAPES = 20;
let shapeCount = 0;

const shapes = new Array(20).fill(null);

function loadDisplay() {
	[...document.getElementsByClassName("display-shape")].forEach(display => {
		for (let i=0;i<MAX_SHAPES;++i) {
			let shape = document.createElement("div");
			shape.classList.add("shape");
			shape.addEventListener("click", e=>{shapeClicked(i)});
			display.appendChild(shape);
		}
	})
}

function loadCreateButton() {
	[...document.getElementsByClassName("create-button")].forEach(element => {
		element.addEventListener("click", createShape);
	});
}

function createShape(e) {
	let shape = e.target.parentElement.querySelector(".shape-names").value;
	let colour = getColour(e.target.parentElement.querySelector(".colour-names").value);

	if (colour===null) {
		setMessage(`Invalid color`, true);
		return;
	}

	if (shapeCount<MAX_SHAPES) {
		shapes[shapeCount] = new Shape(colour, shape);
		[...document.querySelectorAll(`.display-shape .shape:nth-child(${shapeCount+1})`)].forEach(element=>{
			element.classList.add(`${shapes[shapeCount].type}`);
			element.style.backgroundColor = shapes[shapeCount].colourHex;
		});
		setMessage(`${shapes[shapeCount].colourName} ${shapes[shapeCount].type} created successfully`);
		shapeCount++;
	} else {
		setMessage(`Not enough room to add shape`, true);
	}
}

/** @param {string} name */
function getColour(name) {
	for (let i=0;i<colours.length;++i) {
		if (colours[i].name === name) {
			return colours[i];
		}
	}

	if (name.charAt(0)!=='#') {
		name = '#' + name;
	}

	if (isColor(name)) {
		return new Colour(`${name}`, name);
	}
	return null;
}

function isColor(string) {
	if (string.charAt(0)==='#') {
		if (string.length===4 || string.length=== 5 || string.length===7 || string.length===9) {
			for (let i=1;i<string.length;++i) {
				let charCode = string.charCodeAt(i);
				if (!(
					(charCode >='0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) ||
					(charCode >='a'.charCodeAt(0) && charCode <= 'f'.charCodeAt(0)) ||
					(charCode >='A'.charCodeAt(0) && charCode <= 'F'.charCodeAt(0))	
					))  {
					return false;
				}
			}
			return true;
		}
	}
	return false;
}

function shapeClicked(shapeId) {
	if (shapeId<shapeCount) {
		setMessage(`Shape ${shapeId+1}: ${shapes[shapeId].colourName} ${shapes[shapeId].type}`);
	}
}

function setMessage(text, error) {
	[...document.getElementsByClassName("message")].forEach(element=>{
		element.innerHTML = text;
		if (error) {
			element.classList.add("error");
		} else {
			element.classList.remove("error");
		}
	});
	
}



loadColours();
loadShapes();
loadDisplay();
loadCreateButton();