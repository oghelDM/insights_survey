import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";
import { CarouselBasic } from "@/components/carouselBasic";

export const videos = [
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
];

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const arrowStyle = {
		width: "10%",
		height: "20%",
		top: "40%",
		backgroundSize: "contain",
		cursor: "pointer",
	};
	const arrowRight = new ImageDM("bg-arrow-right", {
		url: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/arrowRight.png",
		...arrowStyle,
		right: 0,
	});
	const arrowLeft = new ImageDM("bg-arrow-left", {
		url: "https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/arrowRight.png",
		transform: "rotate(180deg)",
		...arrowStyle,
	});

	const carousel = new CarouselBasic(
		{
			id: "carouselDM",
			productUrls: [
				"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/shoe0.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/shoe1.png",
			],
			clickUrls: [
				"https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.onitsukatiger.com%2Fmy%2Fen-my%2Fproduct%2Fdelecity%2F1183c195.020%3Futm_source%3Ddailymotion%26utm_medium%3Dreferral%26utm_campaign%3Dholiday-gifts%26utm_content%3Dvideo&data=05%7C01%7Cbaljina.kaurbashi%40dailymotion.com%7C2d86e6d286ac4d5f056808dbf6e75dfc%7C37530da3f7a748f4ba462dc336d55387%7C0%7C0%7C638375245869318358%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=K%2FKCKxbPmqjKUIN8hVfALu4powpeol%2BpCbSHmWop87w%3D&reserved=0",
				"https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.onitsukatiger.com%2Fmy%2Fen-my%2Fproduct%2Fmexico-66-sd%2F1183c196.020%3Futm_source%3Ddailymotion%26utm_medium%3Dreferral%26utm_campaign%3Dholiday-gifts%26utm_content%3Dvideo&data=05%7C01%7Cbaljina.kaurbashi%40dailymotion.com%7C2d86e6d286ac4d5f056808dbf6e75dfc%7C37530da3f7a748f4ba462dc336d55387%7C0%7C0%7C638375245869318358%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=ZS5IvqMh6E27tFgDFYZ2hWx9hHrVqFSiZzXBGB5NHrE%3D&reserved=0",
			],
			debug: false,
			focusedElementWidth: 100,
			focusedElementHeight: 100,
			unfocusedElementHeight: 100,
			unfocusedElementWidth: 100,
			gap: 10,
			onClick: (url) => onClick(url),
			arrows: [arrowLeft, arrowRight],
			speedCoefficient: 10,
		},
		{ width: "33.3%", height: "35%", right: 0, top: "23%" }
	);

	root.addEventListener("click", () =>
		onClick(
			"https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.onitsukatiger.com%2Fmy%2Fen-my%2Fp%2Fgifting%3Futm_source%3Ddailymotion%26utm_medium%3Dreferral%26utm_campaign%3Dholiday-gifts%26utm_content%3Dvideo&data=05%7C01%7Cbaljina.kaurbashi%40dailymotion.com%7C2d86e6d286ac4d5f056808dbf6e75dfc%7C37530da3f7a748f4ba462dc336d55387%7C0%7C0%7C638375245869318358%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=bHTATLyTrdiyJwPePE2hhExq7oLMcizl1QCcAQ3WKrg%3D&reserved=0"
		)
	);
	root.appendChild(carousel);
	carousel.appendChild(arrowRight);
	carousel.appendChild(arrowLeft);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, [
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_low.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_mid.mp4",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Style_Fashion_Onitsuka_Tiger_Baskets_Interactive_Carousel_2312_CAMPAIGN_EN_20s/assets/video_high.mp4",
	]);
