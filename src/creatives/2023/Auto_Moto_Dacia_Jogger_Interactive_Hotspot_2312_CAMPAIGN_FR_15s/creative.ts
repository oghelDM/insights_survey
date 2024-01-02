import { VPAIDVideoPlayer } from "@/app/app";
import { CreativeHandler, CreativeProps } from "@/types";
import { hotSpotsTemplate } from "@creatives/templates/HotSpots";

const creative: CreativeHandler = (
	root: HTMLElement,
	creativeProps: CreativeProps
) => {
	const clickUrl =
		"https://ad.doubleclick.net/ddm/trackclk/N5648.5074599DAILYMOTIONDISPLAY0/B31270383.384833905;dc_trk_aid=575852239;dc_trk_cid=207430081;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";
	const commonProductProps = {
		hotSpotUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/hotspot.png",
		cardLeft: "66%",
		cardTop: "16%",
	};

	hotSpotsTemplate(root, creativeProps, {
		clickUrl,
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/bg.png",
		products: [
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/product0.png",
				spotLeft: "65%",
				spotTop: "42%",
				...commonProductProps,
			},
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/product1.png",
				spotLeft: "82%",
				spotTop: "37%",
				...commonProductProps,
			},
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/product2.png",
				spotLeft: "63%",
				spotTop: "28%",
				...commonProductProps,
			},
		],
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/video_high.mp4",
	});
