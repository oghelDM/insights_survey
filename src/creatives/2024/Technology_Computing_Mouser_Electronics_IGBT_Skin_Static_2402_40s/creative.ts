import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const ALL_DATA = {
	igbt: {
		clickUrlLeft:
			"https://www.youtube.com/watch?v=bCNJPY2h2dY&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-igbt-fr",
		clickUrlRight:
			"https://ad.doubleclick.net/ddm/trackclk/N30602.132420DAILYMOTION1/B22225739.389975457;dc_trk_aid=581206578;dc_trk_cid=211962573;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightLeft:
			"https://ad.doubleclick.net/ddm/activity/src=14291983;type=invmedia;cat=mouse00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		floodlighRight:
			"https://ad.doubleclick.net/ddm/activity/src=14291983;type=invmedia;cat=mouse0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		assetPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Mouser_Electronics_IGBT_Skin_Static_2402_40s/assets/igbt_1/",
	},
	fusion: {
		clickUrlLeft:
			"https://www.youtube.com/watch?v=4aWEA-IYsyM&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-sensor-fusion-fr",
		clickUrlRight:
			"https://ad.doubleclick.net/ddm/trackclk/N30602.132420DAILYMOTION1/B22223452.390035343;dc_trk_aid=581261523;dc_trk_cid=212006505;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightLeft:
			"https://ad.doubleclick.net/ddm/activity/src=14291983;type=invmedia;cat=mouse001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		floodlighRight:
			"https://ad.doubleclick.net/ddm/activity/src=14291983;type=invmedia;cat=mouse000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		assetPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Mouser_Electronics_IGBT_Skin_Static_2402_40s/assets/fusion_1/",
	},
};

const DATA = ALL_DATA.fusion;

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const bg = new ImageDM("bg", `${DATA.assetPrefix}bg.png`, {
			position: "absolute",
			width: "100%",
			height: "100%",
		});

		const clickZoneRight = new ImageDM("click-zone-right", "", {
			transform: "rotate(180deg)",
			right: "0%",
			width: "31%",
		});

		root.appendChild(bg);
		root.appendChild(clickZoneRight);

		root.addEventListener("click", () => {
			trackPixel(DATA.floodlightLeft);
			onClick(DATA.clickUrlLeft);
		});
		clickZoneRight.addEventListener("click", () => {
			trackPixel(DATA.floodlighRight);
			onClick(DATA.clickUrlRight);
		});
	}

	public getVideos() {
		return {
			low: `${DATA.assetPrefix}video_low.mp4`,
			mid: `${DATA.assetPrefix}video_mid.mp4`,
			high: `${DATA.assetPrefix}ideo_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
