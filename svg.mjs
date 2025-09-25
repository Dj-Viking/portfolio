export function Svg(src = "") {
	this.image = document.createElement("img");
	this.image.style.height = "40px";
	this.image.style.width = "40px";
	this.image.src = src;
	return this;
}


