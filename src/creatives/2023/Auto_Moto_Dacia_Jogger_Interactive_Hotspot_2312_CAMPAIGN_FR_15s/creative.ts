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
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/bg.png",
		products: [
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/product0.png",
				spotLeft: "76%",
				spotTop: "34%",
				floodLight:
					"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				...commonProductProps,
			},
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/product1.png",
				spotLeft: "75%",
				spotTop: "47%",
				floodLight:
					"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				...commonProductProps,
			},
			{
				productUrl:
					"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/product2.png",
				spotLeft: "84%",
				spotTop: "42%",
				floodLight:
					"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				...commonProductProps,
			},
		],
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2312_CAMPAIGN_FR_15s/assets/v2/video_high.mp4",
	});
