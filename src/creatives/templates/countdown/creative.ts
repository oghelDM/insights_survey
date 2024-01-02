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
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_1023_Warner-Bros_Aquaman2_Interactive_Countdown_IT_30s/assets/bg.png"
	);
	root.appendChild(bg);

	const date = new Date();
	date.setHours((date.getHours() + 2) % 24);
	// const date = new Date("Oct 21, 2023 09:00:00"); // also works like that

	const countdown = new Countdown(
		{
			id: "countdown-dm",
			date,
			elementWidth: "2em",
			debug: false,
			clickUrl: "https://www.google.com/search?q=countdown",
			onClick,
		},
		{
			width: "32%",
			right: "56%",
			top: "85.3%",
			fontSize: "4vi",
			lineHeight: "4vi",
			textAlign: "right",
		}
	);
	root.appendChild(countdown);

	root.addEventListener("click", () =>
		onClick("https://www.google.com/search?q=root")
	);
};

// window.getVPAIDAd = () =>
// 	new VPAIDVideoPlayer(creative, [
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_1023_Warner-Bros_Aquaman2_Interactive_Countdown_IT_30s/assets/videos/video_low.mp4",
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_1023_Warner-Bros_Aquaman2_Interactive_Countdown_IT_30s/assets/videos/video_mid.mp4",
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_1023_Warner-Bros_Aquaman2_Interactive_Countdown_IT_30s/assets/videos/video_high.mp4",
// 	]);
