//// @ts-check
// main define
let stylesModule;
let designToolsModule;
let localStorageModule;
let myLocalStorage;
let svgModule;
let commonModule;

let ContactButtons;
let projectSection;
let videl;

let sunSvg;
let logoSvg;
let logoSvgForLight;
let twitchDarkSvg;
let linkedInSvg;
let mailSvg;
let twitchLightSvg;
let moonSvg;
let githubSvg;
let githubDarkModeSvg;
let qrcodeSvg;

// TODO: use as a background
// video behind everything
// on the page
let rustvid_element;

const body = document.body;

// close picture in picture element if it's open
document.onkeydown = (e) => {
	switch(e.key) {
		case "Escape": {
			if (document.pictureInPictureElement !== null) {
				document.exitPictureInPicture();
			};
		} break;
		default: break;
	}
};

const globalThemeEl = document.head.parentElement;

function ProjectSection() {
	this.el = document.createElement("section");
	this.el.id = "projects";
	this.el.classList.add("projects");

	const h2Title = document.createElement("h2");
	h2Title.innerText = "Projects";
	this.el.appendChild(h2Title);

	const projectgrid = document.createElement("div");
	projectgrid.classList.add("project-grid");
	this.el.appendChild(projectgrid);

	// TODO: make background a demo video?
	// yes!!
	const rustvisualartcard = new ProjectCard({ 
		...commonModule.ProjectMap.RustVisualArt,
	});

	const rustneopixelcard = new ProjectCard({ 
		...commonModule.ProjectMap.RustNeoPixel,
	});

	const ledmatrixcard = new ProjectCard({ 
		...commonModule.ProjectMap.LEDArtMatrix,
	});

	const cobolmainframecard = new ProjectCard({ 
		...commonModule.ProjectMap.COBOLStudy,
	});

	const projectcards = [
		rustvisualartcard,
		rustneopixelcard,
		ledmatrixcard,
		cobolmainframecard,
	];

	for (const card of projectcards) {
		projectgrid.appendChild(card.el);
	}

	return this;
}

function ProjectCard(opts = {
	demotext : "cardtitle",
	repotext : "repotext",
	ptext    : "cardp",
	name     : "cardp",
    href     : "cardhref",
	video    : false,
	videosrc : "",
}) {

	if (opts.video) {

		const faderp = document.createElement("p");
		faderp.style.display = "none";
		faderp.innerText = "Volume: 0.3";

		const fader = document.createElement("input");
		fader.style.display = "none";
		fader.type = "range";
		fader.oninput = (e) => {
			faderp.innerText = "Volume: " + e.target.value;
			videl.volume = Number(e.target.value);
		}
		fader.defaultValue = 0.3;
		fader.max = 1;
		fader.min = 0;
		fader.step = .001;

		this.showcontrols = () => {
			fader.style.display  = "block";
			faderp.style.display = "block";

			fader.value          = 0.3;
			faderp.innerText     = "0.3";
		}

		this.hidecontrols = () => {
			fader.style.display = "none";
			faderp.style.display = "none";
		}

		const cardlink  = document.createElement("a");
		cardlink.classList.add("project-card");
		cardlink.innerText    = opts.name + `\n - ${opts.ptext}`;
		cardlink.style.cursor = "auto";
		cardlink.style.fontSize = "20px";
		cardlink.style.fontWeight = 1000;

		const demop = document.createElement("p");
		demop.id = opts.name
		demop.innerText = opts.demotext;
		demop.style.fontSize = "unset !important";
		demop.style.fontWeight = "lighter";
		demop.style.border = "solid #00FF00 1px";
		demop.style.borderRadius = "10px";
		demop.style.width = "65px";
		demop.style.paddingLeft = "4px";
		demop.style.cursor = "pointer";
		demop.style.margin = "0 auto";

		// enter pip mode for video
		demop.onclick = (e) => {
			console.log("start pip");
			enterPip(e, opts.videosrc, this);
			fader.style.display = "block";
			faderp.style.display = "block";
		};

		cardlink.append(
			demop,
			fader,
			faderp
		);

		this.el = cardlink;

		return this;

	} else {

		const cardlink  = document.createElement("a");
		cardlink.classList.add("project-card");
		cardlink.target       = "_blank";
		cardlink.innerText    = opts.name + `\n - ${opts.ptext}`;
		cardlink.href         = opts.href;
		cardlink.style.cursor = "pointer";
		cardlink.style.fontSize = "20px";
		cardlink.style.fontWeight = 1000;

		const demop = document.createElement("p");
		demop.innerText = opts.demotext;
		demop.style.fontSize = "unset !important";
		demop.style.fontWeight = "lighter";
		demop.style.border = "solid #00FF00 1px";
		demop.style.borderRadius = "10px";
		demop.style.width = "170px";
		demop.style.paddingLeft = "4px";
		demop.style.cursor = "pointer";
		demop.style.margin = "0 auto";

		cardlink.append(
			demop,
		);

		this.el = cardlink;

		return this;
	}
	
}

