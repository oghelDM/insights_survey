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
		this.style.width = "2%";
		this.style.height = "82%";
		this.style.right = "1%";
		this.style.gap = "2%";
		this.style.top = "5%";
		this.style.backgroundColor = "aquamarine";
		// this.style.pointerEvents = type === PAGE_TYPE_CONSENT ? "auto" : "none";

		this.bullets = new Array(nbPages).fill(0).map((_, i) => {
			const bullet = createDiv(`bullet-${i}`, {
				flexBasis: "0",
				flexGrow: "1",
				borderRadius: "50% / 10%",
				backgroundColor: i === 0 ? "gold" : "brown",
				transition: "background-color .3s",
			});
			this.appendChild(bullet);

			return bullet;
		});
		console.log("this.bullets: ", this.bullets);
	}

	public getNbPages = (surveyData: SurveyType): number => {
		const { pages, firstPage } = surveyData;

		let currPage = pages.find((page) => page.name === firstPage);
		let nbPages = 1;

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
		console.log("gotoNextBullet: ", this.currBulletIdx);
		this.bullets[this.currBulletIdx].style.backgroundColor = "gold";
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-bullets", Bullets);
