import { CssType } from "@/types";
import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const ALL_DATA = {
	STANDARD: {
		floodlightClientPlayYes:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913560;dc_trk_aid=574989012;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightClientNo:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913566;dc_trk_aid=574989018;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightYes:
			"https://ad.doubleclick.net/ddm/activity/src=13654546;type=invmedia;cat=pmi_i00v;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		floodlightPlay:
			"https://ad.doubleclick.net/ddm/activity/src=13654546;type=invmedia;cat=pmi_i00u;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		clickTag:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913572;dc_trk_aid=574989024;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
	},
	INTENDERS: {
		floodlightClientPlayYes:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913620;dc_trk_aid=574989072;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightClientNo:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913626;dc_trk_aid=574989078;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		floodlightYes:
			"https://ad.doubleclick.net/ddm/activity/src=13654546;type=invmedia;cat=pmi_i011;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		floodlightPlay:
			"https://ad.doubleclick.net/ddm/activity/src=13654546;type=invmedia;cat=pmi_i010;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		clickTag:
			"https://ad.doubleclick.net/ddm/trackclk/N571601.159483DAILYMOTION/B31096705.383913632;dc_trk_aid=575061310;dc_trk_cid=207545163;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
	},
};

const DATA = ALL_DATA.STANDARD;

class MyCreative extends Creative {
	root: HTMLElement;
	noBtn: HTMLElement;
	yesBtn: HTMLElement;
	firstScreen: HTMLElement;
	hasStopped = false;
	hasResumed = false;
	creativeProps: CreativeProps;

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.root = root;
		this.creativeProps = creativeProps;

		this.firstScreen = new ImageDM(
			"firstScreen",
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/bg0.png",
			{
				position: "absolute",
				width: "100%",
				height: "100%",
			}
		);

		const btnStyle: CssType = {
			position: "absolute",
			width: "15%",
			height: "15.5%",
			top: "80%",
			cursor: "pointer",
			opacity: "0",
			transition: "top 0.7s, opacity 0.6s",
		};
		this.yesBtn = new ImageDM(
			"yesBtn",
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/cta0.png",
			{
				...btnStyle,
				left: "56%",
			}
		);
		this.noBtn = new ImageDM(
			"noBtn",
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/cta1.png",
			{
				...btnStyle,
				left: "74%",
			}
		);

		this.yesBtn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.resumeVideo();
			trackPixel(DATA.floodlightClientPlayYes);
			trackPixel(DATA.floodlightYes);
		});
		this.noBtn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			trackPixel(DATA.floodlightClientNo);
			creativeProps.stopAd();
		});

		root.addEventListener("click", () =>
			creativeProps.onClick(DATA.clickTag)
		);

		root.appendChild(this.firstScreen);
		this.firstScreen.appendChild(this.noBtn);
		this.firstScreen.appendChild(this.yesBtn);
	}

	private resumeVideo() {
		this.hasResumed = true;
		this.creativeProps.resumeAd();
		this.root.removeChild(this.firstScreen);
	}

	public videoTimeUpdate(completionPercent: number): void {
		if (completionPercent > 1.35 && !this.hasStopped) {
			this.hasStopped = true;
			[this.noBtn, this.yesBtn].forEach((btn) => {
				btn.style.opacity = "1";
				btn.style.top = "53.5%";
			});
			this.creativeProps.pauseAd();
		} else if (completionPercent > 6 && !this.hasResumed) {
			// the user has clicked on the video controls play button
			this.resumeVideo();
			trackPixel(DATA.floodlightPlay);
			trackPixel(DATA.floodlightClientPlayYes);
		}
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Tobacco_Philip_Morris_Iqos_Interactive_Custom_2401_CAMPAIGN/assets/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
