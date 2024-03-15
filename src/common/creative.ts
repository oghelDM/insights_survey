import { PageType, SurveyType } from "@creatives/2024/survey1/creative";
import {
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
} from "./constants";
import { Consent } from "./pages/consent";
import { createDiv } from "./utils/divMaker";

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
	private jsonData: SurveyType;

	constructor(
		root: HTMLElement,
		creativeProps: CreativeProps,
		jsonData: SurveyType
	) {
		super();

		console.log("creative creativeProps: ", creativeProps);
		this.creativeProps = creativeProps;
		this.jsonData = jsonData;

		creativeProps.pauseAd();
		this.canResumeVideo = false;

		console.log("creative jsonData: ", jsonData);

		const allData = jsonData.pages.map((p) => {
			const page = p as any as PageType;

			const div = this.makePage(page);
			div.style.opacity = p.name === jsonData.firstPage ? "1" : "0";

			root.appendChild(div);

			const data = { ...page, div };

			return data;
		});
		this.currPageName = jsonData.firstPage;

		console.log("creative allData: ", allData);

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
		if (!pageNames.includes(firstPage)) {
			alert(
				`There is an issue with the first page name (${firstPage}): it cannot be found in the provided pages`
			);
		}
	}

	private makePage = (page: PageType) => {
		switch (page.type) {
			case PAGE_TYPE_CONSENT:
				return new Consent(page, this.creativeProps, this.gotoNextPage);
			default:
			case PAGE_TYPE_MULTIPLE:
			case PAGE_TYPE_RANGE:
				return createDiv("default", {});
		}
	};

	public gotoNextPage = () => {
		const nextPageName = this.jsonData.pages.find(
			(page) => page.name === this.currPageName
		)?.nextPage;
		console.log("gotoNextPage: ", nextPageName);
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
