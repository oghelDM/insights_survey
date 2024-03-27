import { GREEN, LIGHT_GREEN } from "@/constants";
import { SurveyType } from "@/creative";
import { createDiv } from "@/utils/divMaker";

export class Bullets extends HTMLElement {
	public bullets: HTMLElement[];
	private currBulletIdx = 0;

	constructor(surveyData: SurveyType) {
		super();

		const nbPages = this.getNbPages(surveyData);
		console.log("Bullets nbPages: ", nbPages);

		this.id = "bullets";
		this.style.position = "absolute";
		this.style.flexDirection = "column";
		this.style.display = "flex";
		this.style.width = "1.4%";
		this.style.height = "76%";
		this.style.right = "1.7%";
		this.style.gap = "2%";
		this.style.top = "5%";
		this.style.transition = "opacity .3s .3s";
		// this.style.backgroundColor = "aquamarine";

		this.bullets = new Array(nbPages).fill(0).map((_, i) => {
			const bullet = createDiv(`bullet-${i}`, {
				flexBasis: "0",
				flexGrow: "1",
				borderRadius: "50% / 8%",
				backgroundColor: i === 0 ? GREEN : LIGHT_GREEN,
				transition: "background-color .6s",
			});
			this.appendChild(bullet);

			return bullet;
		});
		console.log("this.bullets: ", this.bullets);
	}

	public getNbPages = (surveyData: SurveyType): number => {
		const { pages, firstPage } = surveyData;

		let currPage = pages.find((page) => page.name === firstPage);
		let nbPages = 0;

		for (let i = 0; i < 100; i++) {
			const nextPageName = currPage?.nextPages
				? currPage?.nextPages[0]
				: currPage?.nextPage;
			if (nextPageName) {
				nbPages += 1;
				currPage = pages.find((page) => page.name === nextPageName);
			} else {
				break;
			}
		}
		console.log("getNbPages nbPages: ", nbPages);
		return nbPages;
	};

	public gotoNextBullet = () => {
		this.currBulletIdx += 1;
		if (this.currBulletIdx < this.bullets.length) {
			this.bullets[this.currBulletIdx].style.backgroundColor = GREEN;
		}

		if (this.currBulletIdx === this.bullets.length) {
			this.style.opacity = "0";
		}
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-bullets", Bullets);
