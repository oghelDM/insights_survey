import { CssType } from "@/types";
import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";
import { getClientXY, map, random12, trackPixel } from "@/utils/helper";

const ALL_DATA = {
	matin: {
		redirectUrl:
			"https://bs.serving-sys.com/Serving/adServer.bs?cn=trd&pli=1080073594&gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_68}&us_privacy=${US_PRIVACY}&adid=1092711390&ord=[timestamp]",
		floodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14181096;type=invmedia;cat=yopla00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		urlPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin_1/",
		A: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_high.mp4",
		},
		B: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_high.mp4",
		},
		C: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_high.mp4",
		},
	},
	// routine, same assets/video as 'matin'
	routine: {
		redirectUrl:
			"https://bs.serving-sys.com/Serving/adServer.bs?cn=trd&pli=1080073593&gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_68}&us_privacy=${US_PRIVACY}&adid=1092711382&ord=[timestamp]",
		floodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14181096;type=invmedia;cat=yopla001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		urlPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin_1/",
		A: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_A_high.mp4",
		},
		B: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_B_high.mp4",
		},
		C: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_matin/video_Colin_C_high.mp4",
		},
	},
	sante: {
		redirectUrl:
			"https://bs.serving-sys.com/Serving/adServer.bs?cn=trd&pli=1080073592&gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_68}&us_privacy=${US_PRIVACY}&adid=1092711385&ord=[timestamp]",
		floodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14181096;type=invmedia;cat=yopla0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		urlPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante_1/",
		A: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_A_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_A_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_A_high.mp4",
		},
		B: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_B_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_B_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_B_high.mp4",
		},
		C: {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_C_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_C_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/A_sante/video_Emilie_C_high.mp4",
		},
	},
};

///////////////////
const MODE = "sante";
const VERSION = "C";
///////////////////

const DATA = ALL_DATA[MODE][VERSION];
const REDIRECT_URL = ALL_DATA[MODE].redirectUrl;
const PREFIX = ALL_DATA[MODE].urlPrefix;
const FLOODLIGHT = ALL_DATA[MODE].floodlight;

class MyCreative extends Creative {
	phase = 0;
	wordingTop: HTMLElement;
	wordingBottom0: HTMLElement;
	wordingBottom1: HTMLElement;
	scoreContainer: HTMLElement;
	cableCar: HTMLElement;
	cta: HTMLElement;
	fallingFruit: HTMLElement;

	root: HTMLElement;
	gameContainer: HTMLElement;
	logo0: HTMLElement;
	logo1: HTMLElement;
	bowl: HTMLElement;
	scores: HTMLElement[];
	hasUserInteracted = false;

	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		this.root = root;

		const bg = new ImageDM("bg", `${PREFIX}bg0.png`);

		this.gameContainer = createDiv("gameContainer", {
			position: "absolute",
			width: "100%",
			height: "100%",
			left: "0",
			top: "0",
			transition: "opacity .4s",
		});

		this.wordingTop = new ImageDM(
			"wordingTop",
			`${PREFIX}wordingTop0.png`,
			{
				width: "39%",
				height: "13%",
				left: "unset",
				right: "0",
				top: "0",
				backgroundSize: "65%",
				transition: "opacity .4s",
				// backgroundColor: "green",
			}
		);

		[this.logo0, this.logo1] = [
			`${PREFIX}logo0.png`,
			`${PREFIX}logo1.png`,
		].map(
			(url, i) =>
				new ImageDM(`logo-${i}`, url, {
					width: "39%",
					height: "27%",
					left: "unset",
					right: "0",
					top: "12%",
					opacity: i === 0 ? "1" : "0",
					backgroundSize: "75%",
					transition: "all .4s",
					// backgroundColor: "red",
				})
		);

		[this.wordingBottom0, this.wordingBottom1] = [
			`${PREFIX}wordingBottom0.png`,
			`${PREFIX}wordingBottom1.png`,
		].map(
			(url, i) =>
				new ImageDM(`wordingBottom-${i}`, url, {
					width: "39%",
					height: "25%",
					left: "unset",
					right: "0",
					top: "42%",
					opacity: i === 0 ? "1" : "0",
					backgroundSize: "95%",
					backgroundPosition: "top",
					transition: "opacity .4s",
					// backgroundColor: "cyan",
				})
		);

