import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { Countdown } from "@/components/Countdown";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const bg = new ImageDM(
		"bg-DM",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/bg2.png"
	);
	root.appendChild(bg);

	// const date = new Date();
	// date.setHours((date.getHours() + 2) % 24);
	const date = new Date("Feb 08, 2024 00:00:01"); // also works like that

	const countdown = new Countdown(
		{
			id: "countdown-dm",
			date,
			elementWidth: "3em",
			debug: false,
			clickUrl: "https://www.google.com/search?q=countdown",
			isOverMessage: " ",
			onClick,
		},
		{
			width: "26%",
			right: "3.95%",
			bottom: "40.5%",
			fontSize: "3vi",
			lineHeight: "4vi",
			textAlign: "center",
		}
	);
	root.appendChild(countdown);

	root.addEventListener("click", () =>
		onClick(
			"https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root"
		)
	);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: `https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_low.mp4`,
		mid: `https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_low.mp4`,
		high: `https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_high.mp4`,
	});
