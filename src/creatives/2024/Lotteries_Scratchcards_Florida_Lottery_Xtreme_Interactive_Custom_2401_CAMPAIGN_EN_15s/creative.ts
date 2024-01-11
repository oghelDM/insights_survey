import { VPAIDVideoPlayer } from "@app";
import { random12 } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";
import { CarouselBasic } from "@/components/carouselBasic";
import { bounceIn, hotSpotBounce, rotate } from "@/animations";

const shineCoordinates = [
	[
		{ left: 7, bottom: 29.5, width: 2 },
		{ left: 18, bottom: 13, width: 3 },
		{ left: 32, bottom: 23.5, width: 2.3 },
	],
	[
		{ left: 38.5, bottom: 21.5, width: 4 },
		{ left: 50.5, bottom: 3, width: 2.1 },
		{ left: 64, bottom: 24, width: 2.8 },
	],
	[
		{ left: 71.5, bottom: 59, width: 3.7 },
		{ left: 75, bottom: 29, width: 2.4 },
		{ left: 79, bottom: 38, width: 4 },
	],
	[
		{ left: 90, bottom: 30, width: 2.6 },
		{ left: 87, bottom: 55, width: 3.2 },
		{ left: 50, bottom: 18, width: 2.1 },
		{ left: 91, bottom: 69, width: 4 },
	],
	[
		{ left: 90, bottom: 30, width: 2.6 },
		{ left: 87, bottom: 55, width: 3.2 },
		{ left: 50, bottom: 18, width: 2.1 },
		{ left: 91, bottom: 69, width: 4 },
	],
];

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const clickUrl = "http://www.google.com?q=toto";

	// BG
	const bg = new ImageDM(
		"bg-dm",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/elements.png"
	);
	root.appendChild(bg);
	bg.addEventListener("click", () => onClick(clickUrl));

	const cta = new ImageDM(
		"cta-dm",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/cta.png",
		{
			width: "24%",
			height: "10%",
			left: "45%",
			bottom: "12%",
			backgroundSize: "contain",
			cursor: "pointer",
			scale: "0",
		}
	);
	root.appendChild(cta);
	bg.addEventListener("click", () => onClick(clickUrl));
	bounceIn(cta, 450, 400);

	const fadeObjects = shineCoordinates.map((stars) =>
		stars.map(({ left, bottom, width }, i) => {
			const star = new ImageDM(
				`star-${i}-id`,
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/shine.png",
				{
					width: `${width * 3}%`,
					height: "unset",
					aspectRatio: "1 / 1",
					left: `${left}%`,
					bottom: `${bottom}%`,
					opacity: "0",
				}
			);

			rotate(star, random12(3000, 7500));

			return star;
		})
	);

	// CAROUSEL component
	const carousel = new CarouselBasic(
		{
			id: "cuberDM",
			productUrls: [
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/product_0.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/product_1.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/product_2.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/product_3.png",
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/product_4.png",
			],
			focusedElementWidth: 100,
			focusedElementHeight: 100,
			debug: false,
			gap: 20,
			onClick,
			clickUrl,
			fadeObjects,
		},
		{ width: "34%", height: "83%", right: 0 }
	);
	root.appendChild(carousel);

	fadeObjects.flat().forEach((star) => {
		carousel.appendChild(star);
		star.animate(
			[
				{ scale: 0 },
				{ scale: 1 },
				{ scale: 1 },
				{ scale: 1 },
				{ scale: 1 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
				{ scale: 0 },
			],
			{
				delay: random12(0, 1200),
				duration: 1000, //random12(1000, 2000),
				fill: "forwards",
				easing: "linear",
				iterations: Infinity,
			}
		);
	});

	["left", "right"].forEach((name, i) => {
		const btn = new ImageDM(
			`${name}-id`,
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/arrow.png",
			{
				width: "15%",
				height: "unset",
				aspectRatio: "1 / 1",
				left: i === 0 ? "1.5%" : "unset",
				right: i === 1 ? "1.5%" : "unset",
				top: "43%",
				userSelect: "none",
				cursor: "pointer",
				transform: i === 0 ? "unset" : "rotate(180deg)",
			}
		);
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			carousel.moveIndexBy(i === 0 ? 1 : -1);
		});
		carousel.appendChild(btn);
	});
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_2401_CAMPAIGN_EN_15s/assets/video_high.mp4",
	});
