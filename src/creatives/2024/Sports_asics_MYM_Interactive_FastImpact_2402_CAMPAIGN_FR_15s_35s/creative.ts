import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps } from "@/creative";
import { fastImpactTemplate } from "@creatives/templates/FastImpact";

const MODE_15s = "video_15s";
const MODE_35s = "video_35s";

const mode = MODE_35s;
class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();
		fastImpactTemplate(root, creativeProps, {
			clickUrl:
				"https://www.asics.com/fr/fr-fr/mk/move-your-mind-with-ASICS",
			bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2402_CAMPAIGN_FR_15s_35s/assets/bg.png",
			countdownDuration: 5900,
		});
	}

	public getVideos() {
		return {
			low: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2402_CAMPAIGN_FR_15s_35s/assets/${mode}/video_low.mp4`,
			mid: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2402_CAMPAIGN_FR_15s_35s/assets/${mode}/video_mid.mp4`,
			high: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2402_CAMPAIGN_FR_15s_35s/assets/${mode}/video_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
