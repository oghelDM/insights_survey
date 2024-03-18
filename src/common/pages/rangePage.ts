import { Page } from "./page";
import { PageType } from "@/creative";
import { createDiv } from "@/utils/divMaker";

export class RangePage extends Page {
	private isPointerDown = false;

	private rangeContainer: HTMLElement;
	private circle: HTMLElement;
	private valueDiv: HTMLElement;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		const { name, min = 0, max = 1, step = 1 } = pageProps;
		const nbSteps = (max - min) / step + 1;

		this.rangeContainer = createDiv(`range-container-${name}`, {
			position: "absolute",
			width: "90%",
			height: "10%",
			left: "5%",
			top: "32%",
			backgroundColor: "cadetBlue",
			flexWrap: "wrap",
			cursor: "pointer",
		});
		this.rangeContainer.addEventListener("pointerdown", (e) => {
			this.isPointerDown = true;
			this.moveCursor(e);
		});
		this.rangeContainer.addEventListener("pointermove", (e) => {
			if (!this.isPointerDown) {
				return;
			}
			this.moveCursor(e);
		});
		this.rangeContainer.addEventListener(
			"pointerup",
			() => (this.isPointerDown = false)
		);
		this.appendChild(this.rangeContainer);

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
		this.rangeContainer.appendChild(bar);

		this.circle = createDiv(`circle-${name}`, {
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
		this.rangeContainer.appendChild(this.circle);

		this.valueDiv = createDiv(`value-${name}`, {
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
		this.valueDiv.innerHTML = `${min}`;
		this.appendChild(this.valueDiv);
	}

	private moveCursor = (e: PointerEvent) => {
		const { name, min = 0, max = 1, step = 1 } = this.pageProps;
		const nbSteps = (max - min) / step + 1;

		const containerRect = this.rangeContainer.getBoundingClientRect();
		const circleRect = this.circle.getBoundingClientRect();
		let x = (e.offsetX - circleRect.width / 2) / containerRect.width;
		const xmin = 0;
		const xmax =
			(containerRect.width - circleRect.width) / containerRect.width;
		x = Math.min(Math.max(x, xmin), xmax);

		const xStep = (xmax - xmin) / (nbSteps - 1);
		const qqq = Math.round(x / xStep);

		x = xmin + qqq * xStep;
		x = Math.min(Math.max(x, xmin), xmax);
		this.circle.style.left = `${x * 100}%`;

		let value = parseFloat(min.toString()) + qqq * step;
		value = Math.min(Math.max(value, min), max);
		this.valueDiv.innerHTML = `${value}`;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-range-page", RangePage);