function ContentSection() {
	this.el = document.createElement("section");
	this.el.classList.add("hero");

	const divContainer = document.createElement("div");
	const h1Semantic = document.createElement("h1");
	const pSemantic = document.createElement("p");

	// hero
	h1Semantic.innerText = "Anders Ackerman";
	pSemantic.innerText = "Software Engineer";

	divContainer.appendChild(h1Semantic);
	divContainer.appendChild(pSemantic);

	this.el.appendChild(divContainer);

	// TODO: canvas in the section??
	// or some video media

	return this;
}

function NavBar() {
	this.el = document.createElement("nav");
	return this;
}

function Footer() {
	this.el = document.createElement("div");

	this.el.style.display = "flex";
	this.el.style.flexDirection = "row";
	this.el.style.justifyContent = "space-around";

	return this;
}

const nav     = new NavBar();
const footer  = new Footer();
const content = new ContentSection();

const NavButtons = {
	projects: new Button({type: "nav-li", innerText: "Projects", id: "Projects" }),
	resume:   new Button({type: "nav-li", innerText: "Resume",   id: "Resume" }),
	theme:    new Button({type: "nav-li", innerText: "theme",    id: "theme" }),
};

function isLight(theme = null) {
	if (theme) return theme;
	return globalThemeEl.getAttribute("data-theme") === "light";
}

function Button(props = {
	type:      "normal", 
	id:        "test" + Math.random() * 1000,
	innerText: null, 
	image:     null,
}) {
	this.type      = props.type;
	this.innerText = props.innerText;
	this.image     = props.image;

	if (props.type === "normal") {
		this.el                       = document.createElement("a");
		this.el.id                    = props.id;
		// this.el.innerText             = props.innerText ?? "test";
		this.el.classList.add("contactbtn");
		this.el.style.borderRadius    = "10px";
		// this.el.style.border          = "solid 1px black";
		this.el.style.cursor          = "pointer";
		// this.el.style.backgroundColor = "#84D02F"
		this.el.style.padding         = "5px";

		if (props.image instanceof svgModule.Svg) {
			if (this.el.id === "twitch") {
				this.el.href = "https://twitch.tv/djvikingsintheroad";
				this.el.target = "_blank";
			} 

			if (this.el.id === "github") {
				this.el.href   = "https://github.com/dj-viking";
				this.el.target = "_blank";
			} 
			if (this.el.id === "linkedin") {
				this.el.href   = "https://www.linkedin.com/in/anders-ackerman-b1055061/";
				this.el.target = "_blank";
			}
			if (this.el.id === "mail") {
				this.el.href   = "mailto:anders.swedishviking@gmail.com";
				this.el.target = "_blank";
			}
			this.el.innerText = "";
			this.el.appendChild(this.image.imageEl);
		}
	}

	if (props.type === "nav-li") {
		this.el                       = document.createElement("li");
		this.el.id                    = props.id;
		this.el.style.listStyle       = "none";
		this.el.style.borderRadius    = "10px";
		this.el.style.padding         = "5px";
		this.el.style.textDecoration  = "none";
		this.el.style.cursor          = "pointer";

		this.el.classList.add("navulli");

		if (props.id === "theme") {
			this.el                       = document.createElement("li");
			this.el.id                   = props.id;
			this.el.classList.add("theme-toggle");
			this.el.style.listStyle       = "none";
			this.el.style.padding         = "5px";
			this.el.style.textDecoration  = "none";
			this.el.style.cursor          = "pointer";
		}

		if (props.id === "Projects") {
			this.el                       = document.createElement("a");
			this.el.id                    = props.id; 
			this.el.classList.add("navulli");
			this.el.style.borderRadius    = "10px";
			this.el.style.padding         = "5px";
			this.el.style.textDecoration  = "none";
			this.el.style.cursor          = "pointer";

			this.el.href                  = "#projects";
			this.el.innerText             = props.innerText ?? "test";
		}

		if (props.id === "Resume") {
			this.el                       = document.createElement("a");
			this.el.id                    = props.id; 
			this.el.classList.add("navulli");
			this.el.style.borderRadius    = "10px";
			this.el.style.padding         = "5px";
			this.el.style.textDecoration  = "none";
			this.el.style.cursor          = "pointer";

			this.el.href                  = "./docs/anders-ackerman-resume.pdf";
			this.el.download              = "";
			this.el.innerText             = props.innerText ?? "test";
		}
		setupButtonClickHandler(this, "nav-li");
	}

	return this;
}

