import { Page } from "./page";
import { ImageDM } from "@/image";
import { PageType } from "@/creative";
import { createDiv } from "@/utils/divMaker";
import { GREEN, LIGHT_GREEN } from "@/common/constants";

export class RangePage extends Page {
	private isPointerDown = false;

	private rangeContainer: HTMLElement;
	private circle: HTMLElement;
	private valueDiv: HTMLElement;
	private hasUserInteracted = false;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		this.nextPageButton.style.opacity = "0";
		this.nextPageButton.style.pointerEvents = "none";

		const { name, min = 0 } = pageProps;

		this.rangeContainer = createDiv(`range-container-${name}`, {
			position: "absolute",
			width: "80%",
			height: "14%",
			left: "10%",
			top: "40%",
			flexWrap: "wrap",
			cursor: "pointer",
			// backgroundColor: "cadetBlue",
		});
		this.skipButton.style.left = this.rangeContainer.style.left;
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
			pointerEvents: "none",
			backgroundColor: LIGHT_GREEN,
		});
		this.rangeContainer.appendChild(bar);

		this.circle = new ImageDM(
			`circle-${name}`,
			"https://statics.dmcdn.net/d/PRODUCTION/common/assets/insight/arrows.png",
			{
				position: "absolute",
				height: "100%",
				width: "auto",
				aspectRatio: "1 / 1",
				left: "0",
				top: "0",
				borderRadius: "50%",
				pointerEvents: "none",
				backgroundSize: "80%",
				backgroundColor: GREEN,
			}
		);

		this.rangeContainer.appendChild(this.circle);

		this.valueDiv = createDiv(`value-${name}`, {
			position: "absolute",
			height: "13%",
			width: "10%",
			left: "47%",
			top: "20%",
			borderRadius: "2% / 5%",
			pointerEvents: "none",
			backgroundColor: LIGHT_GREEN,
			outline: "2px solid white",
			textAlign: "center",
			fontSize: "6vi",
			color: "black",
			lineHeight: "7vi",
			fontFamily: "sans-serif",
		});
		this.valueDiv.innerHTML = `${min}`;
		this.appendChild(this.valueDiv);
	}

	private moveCursor = (e: PointerEvent) => {
		const { min = 0, max = 1, step = 1 } = this.pageProps;
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

		if (!this.hasUserInteracted) {
			this.hasUserInteracted = true;
			this.nextPageButton.style.opacity = "1";
			this.nextPageButton.style.pointerEvents = "auto";
			this.skipButton.style.opacity = "0";
			this.skipButton.style.pointerEvents = "none";
		}
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-range-page", RangePage);
