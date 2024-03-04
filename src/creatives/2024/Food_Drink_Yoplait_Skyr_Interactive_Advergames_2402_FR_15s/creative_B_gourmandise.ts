import { CssType } from "@/types";
import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const ALL_DATA = {
	redirectUrl:
		"https://bs.serving-sys.com/Serving/adServer.bs?cn=trd&pli=1080073595&gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_68}&us_privacy=${US_PRIVACY}&adid=1092711380&ord=[timestamp]",
	floodlight:
		"https://ad.doubleclick.net/ddm/activity/src=14181096;type=invmedia;cat=yopla000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
	A: {
		low: "video_Coralie_A_low.mp4",
		mid: "video_Coralie_A_mid.mp4",
		high: "video_Coralie_A_high.mp4",
	},
	B: {
		low: "video_Coralie_B_low.mp4",
		mid: "video_Coralie_B_mid.mp4",
		high: "video_Coralie_B_high.mp4",
	},
	C: {
		low: "video_Coralie_C_low.mp4",
		mid: "video_Coralie_C_mid.mp4",
		high: "video_Coralie_C_high.mp4",
	},
};

const DATA = ALL_DATA.C;
const urlPrefix =
	"https://statics.dmcdn.net/d/PRODUCTION/2024/Food_Drink_Yoplait_Skyr_Interactive_Advergames_2402_FR_15s/assets/B_gourmandise/";

class MyCreative extends Creative {
	phase = 0;
	wording0: HTMLElement;
	gameContainer: HTMLElement;
	cableCar: HTMLElement;
	cta1: HTMLElement;
	cta2: HTMLElement;
	fallingFruit: HTMLElement;

	root: HTMLElement;
	creativeProps: CreativeProps;

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.root = root;
		this.creativeProps = creativeProps;

		const bg = new ImageDM("bg", `${urlPrefix}bg0.png`);

		this.wording0 = new ImageDM("wording0", `${urlPrefix}wording0.png`, {
			width: "34%",
			height: "57%",
			left: "unset",
			right: "0",
			top: "8%",
			backgroundSize: "contain",
			transition: "opacity .4s",
			// backgroundColor: "yellow",
		});

		this.gameContainer = createDiv("gameContainer", {
			position: "absolute",
			width: "34%",
			height: "67%",
			right: "0",
			top: "0%",
			opacity: "0",
			transition: "opacity .4s",
			overflow: "hidden",
			// backgroundColor: "rgba(0,255,255,.6)",
		});

		const wording1 = new ImageDM("wording1", `${urlPrefix}wording1.png`, {
			width: "90%",
			height: "37%",
			left: "5%",
			backgroundSize: "contain",
			// backgroundColor: "crimson",
		});
		const pot = new ImageDM("pot", `${urlPrefix}pot.png`, {
			width: "90%",
			height: "37%",
			left: "5%",
			bottom: "0%",
			backgroundSize: "contain",
			// backgroundColor: "lavender",
		});

		[this.cta1, this.cta2] = [
			`${urlPrefix}cta0.png`,
			`${urlPrefix}cta1.png`,
		].map(
			(url, i) =>
				new ImageDM(`cta-${i}`, url, {
					width: "28%",
					height: "12%",
					right: "3%",
					bottom: "19%",
					opacity: "0",
					transition: "opacity .4s",
					backgroundSize: "contain",
					pointerEvents: "none",
					cursor: "pointer",
					// backgroundColor: "red",
				})
		);

		this.cta1.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.startGame();
		});

		this.cableCar = this.createCableCar();

		this.gameContainer.appendChild(wording1);
		this.gameContainer.appendChild(this.cableCar);
		this.gameContainer.appendChild(pot);

		root.appendChild(bg);
		root.appendChild(this.wording0);
		root.appendChild(this.gameContainer);
		root.appendChild(this.cta1);
		root.appendChild(this.cta2);
	}

	private createCableCar = () => {
		const cableCar = createDiv("cableCar", {
			width: "100%",
			position: "absolute",
			height: "37%",
			left: "0%",
			top: "38%",
			transition: "left 3.5s",
			// backgroundColor: "rgba(0,0,255,.6)",
		});

		const bar = new ImageDM("bar", `${urlPrefix}bar.png`, {
			width: "300%",
			height: "7%",
			backgroundSize: "100% 100%",
			backgroundPosition: "left bottom",
		});

		for (let i = 0; i < 8; i++) {
			const commonStyle: CssType = {
				width: "18%",
				height: "48%",
				top: "6%",
				left: `${-4 + 40 * i}%`,
			};

			const fruit = new ImageDM(
				`fruit-${i}`,
				`${urlPrefix}fruit${i % 3}.png`,
				{
					...commonStyle,
					backgroundSize: "75%",
					backgroundPosition: "center center",
					transition: "top .6s",
				}
			);
			const gondola = new ImageDM(
				`gondola-${i}`,
				`${urlPrefix}gondola.png`,
				{
					...commonStyle,
					backgroundSize: "contain",
					backgroundPosition: "center top",
				}
			);
			if (i === 6) {
				this.fallingFruit = fruit;
			}

			cableCar.appendChild(fruit);
			cableCar.appendChild(gondola);
		}

		cableCar.appendChild(bar);

		return cableCar;
	};

	private startGame = () => {
		trackPixel(ALL_DATA.floodlight);
		this.cta1.style.pointerEvents = "none";
		this.cableCar.style.left = "-194%";

		setTimeout(() => {
			this.fallingFruit.style.top = "76%";
		}, 4000);

		setTimeout(() => {
			this.root.addEventListener("click", () =>
				this.creativeProps.onClick(ALL_DATA.redirectUrl)
			);

			this.gameContainer.style.opacity = "0";
			this.cta1.style.opacity = "0";

			this.cta2.style.opacity = "1";
			this.cta2.style.pointerEvents = "auto";
			this.wording0.style.backgroundImage = `url(${urlPrefix}packshot2.png)`;
			this.wording0.style.opacity = "1";
		}, 6000);
	};

	public videoTimeUpdate(completionPercent: number): void {
		if (completionPercent > 12 && this.phase === 0) {
			this.wording0.style.opacity = "0";
		}
		if (completionPercent > 14 && this.phase === 0) {
			this.gameContainer.style.opacity = "1";
			this.cta1.style.opacity = "1";
			this.cta1.style.pointerEvents = "auto";
			this.phase = 1;
		}
	}

	public getVideos() {
		return {
			low: `${urlPrefix}${DATA.low}`,
			mid: `${urlPrefix}${DATA.mid}`,
			high: `${urlPrefix}${DATA.high}`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
