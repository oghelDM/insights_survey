import { VPAIDVideoPlayer } from "@app";
import { Split } from "@/components/Split";
import { Creative, CreativeProps } from "@/creative";

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const split = new Split({
			id: "idxMngrDM",
			leftImageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/miraculous_1.png",
			rightImageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/miraculous_2.png",
			debug: false,
			originalPosition: 33,
			clickUrl: "https://www.google.com/search?q=split",
			onClick,
		});
		root.appendChild(split);
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
