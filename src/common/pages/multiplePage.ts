import { Page } from "./page";
import { PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class MultiplePage extends Page {
	private maxNbAnswers: number;
	private answerDivs: HTMLElement[];
	private userAnswers: string[] = [];
	private gotoNextPage: () => void;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		const { name, answers, maxNbAnswers } = pageProps;

		this.maxNbAnswers = parseInt(maxNbAnswers?.toString()) || Infinity;
		this.gotoNextPage = gotoNextPage;

		const answersContainer = createDiv(`answers-container-${name}`, {
			display: "flex",
			position: "absolute",
			width: "90%",
			height: "50%",
			left: "5%",
			top: "22%",
			alignItems: "center",
			justifyContent: "center",
			gap: "7%",
			flexWrap: "wrap",
			backgroundColor: "orchid",
		});
		this.appendChild(answersContainer);

		this.answerDivs = answers.map((answer, i) => {
			const div = createButton(`answer-${name}-${i}`);
			div.addEventListener("click", () => {
				const index = this.userAnswers.indexOf(answer);
				if (index === -1) {
					this.addAnswer(answer);
				} else {
					this.removeAnswer(answer);
				}
				console.log("userAnswers:", this.userAnswers);
			});
			div.innerHTML = answer;
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

	// override the Page's method
	public getNextPageName = () => {
		const { nextPages, answers, nextPage } = this.pageProps;
		if (nextPages && nextPages.length === answers.length) {
			const userAnswer = this.userAnswers[0] || this.pageProps.answers[0];
			return nextPages[answers.indexOf(userAnswer)];
		}
		return nextPage;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-page", MultiplePage);