/** 
 * @param theme {"dark" | "light"} dark or light theme
 * */
function changeTheme(theme = null) {

	globalThemeEl.setAttribute(
		"data-theme", 
		theme
	);

	// update switch images
	if (theme === "light") {

		logoSvg.imageEl.style.display = "none";
		logoSvgForLight.imageEl.style.display = "block";
		sunSvg.imageEl.style.display = "none";
		moonSvg.imageEl.style.display = "block";

		if (ContactButtons) {
			ContactButtons.github.image = new svgModule.Svg("./images/github-mark.svg", 40, 40);
			ContactButtons.twitch.image = new svgModule.Svg("./images/twitch-dark.svg", 40, 40);
			buildHomePage();
		}

	} else {
		logoSvg.imageEl.style.display = "block";
		logoSvgForLight.imageEl.style.display = "none";
		sunSvg.imageEl.style.display = "block";
		moonSvg.imageEl.style.display = "none";

		if (ContactButtons) {
			ContactButtons.github.image = new svgModule.Svg("./images/github-mark-white.svg", 40, 40);
			ContactButtons.twitch.image = new svgModule.Svg("./images/twitch-white.svg", 40, 40);
			buildHomePage();
		}

	}
	
	myLocalStorage.request({
		method: "set",
		key: "theme",
		val: theme,
	});
}

function toggleTheme() {
	const newTheme = (
		globalThemeEl.getAttribute( "data-theme") === "light" 
			? "dark" 
			: "light"
	);

	changeTheme(newTheme);

	myLocalStorage.request({
		method: "set",
		key: "theme",
		val: newTheme,
	});
}

// main setup
function setupButtonClickHandler(
	button, 
	type = "normal", 
) {
	if (type === "nav-li") {
		switch(button.el.id) {
			case "theme": {
				button.el.addEventListener("click", (e) => {
					toggleTheme();
				});
			} break;
			default: {} break;
		}
	}
}

function initStyles() {
	const styles = new stylesModule.Styles();
	console.log("init styles", styles);
	document.head.parentElement.setAttribute("data-theme", "dark");

	// clear previous style tag
	if (document.getElementsByTagName("style")[0]) {
		document.head.removeChild(document.getElementsByTagName("style")[0]);
	}

	document.head.appendChild(styles.tag);

	const userTheme = myLocalStorage.request({
		method: "get",
		key: "theme"
	});

	if (userTheme !== null) 
	{
		changeTheme(userTheme);
	}
}

function setupImagesForDOM() {
	NavButtons.theme.el.innerText = "";	

	if (isLight()) {
		logoSvgForLight.imageEl.style.display = "block";
		logoSvg.imageEl.style.display         = "none";
		sunSvg.imageEl.style.display          = "none";
	} else {
		sunSvg.imageEl.style.display          = "block";
		logoSvg.imageEl.style.display         = "block";
		logoSvgForLight.imageEl.style.display = "none";
	}

	NavButtons.theme.el.appendChild(
		sunSvg.imageEl
	);

	NavButtons.theme.el.appendChild(
		moonSvg.imageEl
	);
}

function setupNav() {

	nav.el.appendChild(logoSvg.imageEl);	
	nav.el.appendChild(logoSvgForLight.imageEl);	

	const headerSemantic = document.createElement("header");
	const ulSemantic = document.createElement("ul");
	const liThemeButton = document.createElement("li");
	headerSemantic.appendChild(nav.el);
	liThemeButton.style.listStyle = "none";

	for (const li of Object.values(NavButtons)) {
		nav.el.appendChild(li.el);
	}

	body.appendChild(headerSemantic);
}

function setupDesignTools() {
	const dt = new designToolsModule.DesignTools();
	dt.drawWheel();
	body.parentElement.appendChild(dt.el);
}

