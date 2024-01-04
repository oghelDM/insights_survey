import { VPAIDVideoPlayer } from "@app";
import { createDiv } from "@/utils/divMaker";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ pauseAd, resumeAd, setAdVolume }: CreativeProps
) => {
	const buttonStyle = {
		position: "absolute",
		width: "80px",
		height: "80px",
		cursor: "pointer",
		textAlign: "center",
		lineHeight: "80px",
		borderRadius: "5px",
	};

	const onClick = (e: MouseEvent, callback: () => void) => {
		e.stopPropagation();
		e.preventDefault();
		callback();
	};

	["play", "pause"].forEach((name, i) => {
		const btn = createDiv(`${name}-id`, {
			...buttonStyle,
			left: `${i * 100}px`,
			top: "0",
			backgroundColor: i === 0 ? "crimson" : "aquamarine",
		});
		btn.innerHTML = name;
		btn.addEventListener("click", (e) =>
			onClick(e, i === 0 ? resumeAd : pauseAd)
		);
		root.appendChild(btn);
	});

	["mute", "unmute"].forEach((name, i) => {
		const btn = createDiv(`${name}-id`, {
			...buttonStyle,
			left: `${i * 100}px`,
			top: "100px",
			backgroundColor: i === 0 ? "lavender" : "chocolate",
		});
		btn.innerHTML = name;
		btn.addEventListener("click", (e) =>
			onClick(e, () => setAdVolume(i === 0 ? 0 : 1))
		);
		root.appendChild(btn);
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_high.mp4",
	});
