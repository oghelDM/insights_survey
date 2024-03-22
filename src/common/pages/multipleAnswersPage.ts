import { Page } from "./page";
import { PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class MultipleAnswersPage extends Page {
	private maxNbAnswers: number;
	private answerDivs: HTMLElement[];
	private userAnswers: string[] = [];
	private gotoNextPage: () => void;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		const { name, answers, maxNbAnswers } = pageProps;

		this.maxNbAnswers = parseInt(maxNbAnswers?.toString()) || Infinity;
		this.gotoNextPage = gotoNextPage;

		const constainer = createDiv(`container-${name}`, {
			position: "absolute",
			width: "100%",
			height: "70%",
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
			justifyContent: "center",
			gap: "1.2vi",
			flexGrow: "1",
			flexWrap: "wrap",
			// backgroundColor: "orchid",
		});
		constainer.appendChild(answersContainer);

		this.answerDivs = answers.map((answer, i) => {
			const div = createButton(`answer-${name}-${i}`, {
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
				const index = this.userAnswers.indexOf(answer);
				if (index === -1) {
					this.addAnswer(answer);
				} else {
					this.removeAnswer(answer);
				}
				console.log("userAnswers:", this.userAnswers);
			});
			text.innerHTML = answer;
			div.appendChild(text);
			answersContainer.appendChild(div);
			return div;
		});
	}

	private addAnswer = (answer: string) => {
		if (this.userAnswers.length < this.maxNbAnswers) {
			this.userAnswers.push(answer);
			const index = this.answerDivs
				.map((div) => div.innerHTML)
				.indexOf(answer);
			this.answerDivs[index].style.backgroundColor = "peachpuff";
		}
		if (this.maxNbAnswers === this.userAnswers.length) {
			this.gotoNextPage();
		}
	};

	private removeAnswer = (answer: string) => {
		let index = this.userAnswers.indexOf(answer);
		this.userAnswers.splice(index, 1);

		index = this.answerDivs.map((div) => div.innerHTML).indexOf(answer);
		this.answerDivs[index].style.backgroundColor = "gray";
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-answers-page", MultipleAnswersPage);
