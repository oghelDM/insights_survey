import { PageType } from "@creatives/2024/survey1/creative";
import { Page } from "./page";
import { createDiv } from "@/utils/divMaker";

export class MultiplePage extends Page {
	private userAnswers: string[] = [];
	private answers: string[];
	private maxNbAnswers: number;
	private answerDivs: HTMLElement[];

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps);

		const { name, answers, maxNbAnswers } = pageProps;

		this.answers = answers;
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
			backgroundColor: "gold",
			flexWrap: "wrap",
		});
		this.appendChild(answersContainer);

		this.answerDivs = answers.map((answer, i) => {
			const div = createDiv(`answer-${name}-${i}`, {
				borderRadius: "3px",
				backgroundColor: "gray",
				padding: "8px 4px",
				userSelect: "none",
				cursor: "pointer",
				// flexBasis: "40%",
				// flexGrow: "1",
				// flex: "1 0 40%",
				textAlign: "center",
				width: "40%",
			});
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
			this.answerDivs[index2].style.backgroundColor = "beige";
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
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-page", MultiplePage);
