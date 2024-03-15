import { SurveyType } from "@creatives/2024/survey1/creative";

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

	private creativeProps: CreativeProps;
	constructor(creativeProps: CreativeProps, jsonData: SurveyType) {
		super();

		this.creativeProps = creativeProps;

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
