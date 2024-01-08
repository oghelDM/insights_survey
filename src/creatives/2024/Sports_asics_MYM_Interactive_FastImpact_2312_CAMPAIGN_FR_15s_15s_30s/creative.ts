import { VPAIDVideoPlayer } from "@/app/app";
import { CreativeHandler, CreativeProps } from "@/types";
import { fastImpactTemplate } from "@creatives/templates/FastImpact";

const MODE_30s = "video_30s";
const MODE_15s_1 = "video_15s_1";
const MODE_15s_2 = "video_15s_2";

const mode = MODE_15s_2;

const creative: CreativeHandler = (
	root: HTMLElement,
	creativeProps: CreativeProps
) => {
	fastImpactTemplate(root, creativeProps, {
		clickUrl: "https://www.asics.com/fr/fr-fr/mk/move-your-mind-with-ASICS",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2312_CAMPAIGN_FR_15s_15s_30s/assets/bg2.png",
		countdownDuration: 5900,
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2312_CAMPAIGN_FR_15s_15s_30s/assets/${mode}/video_low.mp4`,
		mid: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2312_CAMPAIGN_FR_15s_15s_30s/assets/${mode}/video_mid.mp4`,
		high: `https://statics.dmcdn.net/d/PRODUCTION/2024/Sports_asics_MYM_Interactive_FastImpact_2312_CAMPAIGN_FR_15s_15s_30s/assets/${mode}/video_high.mp4`,
	});
