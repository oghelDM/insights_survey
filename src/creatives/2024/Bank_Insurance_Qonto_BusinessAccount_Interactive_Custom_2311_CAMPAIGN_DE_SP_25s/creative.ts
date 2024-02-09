import { CssType } from "@/types";
import { VPAIDVideoPlayer } from "@app";
import { bounceIn } from "@/animations";
import { trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";

const DATA = {
	DE: {
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/bg.png",
		happydemicsPixel:
			"https://secure.adnxs.com/seg?add=36183614&gdpr_consent=${GDPR_CONSENT_550}",
		btns: [
			{
				top: "31.3%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/20s/video_low.mp4",
				redirect:
					"https://qonto.com/de?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_smb_all&utm_term=video_smb_20s",
				completionFloodlights: [
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				],
			},
			{
				top: "49%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/15s/video_low.mp4",
				redirect:
					"https://qonto.com/de/creation?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_company-creators_all&utm_term=video_company-creators_15s",
				completionFloodlights: [
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto005;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto006;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto008;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				],
			},
			{
				top: "67.2%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			},
		],
	},
	SP: {
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/SP/bg.png",
		happydemicsPixel:
			"https://secure.adnxs.com/seg?add=36429546&gdpr_consent=${GDPR_CONSENT_550}",
		btns: [
			{
				top: "29.3%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00o;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/SP/answer1/video_low.mp4",
				redirect:
					"https://qonto.com/es?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=es_awareness_branding-0124&utm_content=custom_micro_all&utm_term=video_micro_15s",
				completionFloodlights: [
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00-;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00a;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00b;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00c;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00d;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				],
			},
			{
				top: "44.3%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00p;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/SP/answer2/video_low.mp4",
				redirect:
					"https://qonto.com/es?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=es_awareness_branding-0124&utm_content=custom_small_all&utm_term=video_small_15s",
				completionFloodlights: [
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00e;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00f;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00g;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00h;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00i;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				],
			},
			{
				top: "59.3%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00q;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/SP/answer3/video_low.mp4",
				redirect:
					"https://qonto.com/es/creation?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=es_awareness_branding-0124&utm_content=custom_company-creators_all&utm_term=video_company-creators_15s",
				completionFloodlights: [
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00j;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00k;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00l;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00m;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00n;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				],
			},
			{
				top: "74.2%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto009;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			},
		],
	},
};

const data = DATA.SP;

class QontoCreative extends Creative {
	completionFloodlights: string[];
	currentFloodlightIndex = 0;

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.canResumeVideo = false;
		this.canPauseVideo = false;

		const { onClick, videoSlot, stopAd, resumeAd } = creativeProps;

		const bg = new ImageDM("bg-id", data.bgUrl, {
			pointerEvents: "none",
		});
		root.appendChild(bg);

		const btnStyle: CssType = {
			position: "absolute",
			width: "32.7%",
			height: "13.3%",
			right: "6.1%",
			zIndex: "1",
			cursor: "pointer",
			// backgroundColor: "rgba(255, 0, 0, .6)",
		};

		const buttonArray: HTMLElement[] = data.btns.map(
			(
				{ top, floodlight, videoSrc, redirect, completionFloodlights },
				i
			) => {
				const btn = createDiv(`btn-${i}`, { ...btnStyle, top });

				btn.addEventListener("click", (e: Event) => {
					e.stopImmediatePropagation();
					e.stopPropagation();

					if (floodlight) {
						trackPixel(floodlight);
					}

					this.canResumeVideo = true;
					this.canPauseVideo = true;
					if (videoSrc && redirect) {
						buttonArray.forEach(
							(element) => (element.style.display = "none")
						);
						trackPixel(data.happydemicsPixel);
						bg.style.display = "none";
						videoSlot.src = videoSrc;
						resumeAd();
						root.addEventListener("click", () => onClick(redirect));

						this.completionFloodlights = completionFloodlights;
						tooltip.style.display = "none";
					} else {
						stopAd();
					}
				});

				root.appendChild(btn);
				return btn;
			}
		);

		const tooltip = new ImageDM(
			"tooltip",
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/tooltip.png",
			{
				width: "6%",
				height: "14%",
				backgroundSize: "contain",
				left: "71%",
				rotate: "-12deg",
				scale: "0",
			}
		);
		root.appendChild(tooltip);

		let tooltipBtnIdx = 0;
		window.setTimeout(
			() =>
				window.setInterval(() => {
					const top = parseFloat(
						data.btns[tooltipBtnIdx % data.btns.length].top
					);
					tooltip.style.top = `${top + 2}%`;
					bounceIn(tooltip, 1200);
					tooltipBtnIdx += 1;
				}, 2500),
			600
		);
	}

	public videoTimeUpdate(completionPercent: number): void {
		if (
			this.completionFloodlights &&
			!isNaN(completionPercent) &&
			this.currentFloodlightIndex < this.completionFloodlights.length
		) {
			if (
				completionPercent >=
				Math.min(25 * this.currentFloodlightIndex, 95) // force the last floodlight before the video reaches 100%
			) {
				trackPixel(
					this.completionFloodlights[this.currentFloodlightIndex]
				);
				this.currentFloodlightIndex += 1;
			}
		}
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_20s_low.mp4",
		};
	}
}
customElements.define("dm-creative", QontoCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(QontoCreative);
