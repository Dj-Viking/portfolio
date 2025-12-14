//
// svgopts { top: 0, left: 0 | bottom: 0, right: 0 & fill: #ffffff }

export function Svg(src = "", h = 40, w = 40, svgopts = { none: true }) {
	this.imageEl = document.createElement("img");
	this.imageEl.style.height = `${h}px`;
	this.imageEl.style.width = `${w}px`;
	this.imageEl.src = src;

	return this;
}
