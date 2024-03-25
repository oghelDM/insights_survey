import {
	GREEN,
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_END,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
} from "@/constants";
import { PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class Page extends HTMLElement {
	public pageProps: PageType;

	public nextPageButton: HTMLElement;
	public skipButton: HTMLElement;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super();

		this.pageProps = pageProps;
		const { name, prompt, type } = pageProps;
		console.log("Page: ", name);
		this.id = `${name}-page-id`;
		this.style.position = "absolute";
		this.style.flexDirection = "column";
		this.style.display = "flex";
		this.style.width = "96%";
		this.style.height = "92%";
		this.style.left = "2%";
		this.style.top = "4%";
		this.style.pointerEvents = "none";
		this.style.transition = "opacity .3s .3s";
		// this.style.backgroundColor = "purple";

		const promptDiv = createDiv(
			`${name}-prompt-id`,
			{
				left: "0",
				top: "0",
				margin: "0",
				color: "white",
				textAlign: "center",
				fontSize: "3.2vi",
				lineHeight: "3.2vi",
				padding: "2vi",
				fontFamily: "Inter,sans-serif",
			},
			"p"
		);
		promptDiv.innerHTML = prompt;
		this.appendChild(promptDiv);

		if (![PAGE_TYPE_CONSENT, PAGE_TYPE_END].includes(type)) {
			this.skipButton = createDiv(`next-page-btn-${name}`, {
				position: "absolute",
				userSelect: "none",
				cursor: "pointer",
				width: "20%",
				left: "50%",
				top: "70%",
				color: "white",
				fontSize: "2.2vi",
				fontFamily: "sans-serif",
				padding: "2vi 0",
				zIndex: "2",
				transition: "opacity .3s",
				// backgroundColor: "plum",
			});
			this.skipButton.innerHTML = "Skip question >";
			this.skipButton.addEventListener("click", () => gotoNextPage());
			this.appendChild(this.skipButton);
		}

		if (
			[PAGE_TYPE_MULTIPLE, PAGE_TYPE_RANGE, PAGE_TYPE_END].includes(type)
		) {
			this.nextPageButton = createButton(`next-page-btn-${name}`, {
				backgroundColor: GREEN,
				position: "absolute",
				width: "30%",
				left: "54%",
				top: "69%",
				lineHeight: "3vi",
			});
			this.nextPageButton.innerHTML = "Continue >";
			this.nextPageButton.addEventListener("click", () => gotoNextPage());
			this.appendChild(this.nextPageButton);
		}
	}

	public getNextPageName = () => this.pageProps.nextPage;

	public show = () => {
		this.style.pointerEvents = "auto";
		this.style.opacity = "1";
	};

	public hide = () => {
		this.style.pointerEvents = "none";
		this.style.opacity = "0";
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-page", Page);
