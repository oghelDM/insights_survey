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
			onClick: () => console.log("depthMap click"),
		},
		// { width: "33.3%", height: "30%", right: 0, top: "23%" }
		{}
	);
	root.addEventListener("click", () =>
		onClick(
			"https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.onitsukatiger.com%2Fmy%2Fen-my%2Fp%2Fgifting%3Futm_source%3Ddailymotion%26utm_medium%3Dreferral%26utm_campaign%3Dholiday-gifts%26utm_content%3Dvideo&data=05%7C01%7Cbaljina.kaurbashi%40dailymotion.com%7C2d86e6d286ac4d5f056808dbf6e75dfc%7C37530da3f7a748f4ba462dc336d55387%7C0%7C0%7C638375245869318358%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=bHTATLyTrdiyJwPePE2hhExq7oLMcizl1QCcAQ3WKrg%3D&reserved=0"
		)
	);
	root.appendChild(depthMap);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, [
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_low.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_mid.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_high.mp4",
	]);
