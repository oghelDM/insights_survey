import { trackPixel } from "@/utils/helper";
import { VPAIDVideoPlayer } from "@/app/app";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";
import { hotSpotsTemplate } from "@creatives/templates/HotSpots";

const isOpo = true;

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		const clickUrl =
			"https://ad.doubleclick.net/ddm/trackclk/N5648.5074599DAILYMOTIONDISPLAY0/B31559379.388141603;dc_trk_aid=579438090;dc_trk_cid=210641190;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";
		const commonProductProps = {
			cardLeft: "66%",
			cardTop: "16%",
		};

		hotSpotsTemplate(root, creativeProps, {
			clickUrl,
			bgUrl: isOpo
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/bg.png"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/bg.png",
			hotSpotUrl: isOpo
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/hotspot.png"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/hotspot.png",
			products: [
				{
					spotLeft: "85%",
					spotTop: "47%",
					productUrl: isOpo
						? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/product0.png"
						: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/product0.png",
					floodLight: isOpo
						? "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
						: "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					spotLeft: "74%",
					spotTop: "40%",
					productUrl: isOpo
						? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/product1.png"
						: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/product1.png",
					floodLight: isOpo
						? "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
						: "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					spotLeft: "81%",
					spotTop: "38%",
					productUrl: isOpo
						? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/product2.png"
						: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/product2.png",
					floodLight: isOpo
						? "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
						: "https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=renau002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
			],
			cardStyle: { width: "29%", height: "57.4%" },
			hotspotStyle: { width: "3%" },
		});

		const cta = createDiv("cta", {
			position: "absolute",
			width: "22%",
			height: "10%",
			left: "72%",
			top: "76%",
			cursor: "pointer",
			// backgroundColor: "rgba(255, 0, 0, .6)",
		});
		cta.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			trackPixel(
				"https://ad.doubleclick.net/ddm/activity/src=14166143;type=invmedia;cat=click0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
			);
			creativeProps.onClick(clickUrl);
		});
		root.appendChild(cta);
	}

	public getVideos() {
		return {
			low: isOpo
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/video_low.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/video_low.mp4",
			mid: isOpo
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/video_mid.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/video_mid.mp4",
			high: isOpo
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets_opo/video_high.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2401_FR_15s/assets/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
