import { Page } from "./page";
import { ImageDM } from "@/image";
import { CreativeProps, PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";
import { GREEN, LIGHT_GREEN, RED } from "@/constants";

export class ConsentPage extends Page {
	private isBoxChecked = false;

	constructor(
		pageProps: PageType,
		gotoNextPage: () => void,
		creativeProps: CreativeProps
	) {
		super(pageProps, gotoNextPage);

		const { name, answers } = pageProps;

		const termsContainer = createDiv(`terms-container-${name}`, {
			position: "absolute",
			height: "13%",
			left: "50%",
			translate: "-50%",
			top: "35%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "3%",
			borderRadius: "3px",
			padding: "0 12px",
			cursor: "pointer",
			// backgroundColor: "gold",
		});
		const checkBox = new ImageDM(`terms-checkbox-${name}`, "", {
			position: "unset",
			width: "5vw",
			height: "auto",
			aspectRatio: "1 / 1",
			borderRadius: ".6vw",
			outline: `.2vw solid ${LIGHT_GREEN}`,
		});
		termsContainer.addEventListener("click", () => {
			this.isBoxChecked = !this.isBoxChecked;
			this.updateBtnStyle(checkBox, termsContainer, yesBtn);
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
			left: "10%",
			top: "67%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "7%",
			// backgroundColor: "lavender",
		});

		const yesBtn = createButton("consent-yes");
		this.updateBtnStyle(checkBox, termsContainer, yesBtn);
		const noBtn = createButton("consent-no", {
			backgroundColor: "unset",
			border: `.3vi solid ${LIGHT_GREEN}`,
			color: LIGHT_GREEN,
		});
		noBtn.addEventListener("click", () => creativeProps.stopAd());
		yesBtn.addEventListener("click", () => {
			if (this.isBoxChecked) {
				gotoNextPage();
			} else {
				termsContainer.style.backgroundColor = RED;
			}
		});

		yesBtn.innerHTML = answers[0];
		noBtn.innerHTML = answers[1];

		btnContainer.appendChild(noBtn);
		btnContainer.appendChild(yesBtn);
		this.appendChild(btnContainer);
	}

	private updateBtnStyle = (
		checkBox: HTMLElement,
		termsContainer: HTMLElement,
		yesBtn: HTMLElement
	) => {
		checkBox.style.backgroundColor = this.isBoxChecked ? GREEN : "white";
		termsContainer.style.backgroundColor = "unset";

		yesBtn.style.backgroundColor = this.isBoxChecked ? GREEN : LIGHT_GREEN;
		yesBtn.style.border = `.3vi solid ${
			this.isBoxChecked ? GREEN : LIGHT_GREEN
		}`;
		yesBtn.style.color = this.isBoxChecked ? "white" : "black";
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-consent-page", ConsentPage);
