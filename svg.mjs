export function Svg(src = "", h = 40, w = 40) {
	this.image = document.createElement("img");
	this.image.style.height = `${h}px`;
	this.image.style.width = `${w}px`;
	this.image.src = src;
	return this;
}


