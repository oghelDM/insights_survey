import { PageType } from "@creatives/2024/survey1/creative";
import { Page } from "./page";
import { createButton, createDiv } from "@/utils/divMaker";
import { ImageDM } from "@/image";
import { CreativeProps } from "@/creative";

export class ConsentPage extends Page {
	private isBoxChecked = false;

	constructor(
		pageProps: PageType,
		creativeProps: CreativeProps,
		gotoNextPage: () => void
	) {
		super(pageProps);

		console.log("props: ", pageProps);

		const { name, prompt, answers } = pageProps;

		const termsContainer = createDiv(`terms-container-${name}`, {
			position: "absolute",
			// width: "50%",
			height: "13%",
			left: "50%",
			translate: "-50%",
			top: "22%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "3%",
			backgroundColor: "gold",
			borderRadius: "3px",
			padding: "0 12px",
		});
		const checkBox = new ImageDM("terms-container", "", {
			position: "unset",
			width: "5vw",
			height: "auto",
			aspectRatio: "1 / 1",
			backgroundColor: "yellow",
			cursor: "pointer",
		});
		checkBox.addEventListener("click", () => {
			this.isBoxChecked = !this.isBoxChecked;
			checkBox.style.backgroundColor = this.isBoxChecked
				? "blue"
				: "yellow";
			termsContainer.style.outline = "unset";
		});
		const termsText = createDiv(
			"terms-container",
			{
				backgroundColor: "yellow",
				textWrap: "nowrap",
			},
			"p"
		);
		termsText.innerHTML = "I accept these terms and conditions."; // TODO: put in data.json
		termsContainer.appendChild(checkBox);
		termsContainer.appendChild(termsText);
		this.appendChild(termsContainer);

		const btnContainer = createDiv("btn-container", {
			position: "absolute",
			width: "80%",
			height: "33%",
			left: "10%",
			top: "42%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "3%",
			backgroundColor: "lavender",
		});

		const yesBtn = createButton("consent-yes");
		const noBtn = createButton("consent-no");
		noBtn.addEventListener("click", () => creativeProps.stopAd());
		yesBtn.addEventListener("click", () => {
			if (this.isBoxChecked) {
				gotoNextPage();
			} else {
				termsContainer.style.outline = "2px solid red";
			}
		});

		yesBtn.innerHTML = answers[0];
		noBtn.innerHTML = answers[1];

		btnContainer.appendChild(yesBtn);
		btnContainer.appendChild(noBtn);
		this.appendChild(btnContainer);
	}

	public getNextPageName = () => this.pageProps.nextPage;
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-consent-page", ConsentPage);
