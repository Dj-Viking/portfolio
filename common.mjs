//const 
export const WS_PORT = 5002; 

// can change
export const RUST_VISUAL_ART_DEMO_LINK  = "https://github.com/dj-viking/rust-visual-art";
export const RUST_NEO_PIXEL_DEMO_LINK   = "https://github.com/dj-viking/rust-esp-neopixel";
export const LED_ART_MATRIX_DEMO_LINK   = "https://github.com/dj-viking/led-art-matrix";
export const COBOL_MAINFRAME_DEMO_LINK  = "https://github.com/dj-viking/hello-cobol";

export const ProjectMap = {
	RustVisualArt: {
		name      : "Rust Visual Art",
		ptext     : "Minimal visualizer: MIDI controlled, audio reactive, realtime processing of FFT. Configurable though toml files.",
		demotext  : "Demo",
		href      : RUST_VISUAL_ART_DEMO_LINK,
		video     : true,
		videosrc  : "./videos/bassfunk.mp4",
	},
	RustNeoPixel: {
		name      : "Rust with ESP32 hardware",
		ptext     : "Manually driving GRB neopixels with Rust on ESP32-C6 SOC",
		demotext  : "Demo",
		href      : RUST_NEO_PIXEL_DEMO_LINK,
		video     : true,
		videosrc  : ""
	},
	LEDArtMatrix: {
		name      : "LED Art Matrix",
		ptext     : "TypeScript React project. HTML canvas controlled by midi and audio FFT",
		demotext  : "Demo",
		href      : LED_ART_MATRIX_DEMO_LINK,
		video     : true,
		videosrc  : ""
	},
	COBOLStudy: {
		name      : "COBOL",
		ptext     : "Studying with GNUCobol",
		demotext  : "Code Repository",
		href      : COBOL_MAINFRAME_DEMO_LINK,
		video     : false,
		videosrc  : ""
	}
}
