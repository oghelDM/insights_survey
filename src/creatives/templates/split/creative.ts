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
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/shoe_1.jpg",
			rightImageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/Split/shoe_2.jpg",
			debug: true,
			originalPosition: 33,
			clickUrl: "https://www.google.com/search?q=split",
			onClick,
		},
		{
			width: "44%",
			left: "42%",
			height: "90%",
			top: "5%",
		},
		{
			backgroundPosition: "center center",
		}
	);
	root.appendChild(split);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, [
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_low.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_mid.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_high.mp4",
	]);
