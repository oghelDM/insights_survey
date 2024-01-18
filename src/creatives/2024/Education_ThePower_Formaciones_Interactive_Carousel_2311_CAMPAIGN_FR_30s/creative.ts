import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";
import { CarouselBasic } from "@/components/carouselBasic";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const bg = new ImageDM(
		"bg",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/bg.png",
		{
			position: "absolute",
			width: "100%",
			height: "100%",
		}
	);

	const arrowStyle = {
		width: "10%",
		height: "20%",
		top: "40%",
		backgroundSize: "contain",
		cursor: "pointer",
	};
	const arrowRight = new ImageDM(
		"bg-arrow-right",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/arrow_right.png",
		{
			...arrowStyle,
			right: "3%",
		}
	);
	const arrowLeft = new ImageDM(
		"bg-arrow-left",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/arrow_right.png",
		{
			transform: "rotate(180deg)",
			left: "3%",
			...arrowStyle,
		}
	);

	const carousel = new CarouselBasic(
		{
			id: "carouselDM",
			productUrls: [
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/product0.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/product1.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/product2.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/product3.png",
			],
			clickUrls: [
				"https://www.thepowermba.com/uk/1",
				"https://www.thepowermba.com/uk/2",
				"https://www.thepowermba.com/uk/3",
				"https://www.thepowermba.com/uk/4",
			],
			debug: false,
			focusedElementWidth: 100,
			focusedElementHeight: 100,
			unfocusedElementHeight: 100,
			unfocusedElementWidth: 100,
			gap: 0,
			autoPlay: true,
			onClick,
			clickUrl: "https://www.thepowermba.com/uk/generic",
			arrows: [arrowLeft, arrowRight],
			speedCoefficient: 1.2,
		},
		{ width: "38.3%", height: "60%", right: "0.5%", top: "27%" }
	);

	root.addEventListener("click", () =>
		onClick("https://www.thepowermba.com/uk/generic")
	);
	root.appendChild(bg);
	root.appendChild(carousel);
	carousel.appendChild(arrowRight);
	carousel.appendChild(arrowLeft);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/video_high.mp4",
	});