		this.cta = new ImageDM(`cta`, `${PREFIX}cta.png`, {
			width: "32%",
			height: "48%",
			left: "65%",
			top: "34%",
			opacity: "0",
			backgroundSize: "contain",
			transition: "opacity .4s",
			// backgroundColor: "cyan",
		});

		this.scoreContainer = this.createScoreContainer();

		this.bowl = new ImageDM("bowl", `${PREFIX}bowl.png`, {
			width: "14%",
			height: "auto",
			aspectRatio: "274 / 160",
			left: "74%",
			top: "75%",
			backgroundSize: "cover",
			// backgroundColor: "green",
		});

		root.appendChild(bg);
		root.appendChild(this.wordingTop);
		root.appendChild(this.logo0);
		root.appendChild(this.logo1);
		root.appendChild(this.scoreContainer);
		root.appendChild(this.gameContainer);
		root.appendChild(this.cta);

		this.gameContainer.appendChild(this.wordingBottom0);
		this.gameContainer.appendChild(this.wordingBottom1);
		this.gameContainer.appendChild(this.bowl);

		root.addEventListener("click", () => onClick(REDIRECT_URL));
	}

	private createScoreContainer = () => {
		const scoreContainer = createDiv("scoreContainer", {
			position: "absolute",
			width: "34%",
			height: "33%",
			left: "17%",
			top: "66%",
			transition: "opacity .4s",
			// backgroundColor: "rgba(0,255,255,.6)",
		});

		this.scores = new Array(4).fill(0).map((_, i) => {
			const commonStyle: CssType = {
				width: "18%",
				height: "28%",
				left: `${31 * i}%`,
				// outline: "3px solid yellow",
			};

			const score = createDiv(`score-${i}`, {
				position: "absolute",
				...commonStyle,
				textAlign: "center",
				fontFamily: "arial",
				fontWeight: "600",
				color: "white",
				fontSize: "5vw",
				fontStyle: "bold",
				userSelect: "none",
			});
			score.innerHTML = "0";

			const fruit = new ImageDM(`fruit-${i}`, `${PREFIX}fruit${i}.png`, {
				...commonStyle,
				top: "32%",
				backgroundSize: "80%",
				backgroundPosition: "center center",
				transition: "top .6s",
			});

			scoreContainer.appendChild(score);
			scoreContainer.appendChild(fruit);

			return score;
		});

		return scoreContainer;
	};

	private startGame = () => {
		const w = 300;
		const canvas = document.createElement("canvas");
		canvas.id = "canvas";
		canvas.style.position = "absolute";
		canvas.width = w;
		canvas.height = w;
		canvas.style.width = "7%";
		canvas.style.aspectRatio = "1 / 1";
		canvas.style.left = "77%";
		canvas.style.top = "51%";
		canvas.style.transition = "opacity .4s";

		const ctx = canvas.getContext("2d");

		const counter = this.scores[0].cloneNode() as HTMLElement;
		counter.id = "counter";
		counter.style.left = canvas.style.left;
		counter.style.top = canvas.style.top;
		counter.style.width = canvas.style.width;
		counter.style.fontSize = "4vw";
		counter.style.height = "auto";
		counter.style.aspectRatio = "1 / 1";
		counter.style.lineHeight = "7vw";

		this.gameContainer.appendChild(canvas);
		this.gameContainer.appendChild(counter);

		let count = 0;
		const maxCount = 440;
		const nbPts = 40;
		// update the clock
		const intervalId = window.setInterval(() => {
			if (!ctx) {
				return;
			}
			ctx.clearRect(0, 0, w, w);

			ctx.fillStyle = "rgba(255,255,255,.6)";

			ctx.beginPath();
			ctx.moveTo(w / 2, 0);
			ctx.lineTo(w / 2, w / 2);
			for (let i = 0; i < nbPts; i++) {
				const minTheta =
					Math.PI / 2 + 2 * Math.PI * map(count, 0, maxCount, 0, 1);
				const maxTheta = Math.PI / 2 + 2 * Math.PI;
				const theta = -map(i, 0, nbPts - 1, minTheta, maxTheta);
				const x = (w / 2) * (1 + Math.cos(theta));
				const y = (w / 2) * (1 + Math.sin(theta));
				ctx.lineTo(x, y);
			}
			ctx.fill();

			ctx.strokeStyle = "white";
			ctx.beginPath();
			ctx.lineWidth = 10;
			ctx.arc(
				w / 2,
				w / 2,
				w / 2 - ctx.lineWidth / 2,
				0,
				Math.PI * 1.9999
			);
			ctx.stroke();

			count += 1;

			const deltaTime = 35;
			if (count === maxCount - 3 * deltaTime) {
				this.bounceCounter(counter, "3");
			} else if (count === maxCount - 2 * deltaTime) {
				this.bounceCounter(counter, "2");
			} else if (count === maxCount - 1 * deltaTime) {
				this.bounceCounter(counter, "1");
			} else if (count === maxCount) {
				this.bounceCounter(counter, "0");
			}

			if (count > maxCount) {
				window.clearInterval(intervalId);
				this.endGame();
			}
		}, 20);

		// bowl movement
		this.root.addEventListener("pointermove", (e: PointerEvent) => {
			if (!this.hasUserInteracted) {
				this.hasUserInteracted = true;
				trackPixel(FLOODLIGHT);
			}

			const { x, y } = getClientXY(e);

			const bowlBCR = this.bowl.getBoundingClientRect();
			const rootBCR = this.root.getBoundingClientRect();
			if (
				x > rootBCR.width * 0.61 + bowlBCR.width / 2 &&
				x < rootBCR.width - bowlBCR.width / 2
			) {
				this.bowl.style.left = `${
					((x - bowlBCR.width / 2) / rootBCR.width) * 100
				}%`;
			}
		});

		// animate fruits and detect if they fall in the bowl, update score accordingly
		new Array(20).fill(0).forEach((_, i) => {
			const top = "32%";
			const fruit = new ImageDM(
				`fruit-falling-${i}`,
				`${PREFIX}fruit${i % 4}.png`,
				{
					width: "5%",
					height: "auto",
					aspectRatio: "375 / 383",
					left: `${random12(60, 96)}%`,
					top,
					opacity: "0",
					backgroundPosition: "cover",
					// transition: "top .6s",
				}
			);
			this.root.appendChild(fruit);

			const animation = fruit.animate(
				[
					{ opacity: 0, top },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 1 },
					{ opacity: 0, top: "72%" },
				],
				{
					delay: i * 400,
					duration: 2000,
					fill: "forwards",
					easing: "linear(0, 1)",
				}
			);

			animation.addEventListener("finish", () => {
				const fruitBCR = fruit.getBoundingClientRect();
				const bowlBCR = this.bowl.getBoundingClientRect();

				if (
					bowlBCR.x < fruitBCR.x + fruitBCR.width / 2 &&
					bowlBCR.x + bowlBCR.width > fruitBCR.x + fruitBCR.width / 2
				) {
					this.scores[i % 4].innerHTML = `${
						parseInt(this.scores[i % 4].innerHTML) + 1
					}`;
				}
			});
		});

		// make sure that all the fruits are behind the clock and wordings
		this.root.appendChild(this.gameContainer);
	};

	private endGame = () => {
		setTimeout(() => (this.gameContainer.style.opacity = "0"), 500);
		setTimeout(() => {
			this.wordingTop.style.opacity = "0";

			this.logo0.style.opacity = "0";
			this.logo0.style.top = "2%";
			this.logo0.style.backgroundSize = "90%";

			this.logo1.style.opacity = "1";
			this.logo1.style.top = "2%";
			this.logo1.style.backgroundSize = "90%";

			this.cta.style.opacity = "1";
		}, 800);
	};

	private bounceCounter = (counter: HTMLElement, innerHtml: string) => {
		counter.innerHTML = innerHtml;

		counter.animate(
			[{ scale: 1.8, opacity: 0 }, { opacity: 1 }, { scale: 1 }],
			{
				delay: 0,
				duration: 300,
				fill: "forwards",
				easing: "ease-in",
			}
		);
	};

	public videoTimeUpdate(completionPercent: number): void {
		if (completionPercent > 8 && this.phase === 0) {
			this.wordingBottom0.style.opacity = "0";
			this.phase = 1;
		}
		if (completionPercent > 10 && this.phase === 1) {
			this.wordingBottom1.style.opacity = "1";
			this.phase = 2;
		}
		if (completionPercent > 15 && this.phase === 2) {
			this.phase = 3;
			this.startGame();
		}
	}

	public getVideos() {
		return {
			low: DATA.low,
			mid: DATA.mid,
			high: DATA.high,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
