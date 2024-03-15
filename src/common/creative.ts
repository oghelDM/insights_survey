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

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
		};
	}

	public videoTimeUpdate(completionPercent: number): void {
		this.creativeProps.pauseAd();
		this.canResumeVideo = false;
		this.canPauseVideo = false;
	}

	public videoTimeUpdate(completionPercent: number): void {}
}
