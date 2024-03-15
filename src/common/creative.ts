import {
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
} from "./constants";
import { ConsentPage } from "./pages/consentPage";
import { createDiv } from "./utils/divMaker";
import { Page } from "./pages/page";
import { MultiplePage } from "./pages/multiplePage";
import { RangePage } from "./pages/rangePage";
import { isDataCorrupted } from "./utils/dataChecker";

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
	skippable: boolean;
	maxNbAnswers?: number;
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
	public canResumeVideo = true; // allows the creative to prevent the user from resuming the ad through the play button
	public canPauseVideo = true; // allows the creative to prevent the user from pausing the ad through the pause button
	public creativeProps: CreativeProps;

	private currPageName = "";
	private currPage: Page;
	private jsonData: SurveyType;
	private allData;

	constructor(
		root: HTMLElement,
		creativeProps: CreativeProps,
		jsonData: SurveyType
	) {
		super();

		if (isDataCorrupted(jsonData)) {
			return;
		}

		console.log("creative creativeProps: ", creativeProps);
		this.creativeProps = creativeProps;
		this.jsonData = jsonData;

		creativeProps.pauseAd();
		this.canResumeVideo = false;

		this.allData = jsonData.pages.map((p) => {
			const page = p as any as PageType;

			const div = this.makePage(page);
			div.style.opacity = p.name === jsonData.firstPage ? "1" : "0";

			root.appendChild(div);

			const data = { ...page, div };

			return data;
		});
		this.currPage = this.allData.find(
			(data) => data.type === PAGE_TYPE_CONSENT
		)?.div as Page;

		console.log("creative allData: ", this.allData);

		const { firstPage, pages } = jsonData;
		const pageNames = pages.map((page) => page.name);
		const pageNexts = [];
		pages.forEach(({ nextPage, nextPages, name }) => {
			if (nextPage) {
				pageNexts.push(nextPage);
			} else if (nextPages && nextPages.length > 0) {
				pageNexts.push(...nextPages);
			} else {
				// alert(
				// 	`There is an issue with the nextPage(s) for page ${name}`
				// );
			}
		});
	}

	private makePage = (page: PageType) => {
		switch (page.type) {
			case PAGE_TYPE_CONSENT:
				return new ConsentPage(
					page,
					this.creativeProps,
					this.gotoNextPage
				);
			case PAGE_TYPE_MULTIPLE:
				return new MultiplePage(page, this.gotoNextPage);
			case PAGE_TYPE_RANGE:
				return new RangePage(page, this.gotoNextPage);
			default:
				console.warn(`unexpected page type: ${page.type}`);
				return createDiv("default", {});
		}
	};

	public gotoNextPage = () => {
		const nextPageName = this.currPage.getNextPageName();
		console.log("gotoNextPage: ", nextPageName);
		const nextPage = this.allData?.find(
			(data) => data.name === nextPageName
		)?.div as Page;

		this.currPage.style.pointerEvents = "none";
		this.currPage.style.transition = "opacity .3s";
		this.currPage.style.opacity = "0";
		nextPage.style.pointerEvents = "auto";
		nextPage.style.transition = "opacity .3s .3s";
		nextPage.style.opacity = "1";
	};

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
		};
	}

	public videoTimeUpdate(completionPercent: number): void {
		this.creativeProps.pauseAd();
		this.canResumeVideo = false;
		this.canPauseVideo = false;
	}
}
