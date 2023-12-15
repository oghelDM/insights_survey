import { ComponentBaseType } from "../../types";
import { image, svgContent } from "./mosaicSVG";

export class SafariFilter extends HTMLElement {
	constructor(targetID: string, tileSize: number, sigmaGauss: number) {
		super();

		this.setAttribute("id", "id"); // TODO
		const actualStyle = {
			display: "block",
			position: "absolute",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			backgroundColor: "#00ff0088",
			overflow: "hidden",
		};

		for (const [key, value] of Object.entries(actualStyle)) {
			this.style[key] = value;
		}

		/////////////////
		/////////////////
		tileSize = tileSize < 1 ? 1 : tileSize;
		sigmaGauss = sigmaGauss < 1 ? 1 : sigmaGauss;

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// only to make the output visible
		// document.body.appendChild(canvas);

		const rows = canvas.height / tileSize;
		const cols = canvas.width / tileSize;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				ctx.fillStyle = "white";

				ctx.fillRect(
					c * tileSize - 1 + Math.floor(tileSize / 2),
					r * tileSize - 1 + Math.floor(tileSize / 2),
					1,
					1
				);
			}
		}

		const pixelate = document.getElementById("pixelate");
		pixelate.innerHTML = "";

		const blur = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"feGaussianBlur"
		);
		blur.setAttribute("in", "SourceGraphic");
		blur.setAttribute("stdDeviation", `${sigmaGauss}`);
		blur.setAttribute("result", "blurred");

		const hmap = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"feImage"
		);
		const hmapUrl = canvas.toDataURL();
		hmap.setAttribute("href", hmapUrl);
		hmap.setAttribute("result", "hmap");

		const blend = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"feBlend"
		);
		// blend.setAttribute("mode", "lighten");
		blend.setAttribute("mode", "multiply");
		blend.setAttribute("in", "blurred");
		blend.setAttribute("in2", "hmap");

		const morph = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"feMorphology"
		);
		morph.setAttribute("operator", "dilate");
		morph.setAttribute("radius", `${tileSize / 2}`);

		pixelate.setAttribute("width", `${canvas.width}`);
		pixelate.setAttribute("height", `${canvas.height}`);
		pixelate.appendChild(blur);
		pixelate.appendChild(hmap);
		pixelate.appendChild(blend);
		pixelate.appendChild(morph);
		/////////////////
		/////////////////
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-safari", SafariFilter);
