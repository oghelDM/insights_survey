import { createDiv } from "@/utils/divMaker";
import { PAGE_TYPE_CONSENT } from "@/constants";
import { PageType } from "@creatives/2024/survey1/creative";

export class Page extends HTMLElement {
	constructor(props: PageType) {
		super();

		const { name, prompt, type } = props;
		console.log("Page: ", name);
		this.id = `${name}-page-id`;
		this.style.position = "absolute";
		this.style.flexDirection = "column";
		this.style.display = "flex";
		this.style.width = "96%";
		this.style.height = "92%";
		this.style.left = "2%";
		this.style.top = "4%";
		this.style.backgroundColor = "purple";
		this.style.pointerEvents = type === PAGE_TYPE_CONSENT ? "auto" : "none";

		const promptDiv = createDiv(
			`${name}-prompt-id`,
			{
				left: "0",
				top: "0",
				margin: "0",
				color: "white",
				textAlign: "center",
			},
			"p"
		);
		promptDiv.innerHTML = prompt;
		this.appendChild(promptDiv);
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-page", Page);
