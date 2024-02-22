import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps } from "@/creative";
import { fastImpactTemplate } from "@creatives/templates/FastImpact";

const MODE_15s = "video_15s";
const MODE_35s = "video_35s";

const mode = MODE_15s;
class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();
		fastImpactTemplate(root, creativeProps, {
			clickUrl:
				"https://ad.doubleclick.net/ddm/trackclk/N828534.132420DAILYMOTION/B31060900.387469772;dc_trk_aid=578876881;dc_trk_cid=210153639;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
			bgUrl:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2402_CAMPAIGN_FR_15s_35s/assets/bg.png",
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
