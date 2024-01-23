import { CSSStyleType } from "@/types";
import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";

class QontoCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		const { onClick, videoSlot, stopAd, pauseAd, resumeAd } = creativeProps;

		setTimeout(() => {
			pauseAd();
			this.canResumeVideo = false;
		}, 2000);

		const bg = createDiv("bg-id", {
			position: "absolute",
			width: "100%",
			height: "100%",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "contain",
			pointerEvents: "none",
			backgroundImage:
				"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/bg.png)",
		});

		const btnOps = [
			{
				top: "31.3%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/20s/video_low.mp4",
				redirect:
					"https://qonto.com/de?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_smb_all&utm_term=video_smb_20s",
			},
			{
				top: "49%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
				videoSrc:
					"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/15s/video_low.mp4",
				redirect:
					"https://qonto.com/de/creation?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_company-creators_all&utm_term=video_company-creators_15s",
			},
			{
				top: "67.2%",
				floodlight:
					"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			},
		];

		const btnStyle: CSSStyleType = {
			position: "absolute",
			width: "32.7%",
			height: "13.3%",
			right: "6.1%",
			zIndex: "1",
			cursor: "pointer",
		};
		const buttonArray: HTMLElement[] = btnOps.map(
			({ top, floodlight, videoSrc, redirect }) => {
				const btn = createDiv("wording0-id", { ...btnStyle, top });

				btn.addEventListener("click", (e: Event) => {
					e.stopImmediatePropagation();
					e.stopPropagation();

					trackPixel(floodlight);

					this.canResumeVideo = true;
					if (videoSrc && redirect) {
						buttonArray.forEach(
							(element) => (element.style.display = "none")
						);
						trackPixel(
							"https://secure.adnxs.com/seg?add=36183614&gdpr_consent=${GDPR_CONSENT_550}"
						);
						bg.style.display = "none";
						videoSlot.src = videoSrc;
						resumeAd();
						root.addEventListener("click", () => onClick(redirect));
					} else {
						stopAd();
					}
				});

				root.appendChild(btn);
				return btn;
			}
		);

		root.appendChild(bg);
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
		};
	}
}
customElements.define("dm-creative", QontoCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(QontoCreative);
