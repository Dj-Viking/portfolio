import { WS_PORT } from "./common.mjs";

(async () => {
   
	let ws;
	if (window.location.href.includes("localhost")) {
		ws = new WebSocket(`ws://localhost:${WS_PORT}`);
	}

    let app = await import("./app.mjs");
    
	if (window.location.href.includes("localhost")) {
		ws.addEventListener('message', async (event) => {
			if (event.data.includes("mjs")) {
				const cachebust = "?v=" + (Date.now().toString())
				app = await import("./app.mjs" + cachebust);
				app.main(
					app,
				);
			}
		});
	}

    app.main(
        app,
    );

})();
