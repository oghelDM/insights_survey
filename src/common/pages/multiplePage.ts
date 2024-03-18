import { Page } from "./page";
import { PageType } from "@/creative";
import { createButton, createDiv } from "@/utils/divMaker";

export class MultiplePage extends Page {
	private maxNbAnswers: number;
	private answerDivs: HTMLElement[];
	private userAnswers: string[] = [];

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		const { name, answers, maxNbAnswers } = pageProps;

		this.maxNbAnswers = maxNbAnswers || 0;

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
		this.userAnswers.push(answer);
		const index2 = this.answerDivs
			.map((div) => div.innerHTML)
			.indexOf(answer);
		if (index2 >= 0) {
			this.answerDivs[index2].style.backgroundColor = "peachpuff";
		}
		if (
			this.maxNbAnswers > 0 &&
			this.maxNbAnswers < this.userAnswers.length
		) {
			this.removeAnswer(this.userAnswers[0]);
		}
	};

	private removeAnswer = (answer: string) => {
		const index = this.userAnswers.indexOf(answer);
		console.log("removeAnswer: ", answer, index);
		if (index >= 0) {
			this.userAnswers.splice(index, 1);
		}

		const index2 = this.answerDivs
			.map((div) => div.innerHTML)
			.indexOf(answer);
		if (index2 >= 0) {
			this.answerDivs[index2].style.backgroundColor = "gray";
		}
	};

	public getNextPageName = () => {
		const { nextPages, answers, nextPage } = this.pageProps;
		if (nextPages && nextPages.length === answers.length) {
			const userAnswer = this.userAnswers[0];
			return nextPages[answers.indexOf(userAnswer)];
		}
		return nextPage;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-page", MultiplePage);
