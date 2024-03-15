import { PageType } from "@/creative";
import { Page } from "./page";
import { createDiv } from "@/utils/divMaker";

export class RangePage extends Page {
	private isPointerDown = false;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps);

		const { name, min = 0, max = 1, step = 1 } = pageProps;
		const nbSteps = (max - min) / step + 1;

		const rangeContainer = createDiv(`range-container-${name}`, {
			position: "absolute",
			width: "90%",
			height: "10%",
			left: "5%",
			top: "32%",
			backgroundColor: "cadetBlue",
			flexWrap: "wrap",
			cursor: "pointer",
		});
		rangeContainer.addEventListener("pointerdown", (e) => {
			this.isPointerDown = true;
		});
		rangeContainer.addEventListener("pointermove", (e) => {
			if (!this.isPointerDown) {
				return;
			}
			const containerRect = rangeContainer.getBoundingClientRect();
			const circleRect = circle.getBoundingClientRect();
			let x = (e.offsetX - circleRect.width / 2) / containerRect.width;
			const xmin = 0;
			const xmax =
				(containerRect.width - circleRect.width) / containerRect.width;
			x = Math.min(Math.max(x, xmin), xmax);

			const xStep = (xmax - xmin) / (nbSteps - 1);
			const qqq = Math.round(x / xStep);

			x = xmin + qqq * xStep;
			x = Math.min(Math.max(x, xmin), xmax);
			circle.style.left = `${x * 100}%`;

			let value = parseFloat(min.toString()) + qqq * step;
			value = Math.min(Math.max(value, min), max);
			valueDiv.innerHTML = `${value}`;
		});
		rangeContainer.addEventListener("pointerup", (e) => {
			this.isPointerDown = false;
		});
		this.appendChild(rangeContainer);

		const bar = createDiv(`bar-${name}`, {
			position: "absolute",
			width: "100%",
			height: "20%",
			left: "0",
			top: "40%",
			borderRadius: ".8% / 50%",
			backgroundColor: "aquamarine",
			pointerEvents: "none",
		});
		rangeContainer.appendChild(bar);

		const circle = createDiv(`circle-${name}`, {
			position: "absolute",
			height: "100%",
			width: "auto",
			aspectRatio: "1 / 1",
			left: "0",
			top: "0",
			borderRadius: "50%",
			pointerEvents: "none",
			backgroundColor: "khaki",
		});
		rangeContainer.appendChild(circle);

		const valueDiv = createDiv(`value-${name}`, {
			position: "absolute",
			height: "10%",
			width: "6%",
			left: "47%",
			top: "10%",
			borderRadius: "2% / 5%",
			pointerEvents: "none",
			backgroundColor: "orchid",
			outline: "2px solid white",
			textAlign: "center",
			fontSize: "4vw",
			color: "white",
			lineHeight: "5vw",
		});
		valueDiv.innerHTML = `${min}`;
		this.appendChild(valueDiv);
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-range-page", RangePage);
