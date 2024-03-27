import {
	BLUE,
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_END,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
	PAGE_TYPE_SINGLE,
} from "./constants";
import { Page } from "./pages/page";
import { EndPage } from "./pages/endPage";
import { createDiv } from "./utils/divMaker";
import { RangePage } from "./pages/rangePage";
import { Bullets } from "./components/bullets";
import { ConsentPage } from "./pages/consentPage";
import { isDataCorrupted } from "./utils/dataChecker";
import { SingleAnswerPage } from "./pages/singleAnswersPage";
import { MultipleAnswersPage } from "./pages/multipleAnswersPage";

export interface SurveyType {
	name: string;
	firstPage: string;
	pages: PageType[];
}

export interface PageType {
	name: string;
	type: string;
	prompt: string;
	answers: string[];
	nextPage: string;
	maxNbAnswers: number;
	randomize?: boolean;
	nextPages?: string[];
	min?: number;
	max?: number;
	step?: number;
}

export interface CreativeProps {
	videoSlot: HTMLVideoElement;
	onClick: (url: string) => void;
	stopAd: () => void;
	pauseAd: () => void;
	resumeAd: () => void;
	setAdVolume: (volume: number) => void;
}

export class Creative extends HTMLElement {
	public canResumeVideo = false; // allows the creative to prevent the user from resuming the ad through the play button
	public canPauseVideo = false; // allows the creative to prevent the user from pausing the ad through the pause button
	public creativeProps: CreativeProps;

	private currPage: Page;
	private allData;
	private bullets: Bullets;
	private alreadyPaused = false;

	constructor(
		root: HTMLElement,
		creativeProps: CreativeProps,
		jsonData: SurveyType
	) {
		super();

		const errorMessage = isDataCorrupted(jsonData);
		if (errorMessage) {
			alert(errorMessage);
			return;
		}

		root.style.backgroundColor = BLUE;
		// root.style.backgroundImage = "url()";
		root.style.transition = "background 1.3s .3s";

		console.log("creative creativeProps: ", creativeProps);
		this.creativeProps = creativeProps;

		this.canResumeVideo = false;

		this.allData = jsonData.pages.map((p) => {
			const page = p as any as PageType;

			const div = this.makePage(page);
			div.style.opacity = p.name === jsonData.firstPage ? "1" : "0";
			div.style.pointerEvents =
				p.name === jsonData.firstPage ? "auto" : "none";

			root.appendChild(div);

			const data = { ...page, div };

			return data;
		});
		console.log("creative allData: ", this.allData);
		this.currPage = this.allData.find(
			(data) => data.name === jsonData.firstPage
		)?.div as Page;

		this.bullets = new Bullets(jsonData);
		root.appendChild(this.bullets);
	}

	private makePage = (page: PageType) => {
		switch (page.type) {
			case PAGE_TYPE_CONSENT:
				return new ConsentPage(
					page,
					this.gotoNextPage,
					this.creativeProps
				);
			case PAGE_TYPE_SINGLE:
				return new SingleAnswerPage(page, this.gotoNextPage);
			case PAGE_TYPE_MULTIPLE:
				return new MultipleAnswersPage(page, this.gotoNextPage);
			case PAGE_TYPE_RANGE:
				return new RangePage(page, this.gotoNextPage);
			case PAGE_TYPE_END:
				return new EndPage(page, this.creativeProps.stopAd);
			default:
				console.warn(`unexpected page type: ${page.type}`);
				return createDiv("default", {});
		}
	};

	public gotoNextPage = () => {
		this.bullets.gotoNextBullet();

		const nextPageName = this.currPage.getNextPageName();
		console.log("gotoNextPage: ", nextPageName);
		const nextPage = this.allData?.find(
			(data) => data.name === nextPageName
		)?.div as Page;

		nextPage.show();
		this.currPage.hide();

		this.currPage = nextPage;
	};

	public videoTimeUpdate(percentPlayed: number): void {
		if (!this.alreadyPaused && percentPlayed > 3) {
			this.canResumeVideo = true;
			this.canPauseVideo = true;
			this.creativeProps.pauseAd();
			this.canResumeVideo = false;
			this.canPauseVideo = false;
			this.alreadyPaused = true;
		}
	}

	public getVideos = () => ({
		low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
	});
}
