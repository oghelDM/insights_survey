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
	const noIteractionTimeOut = 10000;

	const temperatureContainer = createDiv("temperatureContainer-id", {
		position: "absolute",
		width: "100%",
		height: "10%",
		bottom: "32%",
		textAlign: "center",
		color: "white",
		fontFamily: "sans-serif",
		userSelect: "none",
	});

	temperatureContainer.innerHTML = "-";

	const myAsynFunction = async (url: string) => {
		const params = {
			latitude: -24.5623,
			longitude: 29.315,
			current: "temperature_2m",
			forecast_days: 1,
		};

		bg.appendChild(temperatureContainer);
		try {
			const responses = await fetchWeatherApi(url, params);

			// Process first location. Add a for-loop for multiple locations or weather models
			if (!responses || !Array.isArray(responses) || !responses[0]) {
				temperatureContainer.innerHTML = `${Math.round(random12(25, 30))}°C`;
				return;
			}

			const response = responses[0];
			const current = response.current()!;
			const temperature = Math.round(current.variables(0)!.value());

			temperatureContainer.innerHTML = `${temperature}°C`;
		} catch {
			temperatureContainer.innerHTML = `${Math.round(random12(26, 28))}°C`;
		}
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

	const bg = createDiv("bg-id", {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: "0%",
		bottom: "0%",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
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
			bgOpt:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_false.png",
		},
		{
			unactive:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B.png",
			active:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B_Selected.png",
			selected:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/B_True.png",
			bgOpt:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_true.png",
		},
		{
			unactive:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C.png",
			active:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C_Selected.png",
			selected:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/C_False.png",
			bgOpt:
				"https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/food/assets/screen_false.png",
		},
	];

	let isBtnClicked = false;

	const buttonArray: HTMLElement[] = optElements.map(
		({ unactive, active, bgOpt, selected }, i) => {
			let button = createDiv(`btn-${i}`, {
				position: "absolute",
				width: "30%",
				height: "10%",
				bottom: "50%",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
				transition: "all .5s ease-out",
				zIndex: "10",
				backgroundImage: `url(${unactive})`,
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
					button.style.backgroundImage = `url(${active})`;
				}
			});

			button.addEventListener("mouseleave", () => {
				if (!isBtnClicked) {
					button.style.backgroundImage = `url(${unactive})`;
				}
			});

			root.appendChild(button);
			// buttonArray.push(button);

			button.addEventListener("click", (e: MouseEvent) => {
				e.stopImmediatePropagation();
				e.stopPropagation();
				isBtnClicked = true;
				myAsynFunction("https://api.open-meteo.co/v1/forecast");
				buttonArray.forEach((element) => {
					element.style.opacity = "0";
				});
				transitionBlock.style.left = "100%";
				transitionSmallBlock.style.width = "90%";
				button.style.backgroundImage = `url(${selected})`;
				bg.style.backgroundImage = `url(${bgOpt})`;
				setTimeout(() => {
					button.style.display = "none";
				}, 500);
			});

			return button;
		}
	);

	setTimeout(() => {
		buttonArray[1].click();
	}, noIteractionTimeOut);

	root.addEventListener("click", () =>
		onClick("https://www.google.com/search?q=scratch")
	);

	root.appendChild(bg);
	root.appendChild(transitionBlock);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
	});
