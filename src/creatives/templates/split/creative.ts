import { VPAIDVideoPlayer } from "@app";
import { Split } from "@/components/Split";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const split = new Split(
		{
			id: "idxMngrDM",
			leftImageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/miraculous_1.png",
			rightImageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/miraculous_2.png",
			debug: false,
			originalPosition: 33,
			clickUrl: "https://www.google.com/search?q=split",
			onClick,
		}
		// {
		// 	width: "44%",
		// 	left: "42%",
		// 	height: "90%",
		// 	top: "5%",
		// },
		// {
		// 	backgroundPosition: "center center",
		// }
	);
	root.appendChild(split);
};

// window.getVPAIDAd = () =>
// 	new VPAIDVideoPlayer(creative, [
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_low.mp4",
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_mid.mp4",
// 		"https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_high.mp4",
// 	]);
