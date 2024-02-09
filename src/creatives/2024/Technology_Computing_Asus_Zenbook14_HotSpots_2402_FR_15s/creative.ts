import { VPAIDVideoPlayer } from "@/app/app";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";
import { hotSpotsTemplate } from "@creatives/templates/HotSpots";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		const clickUrl = "https://track.adform.net/C/?bn=71461883";
		const commonProductProps = {
			hotSpotUrl:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/hotspot.png",
			cardLeft: "66.5%",
			cardTop: "10%",
		};

		hotSpotsTemplate(root, creativeProps, {
			clickUrl,
			bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/bg.png",
			products: [
				{
					productUrl:
						"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/product0.png",
					spotLeft: "79%",
					spotTop: "55%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=14166143;type=invmedia;cat=click002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					productUrl:
						"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/product1.png",
					spotLeft: "89%",
					spotTop: "29%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=14166143;type=invmedia;cat=click001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					productUrl:
						"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/product2.png",
					spotLeft: "85%",
					spotTop: "57%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=14166143;type=invmedia;cat=click00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
				{
					productUrl:
						"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/product3.png",
					spotLeft: "74%",
					spotTop: "41%",
					floodLight:
						"https://ad.doubleclick.net/ddm/activity/src=14166143;type=invmedia;cat=click000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					...commonProductProps,
				},
			],
			cardStyle: { width: "35%", height: "57.4%" },
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
			creativeProps.onClick(clickUrl);
		});
		root.appendChild(cta);
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
