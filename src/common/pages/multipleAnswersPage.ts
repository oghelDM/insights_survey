import { Page } from "./page";
import { PageType } from "@/creative";
import { createDiv } from "@/utils/divMaker";
import { shuffleArray } from "@/utils/helper";
import { GREEN, LIGHT_GREEN } from "@/common/constants";

export class MultipleAnswersPage extends Page {
	private maxNbAnswers: number;
	private boxes: HTMLElement[];
	private userAnswers: string[] = [];
	private gotoNextPage: () => void;

	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		this.toggleNextBageButton();

		const { name, answers, maxNbAnswers, randomize } = pageProps;

		this.maxNbAnswers = parseInt(maxNbAnswers?.toString()) || Infinity;
		this.gotoNextPage = gotoNextPage;

		const constainer = createDiv(`container-${name}`, {
			position: "absolute",
			width: "74%",
			height: "60%",
			top: "12%",
			left: "18%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			// backgroundColor: "beige",
		});
		this.appendChild(constainer);
		this.skipButton.style.left = constainer.style.left;

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

		const shuffledAnswers = randomize
			? shuffleArray([...answers])
			: answers;
		this.boxes = shuffledAnswers.map((answer, i) => {
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
					this.addAnswer(answer, i);
				} else {
					this.removeAnswer(answer, i);
				}
			});
			text.innerHTML = answer;
			div.appendChild(box);
			div.appendChild(text);
			answersContainer.appendChild(div);

			return box;
		});
	}

	private toggleNextBageButton = () => {
		const displayNextPageBtn =
			this.userAnswers.length > 0 &&
			this.userAnswers.length < this.maxNbAnswers;
		this.nextPageButton.style.opacity = displayNextPageBtn ? "1" : "0";
		this.nextPageButton.style.pointerEvents = displayNextPageBtn
			? "auto"
			: "none";
		const displaySkipBtn = this.userAnswers.length > 0;
		this.skipButton.style.opacity = displaySkipBtn ? "0" : "1";
		this.skipButton.style.pointerEvents = displaySkipBtn ? "none" : "auto";
	};

	private addAnswer = (answer: string, boxIndex: number) => {
		if (this.userAnswers.length < this.maxNbAnswers) {
			this.userAnswers.push(answer);
			this.boxes[boxIndex].style.backgroundColor = GREEN;
		}
		if (this.maxNbAnswers === this.userAnswers.length) {
			this.gotoNextPage();
		}
		this.toggleNextBageButton();
	};

	private removeAnswer = (answer: string, boxIndex: number) => {
		let index = this.userAnswers.indexOf(answer);
		this.userAnswers.splice(index, 1);

		this.boxes[boxIndex].style.backgroundColor = LIGHT_GREEN;
		this.toggleNextBageButton();
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple-answers-page", MultipleAnswersPage);
