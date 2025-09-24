// main define
let stylesModule;
let designToolsModule;
let localStorageModule;
let myLocalStorage;

const body = document.body;

const navButtonColor    = "#2F84D0";
const normalButtonColor = "#84D02F";

function ContentSection() {
	this.el = document.createElement("section");
	this.el.classList.add("hero");

	const divContainer = document.createElement("div");
	const h1Semantic = document.createElement("h1");
	const pSemantic = document.createElement("p");

	h1Semantic.innerText = "test";
	pSemantic.innerText = "test p";
	divContainer.appendChild(h1Semantic);
	divContainer.appendChild(pSemantic);

	this.el.appendChild(divContainer);

	// TODO: canvas in the section??
	// or some video media

	// TODO: gradient?
	// this.el.style.backgroundColor = "#2F84D0";

	return this;
}

function Logo() {
	this.el = document.createElement("div");
	this.el.innerText = "logo";
	this.el.classList.add("logo");
	return this;
}

function NavBar() {
	this.el = document.createElement("nav");
	return this;
} 

function ContactSection() {
	this.el = document.createElement("div");
	return this;
}


function Footer() {
	this.el = document.createElement("div");

	this.el.style.display = "flex";
	this.el.style.flexDirection = "row";
	this.el.style.justifyContent = "space-around";

	return this;
}

const logo    = new Logo();
const nav     = new NavBar();
const footer  = new Footer();
const content = new ContentSection();

// TODO: fix styling for button hovering
const NavButtons = {
	home:     new Button({type: "nav-li", innerText: "Home"}),
	about:    new Button({type: "nav-li", innerText: "About"}),
	projects: new Button({type: "nav-li", innerText: "Projects"}),
	resume:   new Button({type: "nav-li", innerText: "Resume"}),
	// TODO: make theme a toggle switch that transitions with a slide
	theme:    new Button({type: "nav-li", innerText: "theme"}),
};

// TODO: get images for the contact buttons
const ContactButtons = {
	github:   new Button({type: "normal", innerText: null, image: "image"}),
	linkedin: new Button({type: "normal", innerText: null, image: "image"}),
	mail:     new Button({type: "normal", innerText: null, image: "image"}),
	twitch:   new Button({type: "normal", innerText: null, image: "image"}),
}

function Button(props = {
	type:      "normal", 
	innerText: null, 
	image:     null,
}) {
	this.type      = props.type;
	this.innerText = props.innerText;
	this.image     = props.image;

	if (props.type === "normal") {
		this.el                       = document.createElement("a");
		this.el.innerText             = props.innerText ?? "test";
		this.el.style.borderRadius    = "10px";
		this.el.style.border          = "solid 1px black";
		this.el.style.cursor          = "pointer";
		this.el.style.backgroundColor = "#84D02F"
		this.el.style.padding         = "5px";

		if (props.image !== null) {
			// TODO: create image or svg element and append here with the content
			this.el.innerText = props.image;
		}
		setupButtonClickHandler(this, "normal");
	}

	if (props.type === "nav-li") {
		this.el                       = document.createElement("li");
		this.el.style.listStyle       = "none"
		this.el.style.backgroundColor = "#2F84D0"
		this.el.style.borderRadius    = "10px";
		this.el.style.border          = "solid 1px black";
		this.el.style.color           = "white";
		this.el.style.padding         = "5px";
		this.el.style.textDecoration  = "none";
		this.el.style.cursor          = "pointer";

		if (props.innerText === "Resume") {
			this.el                       = document.createElement("a");
			this.el.style.backgroundColor = "#2F84D0"
			this.el.style.borderRadius    = "10px";
			this.el.style.border          = "solid 1px black";
			this.el.style.color           = "white";
			this.el.style.padding         = "5px";
			this.el.style.textDecoration  = "none";
			this.el.style.cursor          = "pointer";

			this.el.href      = "https://docs.google.com/document/d/1qbMSl29EXZBkvwZH6blgTdRlpMsVLCYwTo5eT0pKOQc/edit?usp=sharing";
			this.el.target    = "_blank";
			this.el.innerText = props.innerText ?? "test";
		} else {
			this.el.innerText = props.innerText ?? "test";
			setupButtonClickHandler(this, "nav-li");
		}
	}

	return this;
}

