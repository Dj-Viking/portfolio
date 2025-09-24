import { WS_PORT } from "./common.mjs";

(async () => {
   
	let ws;
	if (window.location.href.includes("localhost")) {
		ws = new WebSocket(`ws://localhost:${WS_PORT}`);
	}

    let app             = await import("./app.mjs");
	let styles          = await import("./styles.mjs");
	let designTools     = await import("./designTools.mjs");
	let localStorageMod = await import("./localStorage.mjs");
    
	if (window.location.href.includes("localhost")) {
		ws.addEventListener('message', async (event) => {
			if (event.data.includes("mjs")) {
				const cachebust = "?v=" + (Date.now().toString())
				app             = await import("./app.mjs"          + cachebust);
				styles          = await import("./styles.mjs"       + cachebust);
				designTools     = await import("./designTools.mjs"  + cachebust);
				localStorageMod = await import("./localStorage.mjs" + cachebust);
				app.main(
					app,
					styles,
					designTools,
					localStorageMod
				);
			}
		});
	}

    app.main(
        app,
		styles,
		designTools,
		localStorageMod
    );

})();
