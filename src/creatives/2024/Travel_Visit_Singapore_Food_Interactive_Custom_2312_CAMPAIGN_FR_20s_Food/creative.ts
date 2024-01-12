import { VPAIDVideoPlayer } from "@app";
import { random12 } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { Scratch } from "@/components/scratch";
import { CSSStyleType, CreativeHandler, CreativeProps } from "@/types";
import { bounceIn, bounceOut, hotSpotBounce, rotate } from "@/animations";
import { fetchWeatherApi } from "openmeteo";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	// const url = "https://api.open-meteo.com/v1/forecast";
	let tempText: string;

	const myAsynFunction = async (url: string) => {
		const params = {
			latitude: -24.5623,
			longitude: 29.315,
			current: "temperature_2m",
			forecast_days: 1,
		};
		const responses = await fetchWeatherApi(url, params);

		// Helper function to form time ranges
		const range = (start: number, stop: number, step: number) =>
			Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

		// Process first location. Add a for-loop for multiple locations or weather models
		const response = responses[0];

		// Attributes for timezone and location
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const current = response.current()!;

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData = {
			current: {
				time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
				temperature2m: current.variables(0)!.value(),
			},
		};

		return responses;

		// `weatherData` now contains a simple structure with arrays for datetime and weather data
	};

	const transitionBlock = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "red",
		width: "100%",
		height: "100%",
		left: "-100%",
		zIndex: "12",
		transition: "all 1s ease-out",
	});

	const transitionSmallBlock = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "crimson",
		width: "0%",
		height: "100%",
		right: "0",
		transition: "all 1s ease-out",
	});

	transitionBlock.appendChild(transitionSmallBlock);

	const bgStyle: CSSStyleType = {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: "0%",
		bottom: "0%",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		// pointerEvents: "none",
	};

	const bg = createDiv("bg-id", {
		...bgStyle,
		backgroundImage:
			"url(https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_question.png)",
		transition: "all .5s ease-out",
	});

	const optElements = [
		{
			unactive:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/A.png",
			active:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/A_Selected.png",
			selected:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/A_False.png",
			bg: "https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_false.png",
		},
		{
			unactive:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B.png",
			active:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B_Selected.png",
			selected:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B_True.png",
			bg: "https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_true.png",
		},
		{
			unactive:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C.png",
			active:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C_Selected.png",
			selected:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C_False.png",
			bg: "https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_false.png",
		},
	];

	const btnStyle: CSSStyleType = {
		position: "absolute",
		width: "30%",
		height: "10%",
		bottom: "50%",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		transition: "all .5s ease-out",
		zIndex: "10",
		// pointerEvents: "none",
	};

	let isBtnClicked = false;

	const buttonArray: HTMLElement[] = optElements.map((btn, i) => {
		let button = createDiv("btn-A-id", {
			...btnStyle,
			backgroundImage: `url(${btn.unactive})`,
			cursor: "pointer",
		});

		if (i === 0) {
			button.style.left = "3.3%";
		} else if (i === 1) {
			button.style.left = "35%";
		} else {
			button.style.right = "3.3%";
		}

		button.addEventListener("mouseenter", () => {
			if (!isBtnClicked) {
				button.style.backgroundImage = `url(${btn.active})`;
			}
		});

		button.addEventListener("mouseleave", () => {
			if (!isBtnClicked) {
				button.style.backgroundImage = `url(${btn.unactive})`;
			}
		});

		root.appendChild(button);
		// buttonArray.push(button);

		button.addEventListener("click", (e: any) => {
			e.stopImmediatePropagation();
			e.stopPropagation();
			isBtnClicked = true;
			buttonArray.forEach((element) => {
				element.style.opacity = "0";
			});
			transitionBlock.style.left = "100%";
			transitionSmallBlock.style.width = "90%";
			button.style.backgroundImage = `url(${btn.selected})`;
			bg.style.backgroundImage = `url(${btn.bg})`;
			setTimeout(() => {
				button.style.display = "none";
			}, 500);
		});

		return button;
	});

	const tempStyle: CSSStyleType = {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: "0%",
		bottom: "0%",
		color: "white",
		// pointerEvents: "none",
	};

	const temperature = createDiv("temperature-id", {
		...tempStyle,
		transition: "all .5s ease-out",
	});

	console.log(
		"temperature :",
		myAsynFunction("https://api.open-meteo.com/v1/forecast")
	);

	root.addEventListener("click", () =>
		onClick("https://www.google.com/search?q=scratch")
	);

	bg.appendChild(temperature);
	root.appendChild(bg);
	root.appendChild(transitionBlock);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
	});
