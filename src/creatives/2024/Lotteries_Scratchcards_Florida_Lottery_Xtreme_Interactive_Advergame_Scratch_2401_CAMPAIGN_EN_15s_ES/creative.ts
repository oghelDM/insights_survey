import { VPAIDVideoPlayer } from "@app";
import { random12 } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { Scratch } from "@/components/scratch";
import { CSSStyleType, CreativeHandler, CreativeProps } from "@/types";
import { bounceIn, bounceOut, hotSpotBounce, rotate } from "@/animations";

const shineCoordinates = [
	{ left: 7, bottom: 29.5, width: 2 },
	{ left: 18, bottom: 13, width: 3 },
	{ left: 32, bottom: 23.5, width: 2.3 },
	{ left: 38.5, bottom: 21.5, width: 4 },
	{ left: 50.5, bottom: 3, width: 2.1 },
	{ left: 64, bottom: 24, width: 2.8 },
	{ left: 71.5, bottom: 59, width: 3.7 },
	{ left: 75, bottom: 29, width: 2.4 },
	{ left: 79, bottom: 38, width: 4 },
	{ left: 90, bottom: 30, width: 2.6 },
	{ left: 87, bottom: 55, width: 3.2 },
	{ left: 50, bottom: 18, width: 2.1 },
	{ left: 91, bottom: 69, width: 4 },
];

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	let stars: HTMLElement[];
	let timeoutId: number;
	let intervalId: number;

	const wordingStyle: CSSStyleType = {
		position: "absolute",
		width: "38%",
		height: "30%",
		left: "2%",
		bottom: "5%",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		pointerEvents: "none",
	};
	const wording0 = createDiv("wording0-id", {
		...wordingStyle,
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/wording_0_es.png)",
	});
	const wording1 = createDiv("wording1-id", {
		...wordingStyle,
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/wording_1_es.png)",
		scale: "0",
	});

	const tooltip = createDiv("tooltip-id", {
		...wordingStyle,
		width: "9%",
		height: "16%",
		left: "68%",
		bottom: "37%",
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/tuto.png)",
		opacity: "0",
		transition: "opacity .5s, left 1.1s, bottom 1.1s",
	});

	const scratch = new Scratch({
		id: "scratchDM",
		debug: false,
		backImageUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/bottom_es.png",
		frontImageUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/top_es.png",
		onClick,
		clickUrl:
			"https://ad.doubleclick.net/ddm/trackclk/N884815.132420DAILYMOTION/B31350486.385708370;dc_trk_aid=576892002;dc_trk_cid=208352222;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		cursorUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/coin.png",
		scratchSizeCoeff: 1,
		onAutoRevealStart: () => {
			console.log("onAutoRevealStart");
			window.clearInterval(intervalId);
			window.clearTimeout(timeoutId);
			bounceOut(wording0, 450, 0);
			bounceIn(wording1, 450, 300);
			tooltip.style.opacity = "0";
			stars.forEach((star) =>
				star.animate(
					[
						{ opacity: 0 },
						{ opacity: 1 },
						{ opacity: 1 },
						{ opacity: 1 },
						{ opacity: 1 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
						{ opacity: 0 },
					],
					{
						delay: random12(0, 1200),
						duration: 1000, //random12(1000, 2000),
						fill: "forwards",
						easing: "linear",
						iterations: Infinity,
					}
				)
			);
		},
		onUserScratchStart: () => {
			console.log("user scratch start");
			tooltip.style.display = "none";
		},
		timeoutDuration: 5000,
	});

	// root.addEventListener("click", () =>
	// 	onClick(
	// 		"https://ad.doubleclick.net/ddm/trackclk/N884815.132420DAILYMOTION/B31350486.385708370;dc_trk_aid=576892002;dc_trk_cid=208352222;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1"
	// 	)
	// );

	root.appendChild(scratch);
	root.appendChild(wording0);
	root.appendChild(wording1);
	root.appendChild(tooltip);

	stars = shineCoordinates.map(({ left, bottom, width }, i) => {
		const star = createDiv(`star-${i}-id`, {
			...wordingStyle,
			width: `${width}%`,
			height: "unset",
			aspectRatio: "1 / 1",
			left: `${left}%`,
			bottom: `${bottom}%`,
			opacity: "0",
			backgroundImage:
				"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/shine.png)",
		});

		rotate(star, random12(3000, 7500));
		hotSpotBounce(star, random12(1000, 1300), random12(0, 2000));

		root.appendChild(star);

		return star;
	});

	const moveTooltip = (toto: boolean) => {
		tooltip.style.opacity = "1";
		tooltip.style.left = `${toto ? 75 : 68}%`;
		tooltip.style.bottom = `${toto ? 17 : 37}%`;
		timeoutId = window.setTimeout(() => moveTooltip(!toto), 1700);
	};

	timeoutId = window.setTimeout(() => {
		moveTooltip(true);
		intervalId = window.setInterval(() => {
			const { left, top } = tooltip.getBoundingClientRect();
			scratch.pointerMove(
				new PointerEvent("custom", {
					clientX: left,
					clientY: top,
				})
			);
		}, 100);
	}, 3000);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/video_low_es.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/video_mid_es.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Advergame_Scratch_2401_CAMPAIGN_EN_15s/assets/video_high_es.mp4",
	});
