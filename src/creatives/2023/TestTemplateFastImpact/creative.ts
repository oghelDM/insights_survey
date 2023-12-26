import { VPAIDVideoPlayer } from "@/app/app";
import { CreativeHandler, CreativeProps } from "@/types";
import { fastImpactTemplate } from "@creatives/templates/FastImpact";

const creative: CreativeHandler = (
	root: HTMLElement,
	creativeProps: CreativeProps
) => {
	fastImpactTemplate(root, creativeProps, {
		clickUrl: "https://www.yellohvillage.fr",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/bg.png",
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, [
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_low.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_mid.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_high.mp4",
	]);
