import { VPAIDVideoPlayer } from "@app";
import { random12 } from "@/utils/helper";
import { fetchWeatherApi } from "openmeteo";
import { createDiv } from "@/utils/divMaker";
import { CreativeHandler, CreativeProps } from "@/types";

const ALL_DATA = {
	food: {
		assetsUrl: "food/assets/3",
		winIndex: 1,
		redirection: "https://www.visitsingapore.com/dining-drinks-singapore/",
	},
	gardens: {
		assetsUrl: "gardens/assets/2",
		winIndex: 2,
		redirection:
			"https://www.visitsingapore.com/editorials/singapores-iconic-green-spaces/#nature-wildlife",
	},
	jewel: {
		assetsUrl: "jewel/assets/2",
		winIndex: 2,
		redirection:
			"https://www.visitsingapore.com/singapore-itineraries/1-day-guide-to-jewel-changi/",
	},
	masjid: {
		assetsUrl: "masjid/assets/2",
		winIndex: 1,
		redirection:
			"https://www.visitsingapore.com/see-do-singapore/culture-heritage/",
	},
	pulau: {
		assetsUrl: "pulau/assets/1",
		winIndex: 2,
		redirection:
			"https://www.visitsingapore.com/editorials/explore-singapores-islands/",
	},
};

const data = ALL_DATA.pulau;

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const noInteractionTimeOut = 10000;

	const temperatureContainer = createDiv("temperatureContainer-id", {
		position: "absolute",
		width: "100%",
		height: "10%",
		bottom: "33%",
		textAlign: "center",
		color: "white",
		fontFamily: "sans-serif",
		userSelect: "none",
		fontSize: "4vi",
	});
	temperatureContainer.innerHTML = "-";

	const randomizeTemparature = () =>
		(temperatureContainer.innerHTML = `${Math.round(random12(27, 30))}°C`);

	const retrieveWeatherData = async (url: string) => {
		const params = {
			latitude: -24.5623,
			longitude: 29.315,
			current: "temperature_2m",
			forecast_days: 1,
		};

		try {
			const responses = await fetchWeatherApi(url, params);

			if (!responses || !Array.isArray(responses) || !responses[0]) {
				randomizeTemparature();
				return;
			}

			const response = responses[0];
			const current = response.current()!;
			const temperature = Math.round(current.variables(0)!.value());

			temperatureContainer.innerHTML = `${temperature}°C`;
		} catch {
			randomizeTemparature();
		}
	};

	const transitionBlockRed = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "red",
		width: "200%",
		height: "100%",
		left: "-200%",
		zIndex: "12",
		transition: "all 1s ease-out",
	});

	const transitionSmallBlockRed = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "crimson",
		width: "0%",
		height: "100%",
		right: "0",
		transition: "all 1s ease-out",
	});

	const transitionBlockGreen = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "green",
		width: "200%",
		height: "100%",
		left: "-200%",
		zIndex: "12",
		transition: "all 1s ease-out",
	});

	const transitionSmallBlockGreen = createDiv("question-id", {
		position: "absolute",
		backgroundColor: "darkgreen",
		width: "0%",
		height: "100%",
		right: "0",
		transition: "all 1s ease-out",
	});

	transitionBlockRed.appendChild(transitionSmallBlockRed);
	transitionBlockGreen.appendChild(transitionSmallBlockGreen);

	const bg = createDiv("bg-id", {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: "0%",
		bottom: "0%",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		backgroundImage: `url(https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/${data.assetsUrl}/screen_question.png)`,
		transition: "all .5s ease-out",
	});

	const optElements = ["A", "B", "C"].map((choice) => ({
		unselected: `https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/${data.assetsUrl}/${choice}_unselected.png`,
		selected: `https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/${data.assetsUrl}/${choice}_selected.png`,
	}));

	let isAnimPlayed = false;
	let isBtnClicked = false;

	const buttons: HTMLElement[] = optElements.map(
		({ unselected, selected }, i) => {
			const button = createDiv(`btn-${i}`, {
				position: "absolute",
				width: "30%",
				height: "10%",
				bottom: "50%",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
				transition: "opacity .5s ease-out",
				zIndex: "10",
				backgroundImage: `url(${unselected})`,
				cursor: "pointer",
				opacity: ".85",
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
					button.style.opacity = "1";
				}
			});

			button.addEventListener("mouseleave", () => {
				if (!isBtnClicked) {
					button.style.opacity = ".85";
				}
			});

			root.appendChild(button);

			button.addEventListener("click", (e: MouseEvent) => {
				e.stopImmediatePropagation();
				e.stopPropagation();
				if (!isAnimPlayed) {
					isAnimPlayed = true;
					if (!isBtnClicked) {
						isBtnClicked = true;
						retrieveWeatherData(
							"https://api.open-meteo.co/v1/forecast"
						);
					} else {
						randomizeTemparature();
					}

					button.style.backgroundImage = `url(${selected})`;
					setTimeout(() => {
						if (i === data.winIndex) {
							transitionBlockGreen.style.left = "125%";
							transitionSmallBlockGreen.style.width = "90%";
							bg.style.backgroundImage = `url(https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/${data.assetsUrl}/screen_true.png)`;
						} else {
							transitionBlockRed.style.left = "125%";
							transitionSmallBlockRed.style.width = "90%";
							bg.style.backgroundImage = `url(https://statics.dmcdn.net/d/PRODUCTION/2024/Travel_Visit_Singapore_Food_Interactive_Custom_2312_CAMPAIGN_FR_20s/${data.assetsUrl}/screen_false.png)`;
						}
						buttons.forEach((element) => {
							element.style.opacity = "0";
							element.style.pointerEvents = "none";
						});
					}, 500);
					setTimeout(
						() => bg.appendChild(temperatureContainer),
						1000
					);
				}
			});

			return button;
		}
	);

	setTimeout(() => {
		if (!isAnimPlayed) {
			isBtnClicked = true;
			buttons[data.winIndex].click();
		}
	}, noInteractionTimeOut);

	root.addEventListener("click", () => onClick(data.redirection));

	root.appendChild(bg);
	root.appendChild(transitionBlockGreen);
	root.appendChild(transitionBlockRed);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/common/assets/videos/video_15s_low.mp4",
	});
