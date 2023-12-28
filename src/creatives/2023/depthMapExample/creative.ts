import { VPAIDVideoPlayer } from "@app";
import { DepthMap } from "@/components/three/depthMap";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const depthMap = new DepthMap(
		{
			id: "depthMapDM",
			imageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar.png",
			depthMapUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar-depthMap.png",
			onClick,
			clickUrl: "https://www.google.com/search?q=depthMap",
		},
		// { width: "33.3%", height: "30%", right: 0, top: "23%" }
		{}
	);
	root.appendChild(depthMap);

	root.addEventListener("click", () =>
		onClick("https://www.google.com/search?q=avatar")
	);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(
		creative,
		{
			low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_high.mp4",
		},
	);