/** 
 * @param theme {"dark" | "light"} dark or light theme
 * */
function changeTheme(theme = null) {

	const globalThemeEl = document.head.parentElement;

	globalThemeEl.setAttribute(
		"data-theme", 
		theme
	);
	
	myLocalStorage.request({
		method: "set",
		key: "theme",
		val: theme,
	});
}

function toggleTheme() {
	const globalThemeEl = document.head.parentElement;
	const newTheme = (
		globalThemeEl.getAttribute(
			"data-theme"
		) === "light" 
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
		switch(button.innerText) {
			case "theme": {
				button.el.addEventListener("click", (e) => {
					toggleTheme();
				});
			} break;
			case "Home": {
				button.el.addEventListener("click", (e) => {
					buildHomePage();
				});
			} break;
			case "Projects": {
				button.el.addEventListener("click", (e) => {
					buildProjectsPage();
				});
			} break;
			case "About": {
				button.el.addEventListener("click", (e) => {
					buildAboutPage();
				});
			} break;
		}
	}
}

function initStyles() {
	const styles = new stylesModule.Styles();
	console.log("init styles", styles);
	document.head.parentElement.setAttribute("data-theme", "light");
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

// TODO: add the light/dark theme toggle
// // and add to user's local storage
function setupNav() {
	nav.el.appendChild(logo.el);	

	const headerSemantic = document.createElement("header");
	const ulSemantic = document.createElement("ul");
	const liThemeButton = document.createElement("li");
	headerSemantic.appendChild(nav.el);
	liThemeButton.innerText = "test";
	liThemeButton.style.listStyle = "none";

	for (const li of Object.values(NavButtons)) {
		nav.el.appendChild(li.el);
	}

	body.appendChild(headerSemantic);
}

function setupDesignTools(designToolsModule) {
	const dt = new designToolsModule.DesignTools();
	dt.drawWheel();
	body.parentElement.appendChild(dt.el);
}

// TODO: use footer for the copyright stuff
// // make separate thing for contact for these buttons
function setupFooter() {
	for (const li of Object.values(ContactButtons)) {
		footer.el.appendChild(li.el);
	}

	const footerSemantic = document.createElement("footer");

	footerSemantic.appendChild(footer.el);

	body.appendChild(footerSemantic);
}

function setupHomePageContent() {
	body.appendChild(content.el);
}

// TODO:
function setupAboutPageContent() {
	body.appendChild(content.el);
}

// TODO:
function setupProjectsPageContent() {
	body.appendChild(content.el);
}

function buildHomePage() {
	console.log("build homepage");
	body.innerHTML = "";

	setupNav();
	setupHomePageContent();
	setupFooter();

}

function buildAboutPage() {
	console.log("build aboutpage");
	body.innerHTML = "";

	setupNav();
	setupAboutPageContent();
	setupFooter();
}

function buildProjectsPage() {
	console.log("build projects page");
	body.innerHTML = "";

	setupNav();
	setupProjectsPageContent();
	setupFooter();

}

// main
export function main(
	_appModule,
	stylesMod,
	designToolsMod,
	localStorageMod
) {
	localStorageModule = localStorageMod;
	myLocalStorage     = new localStorageModule.LocalStorage();
	stylesModule       = stylesMod;
	designToolsModule  = designToolsMod;

	initStyles();
	buildHomePage();

	myLocalStorage.init(false, {
		theme: {
			key: "theme",
			val: "dark"
		}
	});

	if (window.location.href.includes("?dev=true")) 
	{
		setupDesignTools();
	}
}
