import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps } from "@/creative";
import { hotSpotsTemplate } from "@creatives/templates/HotSpots";

const prefixUrl =
	"https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2402_FR_15s/assets/v1/";
const clickUrl =
	"https://ad.doubleclick.net/ddm/trackclk/N5648.5074599DAILYMOTIONDISPLAY0/B31626447.389151874;dc_trk_aid=580620240;dc_trk_cid=211534146;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();
		const commonProductProps = {
			cardLeft: "66%",
			cardTop: "13%",
		};

		hotSpotsTemplate(root, creativeProps, {
			clickUrl,
			bgUrl: `${prefixUrl}bg.png`,
			hotSpotUrl: `${prefixUrl}hotspot.png`,
			products: [
				{
					productUrl: `${prefixUrl}product0.png`,
					spotLeft: "76%",
					spotTop: "34%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=863720;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					productUrl: `${prefixUrl}product1.png`,
					spotLeft: "88%",
					spotTop: "42%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=86372000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					productUrl: `${prefixUrl}product2.png`,
					spotLeft: "81%",
					spotTop: "45%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=13694661;type=invmedia;cat=8637200;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
			],
			cardStyle: { width: "36%", height: "61%", left: "65%", top: "11%" },
		});
	}

	public getVideos() {
		return {
			low: `${prefixUrl}video_low.mp4`,
			mid: `${prefixUrl}video_mid.mp4`,
			high: `${prefixUrl}video_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
