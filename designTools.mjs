function clamp(val, lo, hi) { 
	return Math.min(Math.max(val, lo), hi); 
}
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1/6) return p + (q - p) * 6 * t;
	if (t < 1/2) return q;
	if (t < 2/3) return p + (q - p) * 6 * (2/3 - t);
	return p;
}
function rgbToHex(rgb) {
	return `#${
		rgb.map(x => x.toString(16)
				.padStart(2, "0"))
		.join("").toUpperCase()
	}`
}
function hslToHex(h,s,l) {
	return rgbToHex(hslToRgbInts(h,s,l));
}
// readable text color for swatch (black or white)
function readableTextColor(hex) {
	const r = parseInt(hex.substr(1,2), 16);
	const g = parseInt(hex.substr(3,2), 16);
	const b = parseInt(hex.substr(5,2), 16);
	// luminance / YIQ
	const yiq = (r*299 + g*587 + b*114) / 1000;
	return yiq >= 128 ? '#000000' : '#FFFFFF';
}
function colorAtPoint(x, y, radius, type = "base") {
	const cx = x - radius;
	const cy = y - radius;
	const dist = Math.sqrt(cx*cx + cy*cy);

	if (dist > radius) return null;

	const hue   = (Math.atan2(cy, cx) * 180 / Math.PI + 360) % 360;
	const sat   = Math.min(dist / radius, 1) * 100;
	const lum = sat;

	const comp_hue  = (hue + 180) % 360;
	const tri1_hue  = (hue + 120) % 360;
	const tri2_hue  = (hue + 240) % 360;

	const baseHex   = hslToHex(hue,      sat, lum);
	const compHex   = hslToHex(comp_hue, sat, lum);
	const triad1Hex = hslToHex(tri1_hue, sat, lum);
	const triad2Hex = hslToHex(tri2_hue, sat, lum);

	return {
		hue: (() => {
			switch (type) {
				case "base": return hue;
				case "comp": return comp_hue;
				case "tri1": return tri1_hue;
				case "tri2": return tri2_hue;
			}
		})(), 
		sat,
		lum,
		hex: (() => {
			switch (type) {
				case "base": return baseHex;
				case "comp": return compHex;
				case "tri1": return triad1Hex;
				case "tri2": return triad2Hex;
			}
		})()
	};
}
function hslToRgbInts(h, s, l) {
	// Normalize
	h = ((h % 360) + 360) % 360;
	s = clamp(s / 100, 0, 1);
	l = clamp(l / 100, 0, 1);

	// achromatic (gray)
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}

	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const hk = h / 360;


	const r = hue2rgb(p, q, hk + 1/3);
	const g = hue2rgb(p, q, hk);
	const b = hue2rgb(p, q, hk - 1/3);

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
export function DesignTools() {
	this.el = document.createElement("div");
	this.el.height = "400px";
	this.el.width = "400px";
	this.el.style.display = "flex";
	this.el.style.flexDirection = "column";
	this.el.style.margin = "0 auto";

	this.canvas = document.createElement("canvas");
	this.canvas.style.cursor = "crosshair";
	this.canvas.height = 400;
	this.canvas.width = 400;
	this.ctx = this.canvas.getContext("2d");
	this.radius = this.canvas.width / 2;

	this.colorTextContainer = document.createElement("div");
	this.colorTextContainer.id = "color-text-container";
	this.colorTextContainer.style.display = "flex";
	this.colorTextContainer.style.marginTop = "10px";
	this.colorTextContainer.style.flexDirection = "row";
	this.colorTextContainer.style.justifyContent = "space-around";

	this.base            = document.createElement("span");
	this.base.id         = "base";
	this.base_preview    = document.createElement("p");
	this.base_preview.id = "base-preview";
	this.basep           = document.createElement("p");
	this.base_p_preview  = document.createElement("p");

	this.base.style.border = "solid 1px black;";
	this.base.style.height = "20px";
	this.base.style.width = "100%";
	this.base.style.backgroundColor = "grey";

	this.base_preview.style.width = "20px";
	this.base_preview.style.height = "20px";
	
	this.basep.color = "black";
	this.basep.innerText = "waiting";

	this.base_p_preview.style.color = "black";
	this.base_p_preview.innerText = "waiting";
	
	this.basep.color = "black";
	this.basep.innerText = "waiting";

	this.comp            = document.createElement("span");
	this.comp.id         = "comp";
	this.comp_preview    = document.createElement("p");
	this.comp_preview.id = "comp-preview";
	this.compp           = document.createElement("p");
	this.comp_p_preview  = document.createElement("p");

	this.comp_preview.style.width = "20px";
	this.comp_preview.style.height = "20px";
	
	this.compp.innerText = "waiting";
	this.compp.color = "black";

	this.comp_p_preview.innerText = "waiting";
	this.comp_p_preview.color = "black";

	this.comp.style.border = "solid 1px black;";
	this.comp.style.height = "20px";
	this.comp.style.width = "100%";
	this.comp.style.backgroundColor = "grey";

	this.tri1           = document.createElement("span");
	this.tri1_preview   = document.createElement("p");
	this.tri1p          = document.createElement("p");
	this.tri1_p_preview = document.createElement("p");

	this.tri1_preview.style.width = "20px";
	this.tri1_preview.style.height = "20px";

	this.tri1p.innerText = "waiting";
	this.tri1p.color = "black";

	this.tri1_p_preview.innerText = "waiting";
	this.tri1_p_preview.color = "black";

	this.tri1.style.border = "solid 1px black;";
	this.tri1.style.height = "20px";
	this.tri1.style.width = "100%";
	this.tri1.style.backgroundColor = "grey";

	this.tri2           = document.createElement("span");
	this.tri2_preview   = document.createElement("p");
	this.tri2p          = document.createElement("p");
	this.tri2_p_preview = document.createElement("p");

	this.tri2_preview.style.width = "20px";
	this.tri2_preview.style.height = "20px";

	this.tri2p.innerText = "waiting";
	this.tri2p.color = "black";

	this.tri2_p_preview.innerText = "waiting";
	this.tri2_p_preview.color = "black";

	this.tri2.style.border = "solid 1px black;";
	this.tri2.style.height = "20px";
	this.tri2.style.width = "100%";
	this.tri2.style.backgroundColor = "grey";

	this.el.append(
		this.canvas,
		this.colorTextContainer
	);

    this.drawWheel = () => {
		const image = this.ctx.createImageData(this.canvas.width, this.canvas.height);
		const data = image.data;

		for (let y = 0; y < this.canvas.height; y++) {
			for (let x = 0; x < this.canvas.width; x++) {
				const dx = x - this.radius;
				const dy = y - this.radius;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist > this.radius) continue; // skip outside circle

				let hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
				let sat = Math.min(dist / this.radius, 1) * 100; // 0% → 100%
				let light = sat;

				const [r, g, b] = hslToRgbInts(hue, sat, light);
				const idx = (y * this.canvas.width + x) * 4;
				data[idx] = r;
				data[idx+1] = g;
				data[idx+2] = b;
				data[idx+3] = 255; // opaque
			}
		}
		this.ctx.putImageData(image, 0, 0);
    }
	this.canvas.addEventListener('mousemove', (e) => {
		const rect = this.canvas.getBoundingClientRect();

		let point = colorAtPoint(e.clientX - rect.left, e.clientY - rect.top, this.radius, "base");

		if (!point) return;

		this.base_preview.style.backgroundColor = point.hex;
		this.base_p_preview.innerText = point.hex;

		point = colorAtPoint(e.clientX - rect.left, e.clientY - rect.top, this.radius, "comp");
		this.comp_preview.style.backgroundColor = point.hex;
		this.comp_p_preview.innerText = point.hex;

		point = colorAtPoint(e.clientX - rect.left, e.clientY - rect.top, this.radius, "tri1");
		this.tri1_preview.style.backgroundColor = point.hex;
		this.tri1_p_preview.innerText = point.hex;

		point = colorAtPoint(e.clientX - rect.left, e.clientY - rect.top, this.radius, "tri2");
		this.tri2_preview.style.backgroundColor = point.hex;
		this.tri2_p_preview.innerText = point.hex;

		// previewDiv.style.backgroundColor = point.hex;
		// previewDiv.textContent = point.hex;
		// previewDiv.style.color = readableTextColor(point.hex);
	});

	this.canvas.addEventListener("click", (e) => {
		const rect = this.canvas.getBoundingClientRect();

		const cx = ( e.clientX - rect.left - this.radius );
		const cy = ( e.clientY - rect.top  - this.radius );

		const dist = Math.sqrt(cx*cx + cy*cy);
		
		if (dist > this.radius) return;

		const hue = (Math.atan2(cy, cx) * 180 / Math.PI + 360) % 360;
		const sat = Math.min(dist/this.radius, 1) * 100;
		const lum = sat;
		
		const comp_hue  = (hue + 180) % 360;
		const tri1_hue  = (hue + 120) % 360;
		const tri2_hue  = (hue + 240) % 360;

		const baseHex   = hslToHex(hue,      sat, lum);
		const compHex   = hslToHex(comp_hue, sat, lum);
		const triad1Hex = hslToHex(tri1_hue, sat, lum);
		const triad2Hex = hslToHex(tri2_hue, sat, lum);

		// update elements with new colors
		this.basep.innerText = baseHex; 
		this.base.style.backgroundColor = baseHex;

		this.compp.innerText = compHex; 
		this.comp.style.backgroundColor = compHex; 

		this.tri1p.innerText = triad1Hex; 
		this.tri1.style.backgroundColor = triad1Hex; 

		this.tri2p.innerText = triad2Hex; 
		this.tri2.style.backgroundColor = triad2Hex; 

		Object.values(FooterButtons).forEach(b => {
			b.el.style.backgroundColor = triad2Hex
		});

		Object.values(NavButtons).forEach(b => {
			b.el.style.backgroundColor = baseHex;
		});

		content.el.style.backgroundColor = baseHex;
	});

	this.baseContainerPreview = document.createElement("div");
	this.baseContainerPreview.style.display = "block";
	this.baseContainerPreview.append(
		this.base_preview,
		this.base_p_preview
	);

	this.baseContainer = document.createElement("div");
	this.baseContainer.id = "base-container";
	this.baseContainer.style.display = "flex";
	this.baseContainer.style.flexDirection = "column";
	this.baseContainer.style.width = "50px";
	this.baseContainer.append(
		this.base,
		this.basep,
		this.baseContainerPreview,
	);

	this.compContainerPreview = document.createElement("div");
	this.compContainerPreview.style.display = "block";
	this.compContainerPreview.append(
		this.comp_preview,
		this.comp_p_preview
	);

	this.compContainer = document.createElement("div");
	this.compContainer.id = "comp-container";
	this.compContainer.style.display = "flex";
	this.compContainer.style.flexDirection = "column";
	this.compContainer.style.width = "50px";
	this.compContainer.append(
		this.comp,
		this.compp,
		this.compContainerPreview,
	);

	this.tri1ContainerPreview = document.createElement("div");
	this.tri1ContainerPreview.style.display = "block";
	this.tri1ContainerPreview.append(
		this.tri1_preview,
		this.tri1_p_preview
	);

	this.tri1Container = document.createElement("div");
	this.tri1Container.id = "tri1-container";
	this.tri1Container.style.display = "flex";
	this.tri1Container.style.flexDirection = "column";
	this.tri1Container.style.width = "50px";
	this.tri1Container.append(
		this.tri1,
		this.tri1p,
		this.tri1ContainerPreview,
	);

	this.tri2ContainerPreview = document.createElement("div");
	this.tri2ContainerPreview.style.display = "block";
	this.tri2ContainerPreview.append(
		this.tri2_preview,
		this.tri2_p_preview
	);

	this.tri2Container = document.createElement("div");
	this.tri2Container.id = "tri2-container";
	this.tri2Container.style.display = "flex";
	this.tri2Container.style.flexDirection = "column";
	this.tri2Container.style.width = "50px";
	this.tri2Container.append(
		this.tri2,
		this.tri2p,
		this.tri2ContainerPreview,
	);

	this.colorTextContainer.append(
		this.baseContainer,
		this.compContainer,
		this.tri1Container,
		this.tri2Container
	);

	return this;
}
