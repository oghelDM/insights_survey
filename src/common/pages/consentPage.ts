import { Page } from "./page";
import { ImageDM } from "@/image";
import { CreativeProps, PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class ConsentPage extends Page {
	private isBoxChecked = false;

	constructor(
		pageProps: PageType,
		gotoNextPage: () => void,
		creativeProps: CreativeProps
	) {
		super(pageProps);

		const { name, answers } = pageProps;

		const termsContainer = createDiv(`terms-container-${name}`, {
			position: "absolute",
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
			cursor: "pointer",
		});
		const checkBox = new ImageDM(`terms-checkbox-${name}`, "", {
			position: "unset",
			width: "5vw",
			height: "auto",
			aspectRatio: "1 / 1",
			borderRadius: ".6vw",
			outline: ".2vw solid white",
			backgroundColor: "orchid",
		});
		termsContainer.addEventListener("click", () => {
			this.isBoxChecked = !this.isBoxChecked;
			checkBox.style.backgroundColor = this.isBoxChecked
				? "blue"
				: "orchid";
			termsContainer.style.outline = "unset";
			termsContainer.style.backgroundColor = "unset";
		});
		const termsText = createDiv(
			`terms-${name}`,
			{
				textWrap: "nowrap",
				color: "white",
				textAlign: "center",
				fontSize: "2.2vi",
				lineHeight: "2.2vi",
				fontFamily: "Inter,sans-serif",
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
				termsContainer.style.backgroundColor = "rgba(255,0,0,.6)";
			}
		});

		yesBtn.innerHTML = answers[0];
		noBtn.innerHTML = answers[1];

		btnContainer.appendChild(yesBtn);
		btnContainer.appendChild(noBtn);
		this.appendChild(btnContainer);
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-consent-page", ConsentPage);
