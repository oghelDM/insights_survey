import { VPAIDVideoPlayer } from "@app";
import { random12 } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { Scratch } from "@/components/scratch";
import { CSSStyleType, CreativeHandler, CreativeProps } from "@/types";
import { bounceIn, bounceOut, hotSpotBounce, rotate } from "@/animations";

const shineCoordinates = [
	{ left: 7, bottom: 29.5 },
	{ left: 18, bottom: 13 },
	{ left: 32, bottom: 22 },
	{ left: 39, bottom: 22 },
	{ left: 50, bottom: 18 },
	{ left: 50, bottom: 3 },
	{ left: 64, bottom: 24 },
	{ left: 71, bottom: 59 },
	{ left: 75, bottom: 29 },
	{ left: 79, bottom: 38 },
	{ left: 89, bottom: 30 },
	{ left: 87, bottom: 55 },
	{ left: 50, bottom: 18 },
	{ left: 91, bottom: 69 },
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
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/wording_0.png)",
	});
	const wording1 = createDiv("wording1-id", {
		...wordingStyle,
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/wording_1.png)",
		scale: "0",
	});

	const tooltip = createDiv("tooltip-id", {
		...wordingStyle,
		width: "9%",
		height: "16%",
		left: "65%",
		bottom: "17%",
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/tuto.png)",
		opacity: "0",
		transition: "opacity .5s, left 1.1s, bottom 1.1s",
	});

	const scratch = new Scratch({
		id: "scratchDM",
		debug: false,
		backImageUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/bottom_2.png",
		frontImageUrl:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/top_2.png",
		onClick,
		clickUrl: "https://www.google.com/search?q=depthMap",
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
						{ opacity: 1 },
						{ opacity: 0 },
					],
					{
						delay: random12(0, 1200),
						duration: random12(1000, 2000),
						fill: "forwards",
						easing: "ease-out",
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

	root.addEventListener("click", () =>
		onClick("https://www.google.com/search?q=scratch")
	);

	root.appendChild(scratch);
	root.appendChild(wording0);
	root.appendChild(wording1);
	root.appendChild(tooltip);

	stars = shineCoordinates.map(({ left, bottom }, i) => {
		const star = createDiv(`star-${i}-id`, {
			...wordingStyle,
			width: `${random12(2.5, 4)}%`,
			height: "unset",
			aspectRatio: "1 / 1",
			left: `${left}%`,
			bottom: `${bottom}%`,
			opacity: "0",
			transform: "translate(-50%, -50%)",
			backgroundImage:
				"url(https://statics.dmcdn.net/d/PRODUCTION/2024/scratch_lottery_to_rename/assets/shine.png)",
		});

		rotate(star, random12(3000, 7500));
		hotSpotBounce(star, random12(1000, 1300), random12(0, 2000));

		root.appendChild(star);

		return star;
	});

	const moveTooltip = (toto: boolean) => {
		tooltip.style.opacity = "1";
		tooltip.style.left = `${toto ? 75 : 65}%`;
		tooltip.style.bottom = `${toto ? 24 : 17}%`;
		timeoutId = window.setTimeout(() => moveTooltip(!toto), 1700);
	};

	timeoutId = window.setTimeout(() => {
		moveTooltip(true);
		intervalId = window.setInterval(() => {
			const qqq = tooltip.getBoundingClientRect();
			scratch.pointerMove(
				new PointerEvent("custom", {
					clientX: qqq.left,
					clientY: qqq.top,
				})
			);
		}, 1);
	}, 3500);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
	});
