export function Svg(src = "", h = 40, w = 40) {
	this.imageEl = document.createElement("img");
	this.imageEl.style.height = `${h}px`;
	this.imageEl.style.width = `${w}px`;
	this.imageEl.src = src;

	return this;
}
