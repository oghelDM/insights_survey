import { Page } from "./page";
import { GREEN } from "@/constants";
import { PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class SingleAnswerPage extends Page {
	private userAnswer: string;
	private gotoNextPage: () => void;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		this.skipButton.style.left = "10%";

		const { name, answers } = pageProps;

		this.gotoNextPage = gotoNextPage;

		const constainer = createDiv(`container-${name}`, {
			position: "absolute",
			width: "90%",
			height: "70%",
			left: "10%",
			top: "12%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			// backgroundColor: "beige",
		});
		this.appendChild(constainer);

		const answersContainer = createDiv(`answers-container-${name}`, {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			gap: "2vi 2%",
			flexGrow: "1",
			flexWrap: "wrap",
			// backgroundColor: "orchid",
		});
		constainer.appendChild(answersContainer);

		answers.forEach((answer, i) => {
			const div = createButton(`answer-container-${name}-${i}`, {
				width: "unset",
				height: "6vi",
				flexBasis: "44%",
				flexGrow: "0",
				display: "flex",
				lineHeight: "unset",
				justifyContent: "center",
				alignItems: "center",
			});
			const text = createDiv(`answer-${name}-${i}`, {});
			div.addEventListener("click", () => {
				div.style.backgroundColor = GREEN;
				div.style.color = "white";
				this.userAnswer = answer;
				this.skipButton.style.opacity = "0";
				this.skipButton.style.pointerEvents = "none";
				this.gotoNextPage();
			});
			text.innerHTML = answer;
			div.appendChild(text);
			answersContainer.appendChild(div);
			return div;
		});
	}

	// override the Page's method
	public getNextPageName = () => {
		const { nextPages, answers, nextPage } = this.pageProps;
		console.log(
			"SAP getNextPageName: ",
			nextPages,
			this.userAnswer,
			answers.indexOf(this.userAnswer)
		);
		if (nextPages && nextPages.length === answers.length) {
			const answer = this.userAnswer || answers[0];
			return nextPages[answers.indexOf(answer)];
		}
		return nextPage;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-single-answer-page", SingleAnswerPage);
