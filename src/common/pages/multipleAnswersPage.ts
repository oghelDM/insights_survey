import { Page } from "./page";
import { PageType } from "@/creative";
import { createDiv } from "@/utils/divMaker";
import { GREEN, LIGHT_GREEN } from "@/constants";

export class MultipleAnswersPage extends Page {
	private maxNbAnswers: number;
	private boxes: HTMLElement[];
	private userAnswers: string[] = [];
	private gotoNextPage: () => void;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		const { name, answers, maxNbAnswers } = pageProps;

		this.maxNbAnswers = parseInt(maxNbAnswers?.toString()) || Infinity;
		this.gotoNextPage = gotoNextPage;

		const constainer = createDiv(`container-${name}`, {
			position: "absolute",
			width: "80%",
			height: "70%",
			top: "12%",
			left: "12%",
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
			gap: "2vi 4vi",
			flexGrow: "1",
			flexWrap: "wrap",
			// backgroundColor: "green",
		});
		constainer.appendChild(answersContainer);

		this.boxes = answers.map((answer, i) => {
			const div = createDiv(`answer-container-${name}-${i}`, {
				width: "unset",
				height: "6vi",
				flexBasis: "38%",
				flexGrow: "1",
				display: "flex",
				lineHeight: "unset",
				justifyContent: "flex-start",
				alignItems: "center",
				gap: "2vi",
				cursor: "pointer",
				maxWidth: "47%",
				// backgroundColor: "gray",
			});

			const box = createDiv(`answer-box-${name}-${i}`, {
				width: "5vi",
				height: "5vi",
				backgroundColor: LIGHT_GREEN,
				borderRadius: ".7vi",
				flexShrink: "0",
				outline: ".3vi solid white",
			});

			const text = createDiv(`answer-${name}-${i}`, {
				textAlign: "left",
				color: "white",
				fontFamily: "sans-serif",
				fontSize: "2.2vi",
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
			text.innerHTML = answer;
			div.appendChild(box);
			div.appendChild(text);
			answersContainer.appendChild(div);

			return box;
		});
	}

	private addAnswer = (answer: string) => {
		if (this.userAnswers.length < this.maxNbAnswers) {
			this.userAnswers.push(answer);
			const index = this.pageProps.answers.indexOf(answer);
			this.boxes[index].style.backgroundColor = GREEN;
		}
		if (this.maxNbAnswers === this.userAnswers.length) {
			this.gotoNextPage();
		}
	};

	private removeAnswer = (answer: string) => {
		let index = this.userAnswers.indexOf(answer);
		this.userAnswers.splice(index, 1);

		index = this.pageProps.answers.indexOf(answer);
		this.boxes[index].style.backgroundColor = LIGHT_GREEN;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-answers-page", MultipleAnswersPage);
