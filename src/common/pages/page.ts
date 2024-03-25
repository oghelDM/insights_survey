import { PageType } from "@/creative";
import { createDiv } from "@/utils/divMaker";
import { PAGE_TYPE_CONSENT, PAGE_TYPE_SINGLE } from "@/constants";

export class Page extends HTMLElement {
	public pageProps: PageType;

	public nextPageButton: HTMLElement;

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

		// not needed for consent page
		if ([PAGE_TYPE_CONSENT, PAGE_TYPE_SINGLE].includes(type)) {
			return;
		}
		this.nextPageButton = createDiv(`next-page-btn-${name}`, {
			position: "absolute",
			borderRadius: "3px",
			backgroundColor: "gray",
			padding: "8px 4px",
			userSelect: "none",
			cursor: "pointer",
			width: "20%",
			left: "50%",
			top: "80%",
			transform: "translateX(-50%)",
			color: "white",
			textAlign: "center",
			fontSize: "2.2vi",
			lineHeight: "2.2vi",
			fontFamily: "Inter,sans-serif",
		});
		this.nextPageButton.innerHTML = "Continue >";
		this.nextPageButton.addEventListener("click", () => gotoNextPage());
		this.appendChild(this.nextPageButton);
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
