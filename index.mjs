import { WS_PORT } from "./common.mjs";

(async () => {
   
	let ws;
	if (window.location.href.includes("localhost")) {
		ws = new WebSocket(`ws://localhost:${WS_PORT}`);
	}

    let app             = await import("./app.mjs");
    let svg             = await import("./svg.mjs");
	let styles          = await import("./styles.mjs");
	let designTools     = await import("./designTools.mjs");
	let localStorageMod = await import("./localStorage.mjs");
	let common          = await import("./common.mjs");
    
	if (window.location.href.includes("localhost")) {
		ws.addEventListener('message', async (event) => {
			if (event.data.includes("mjs")) {
				const cachebust = "?v=" + (Date.now().toString())
				app             = await import("./app.mjs"          + cachebust);
				svg             = await import("./svg.mjs"          + cachebust);
				styles          = await import("./styles.mjs"       + cachebust);
				designTools     = await import("./designTools.mjs"  + cachebust);
				localStorageMod = await import("./localStorage.mjs" + cachebust);
				common          = await import("./common.mjs" + cachebust);
				app.main(
					app,
					common,
					styles,
					designTools,
					localStorageMod,
					svg
				);
			}
		});
	}

    app.main(
        app,
		common,
		styles,
		designTools,
		localStorageMod,
		svg
    );

})();
