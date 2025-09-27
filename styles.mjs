export function Styles() {
	this.tag = document.createElement("style");

	this.tag.innerHTML = `
	/* ===== Theme Variables ===== */
	:root {
	  --bg:            #f9fafb;
	  --text:          #333;
	  --border:        #000000;
	  --text-muted:    #555;
	  --primary:       #1f6feb;
	  --primary-light: #58a6ff;
	  --card-bg:       #fff;
	  --footer-bg:     #0d1117;
	  --footer-text:   #8b949e;
	  --section-alt:   #ffffff;
	}

	html[data-theme="light"] {
	  --primary:       #1f6feb;
	  --primary-light: #58a6ff;
	  --card-bg:       #fff;
	  --border:        #000000;
	}
	
	html[data-theme="dark"] {
	  --bg:            #0d1117;
	  --text:          #f0f6fc;
	  --text-muted:    #c9d1d9;
	  --primary:       #58a6ff;
	  --primary-light: #1f6feb;
	  --border:        #ffffff;
	  --card-bg:       #161b22;
	  --footer-bg:     #0d1117;
	  --footer-text:   #8b949e;
	  --section-alt:   #161b22;
	}


	/* ===== Global Styles ===== */
	* {
	  margin: 0;
	  padding: 0;
	  box-sizing: border-box;
	}
	body {
	  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	  background: var(--bg);
	  color: var(--text);
	  line-height: 1.6;
	  transition: background 0.2s, color 0.3s;
	}
	a {
	  text-decoration: none;
	  color: inherit;
	}
	img {
	  max-width: 100%;
	  display: block;
	}

	/* ===== Navbar ===== */
	header {
	  background: var(--bg);
	  color: var(--text);
	  padding: 1rem 2rem;
	  position: sticky;
	  top: 0;
	  z-index: 1000;
	}
	nav {
	  max-width: 1100px;
	  margin: auto;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	nav .logo {
	  font-size: 1.5rem;
	  font-weight: bold;
	  color: var(--primary-light);
	}
	nav ul {
	  display: flex;
	  gap: 1.5rem;
	  list-style: none;
	  align-items: center;
	}
	.navulli {
	  transition: color 0.3s ease;
	  border: 2px solid var(--border);
	}
	.navfooterli {
	  transition: color 0.3s ease;
	  border: 2px solid var(--border);
	}
	.navulli:hover {
	  color: var(--primary-light);
	}
	.theme-toggle {
	  cursor: pointer;
	  background: none;
	  border: 2px solid var(--border);
	  color: var(--primary-light);
	  padding: 0.4rem 0.8rem;
	  border-radius: 50%;
	  font-size: 0.9rem;
	  transition: background 0.2s ease, color 0.3s ease;
	}
	.theme-toggle:hover {
	  background: var(--primary-light);
	  color: #fff;
	}

	/* ===== Hero Section ===== */
	.hero {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding: 4rem 2rem;
	  background: var(--section-alt);
	  text-align: center;
	  transition: background 0.2s ease;
	}
	.hero h1 {
	  font-size: 2.5rem;
	  margin-bottom: 1rem;
	  color: var(--text);
	}
	.hero p {
	  max-width: 600px;
	  margin: 0 auto 2rem;
	  font-size: 1.2rem;
	  color: var(--text-muted);
	}
	.hero .btn {
	  background: var(--primary-light);
	  color: #fff;
	  padding: 0.75rem 1.5rem;
	  border-radius: 30px;
	  font-weight: bold;
	  transition: background 0.2s ease;
	}
	.hero .btn:hover {
	  background: var(--primary);
	}

	/* ===== About Section ===== */
	.about {
	  max-width: 1100px;
	  margin: 3rem auto;
	  padding: 0 2rem;
	  text-align: center;
	}
	.about h2 {
	  font-size: 2rem;
	  margin-bottom: 1rem;
	}
	.about p {
	  font-size: 1.1rem;
	  color: var(--text-muted);
	}

	/* ===== Projects Section ===== */
	.projects {
	  background: var(--section-alt);
	  padding: 3rem 2rem;
	  transition: background 0.2s ease;
	}
	.projects h2 {
	  text-align: center;
	  font-size: 2rem;
	  margin-bottom: 2rem;
	}
	.project-grid {
	  max-width: 1100px;
	  margin: auto;
	  display: grid;
	  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	  gap: 1.5rem;
	}
	.project-card {
	  background: var(--card-bg);
	  border-radius: 12px;
	  padding: 1.5rem;
	  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
	  transition: transform 0.2s ease, background 0.3s ease;
	}
	.project-card:hover {
	  transform: translateY(-5px);
	}
	.project-card h3 {
	  margin-bottom: 0.5rem;
	}
	.project-card p {
	  font-size: 0.95rem;
	  color: var(--text-muted);
	  margin-bottom: 1rem;
	}
	.project-card a {
	  color: var(--primary-light);
	  font-weight: bold;
	}

	/* ===== Contact Section ===== */
	.contact {
	  background: var(--bg);
	  transition: background 0.2s ease, color 0.3s ease;
	}
	.contact p {
	  margin-bottom: 2rem;
	  color: var(--text-muted);
	}
	.contact a.btn:hover {
	  background: var(--primary);
	}

	/* ===== Contact ===== */
	.contactbtn {
		border: 2px solid var(--border);
	}
	/* ===== Contact ===== */

	/* ===== Footer ===== */
	footer {
		background: var(--footer-bg);
		color: var(--footer-text);
		text-align: center;
		padding: 1.5rem;
		font-size: 0.9rem;
		transition: background 0.3s ease, color 0.3s ease;
	}
	/* ===== Footer ===== */

	/* ===== Responsive Tweaks ===== */
	@media (max-width: 768px) {
	  .hero h1 {
		font-size: 2rem;
	  }
	  .about p {
		font-size: 1rem;
	  }
	}
	`;

	return this;
}