function setupFooter() {
	const footer = document.createElement("footer");

	footer.innerText = "© 2025 Anders Ackerman. All rights reserved";

	body.appendChild(footer);
}

function setupProjectsPageContent() {
	projectSection = new ProjectSection();
}

// init contact buttons
function setupContact() {

	ContactButtons = {
		github:   new Button({id: "github",   type: "normal", innerText: null,
                                  image: isLight() ? githubSvg : githubDarkModeSvg

        }), 
		twitch:   new Button({id: "twitch",   type: "normal", innerText: null,
                                  image: isLight() ? twitchDarkSvg : twitchLightSvg 

		}),
		linkedin: new Button({id: "linkedin", type: "normal", innerText: null,
                                  image: linkedInSvg

		}), 
		mail:     new Button({id: "mail",     type: "normal", innerText: null,
                                  image: mailSvg 

		}), 
	}

	const contactcontainer = document.createElement("section");
	contactcontainer.style.display = "flex";
	contactcontainer.style.flexDirection = "row";
	contactcontainer.style.justifyContent = "space-around";
	contactcontainer.style.padding = "1.4rem 1.8rem";

	for (const li of Object.values(ContactButtons)) {
		li.el.classList.add("navfooterli");
		contactcontainer.appendChild(li.el);
	}

	body.appendChild(contactcontainer);
}

function setupHomePageContent() {
	body.appendChild(content.el);
	body.appendChild(projectSection.el);
}

// play video with picture in picture mode
let pipwindow;

function onEnterPip(e, card) {
	console.log("enter pip event", e);
	card.showcontrols();
	videl.pause();
	videl.currentTime = 0;

	setTimeout(() => {
		videl.play();
	}, 100);
}

function onLeavePip(e, card) {
	console.log("leave pip event", e);
	card.hidecontrols();
	videl.pause();
}

async function enterPip(_clickev, src, card) {

	console.log("click enter pip", _clickev);
	await new Promise(async r => {
		if (videl) {
			videl.pause();
		}
		videl = document.createElement("video");

		videl.onenterpictureinpicture = (e) => { onEnterPip(e, card); };
		videl.onleavepictureinpicture = (e) => { onLeavePip(e, card); };
		videl.src          = src; 
		videl.height       = 0;
		videl.width        = 0;
		videl.volume       = 0.3;
		videl.autoplay     = false;
		videl.onloadeddata = async (e) => {
			console.log("loaded", e)
			pipwindow = await videl.requestPictureInPicture();
		}

		r(null);
	});
}


function buildHomePage() {
	console.log("build homepage");
	body.innerHTML = "";

	setupNav();
	setupProjectsPageContent();
	setupHomePageContent();
	setupContact();
	setupFooter();
}

function initImages() {
	sunSvg            = new svgModule.Svg("./images/sun.svg",         40, 40);
	moonSvg           = new svgModule.Svg("./images/moon.svg",        40, 40);
	githubSvg         = new svgModule.Svg("./images/github-mark.svg", 40, 40);
	githubDarkModeSvg = new svgModule.Svg("./images/github-mark-white.svg", 40, 40);
	twitchLightSvg    = new svgModule.Svg("./images/twitch-white.svg", 40, 40);
	twitchDarkSvg     = new svgModule.Svg("./images/twitch-dark.svg", 40, 40);
	linkedInSvg       = new svgModule.Svg("./images/linkedin.svg", 40, 40);
	mailSvg           = new svgModule.Svg("./images/mail.svg", 40, 40);
	qrcodeSvg         = new svgModule.Svg("./images/qr-code.svg", 40, 40);
	logoSvg           = new svgModule.Svg("./images/12-14-2025-logo.svg", 40, 40);
	logoSvgForLight   = new svgModule.Svg("./images/12-14-2025-logo-light.svg", 40, 40);
}

// main
export function main(
	_appModule,
	commonMod,
	stylesMod,
	designToolsMod,
	localStorageMod,
	svgMod
) {
	localStorageModule = localStorageMod;
	svgModule          = svgMod;
	commonModule       = commonMod;
	myLocalStorage     = new localStorageModule.LocalStorage();
	stylesModule       = stylesMod;
	designToolsModule  = designToolsMod;

	myLocalStorage.init(false, {
		theme: {
			key: "theme",
			val: "dark"
		}
	});

	initImages();
	initStyles();
	setupImagesForDOM();
	buildHomePage();

	if (window.location.href.includes("?dev=true")) 
	{
		setupDesignTools();
	}
}
