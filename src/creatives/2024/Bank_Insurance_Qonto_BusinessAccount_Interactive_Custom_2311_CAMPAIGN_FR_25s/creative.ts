import { VPAIDVideoPlayer } from "@app";
import { createDiv } from "@/utils/divMaker";
import { CSSStyleType, CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick, videoSlot, stopAd, pauseAd, resumeAd }: CreativeProps
) => {
	const trackPixel = (url: string) => {
		if (typeof window !== "undefined" && window !== null) {
			const i = new Image();
			i.src = url;
		}
	};

	setTimeout(() => {
		pauseAd();
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
			posY: "31.3%",
			floodlight:
				"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			videoSrc:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/20s/video_low.mp4",
			redirect:
				"https://qonto.com/de?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_smb_all&utm_term=video_smb_20s",
		},
		{
			posY: "49%",
			floodlight:
				"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			videoSrc:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Bank_Insurance_Qonto_BusinessAccount_Interactive_Custom_2311_CAMPAIGN_FR_25s/assets/15s/video_low.mp4",
			redirect:
				"https://qonto.com/de/creation?utm_source=dailymotion&utm_medium=direct_buying&utm_campaign=de_awareness_branding-0124&utm_content=custom_company-creators_all&utm_term=video_company-creators_15s",
		},
		{
			posY: "67.2%",
			floodlight:
				"https://ad.doubleclick.net/ddm/activity/src=14004237;type=invmedia;cat=qonto000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		},
	];

	const buttonArray: HTMLElement[] = btnOps.map(
		({ posY, floodlight, videoSrc, redirect }, i) => {
			const btnStyle: CSSStyleType = {
				position: "absolute",
				width: "32.7%",
				height: "13.3%",
				right: "6.1%",
				zIndex: "1",
				cursor: "pointer",
			};

			if (i === 0) {
				btnStyle.top = "31.3%";
			} else if (i === 1) {
				btnStyle.top = "49%";
			} else {
				btnStyle.top = "67.2%";
			}

			let btn = createDiv("wording0-id", {
				...btnStyle,
			});

			btn.addEventListener("click", (e: Event) => {
				e.stopImmediatePropagation();
				e.stopPropagation();

				if (i === 0 || i === 1) {
					buttonArray.forEach((element) => {
						element.style.display = "none";
					});
					trackPixel(`${btnOps[i].floodlight}`);
					trackPixel(
						"https://secure.adnxs.com/seg?add=36183614&gdpr_consent=${GDPR_CONSENT_550}"
					);
					bg.style.display = "none";
					videoSlot.src = `${btnOps[i].videoSrc}`;
					resumeAd();
					root.addEventListener("click", () =>
						onClick(`${btnOps[i].redirect}`)
					);
				} else {
					trackPixel(`${btnOps[i].floodlight}`);
					stopAd();
				}
			});

			root.appendChild(btn);
			return btn;
		}
	);

	root.appendChild(bg);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
	});
