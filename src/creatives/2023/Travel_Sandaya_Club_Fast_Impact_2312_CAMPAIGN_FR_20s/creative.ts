import { VPAIDVideoPlayer } from "@app";
import { createDiv } from "@/utils/divMaker";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const MODE = "2_1"; // 1_1 or 2_1

class MyCreative extends Creative {
	constructor(
		root: HTMLElement,
		{ onClick, setAdVolume, stopAd }: CreativeProps
	) {
		super();

		const maxSeconds = 5;
		const startDate = Date.now();

		root.addEventListener("click", () =>
			onClick(
				"https://www.sandaya.fr/promotions-et-offres-speciales/do-you-days#campings?utm_source=cmi&utm_medium=display&utm_campaign=dyd"
			)
		);

		const bg = new ImageDM(
			"bg-dm",
			`https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Sandaya_Club_Fast_Impact_2312_CAMPAIGN_FR_20s/assets/${MODE}/bg.png`,
			{ pointerEvents: "none", opacity: "0", transition: "opacity .4s" }
		);

		const cta = createDiv("cta-dm", {
			position: "absolute",
			width: "23%",
			height: "13%",
			backgroundColor: "rgba(0,0,0,.8)",
			cursor: "pointer",
			right: "4%",
			bottom: "18%",
			color: "white",
			textAlign: "center",
			lineHeight: "320%",
			borderRadius: "4px",
			fontSize: "2.2vi",
			fontFamily: "sans-serif",
			userSelect: "none",
			pointerEvents: "none",
		});
		cta.innerHTML = "skip video";

		root.appendChild(cta);
		root.appendChild(bg);

		const intervaleId = setInterval(() => {
			let remainingSeconds = (Date.now() - startDate) / 1000;
			remainingSeconds = maxSeconds - Math.floor(remainingSeconds);
			if (remainingSeconds >= 0) {
				cta.innerHTML = `Passer dans ${remainingSeconds}`;
			} else {
				cta.innerHTML = "Passer vite ⇥";
				clearInterval(intervaleId);
				cta.style.pointerEvents = "auto";
				cta.addEventListener("click", (e) => skipVideo(e));
			}
		}, 100);

		const skipVideo = (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setAdVolume(0);
			bg.style.opacity = "1";
			cta.style.pointerEvents = "none";
			setTimeout(() => stopAd(), 3000);
		};
	}
	public getVideos() {
		return {
			low: `https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Sandaya_Club_Fast_Impact_2312_CAMPAIGN_FR_20s/assets/${MODE}/video_low.mp4`,
			mid: `https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Sandaya_Club_Fast_Impact_2312_CAMPAIGN_FR_20s/assets/${MODE}/video_mid.mp4`,
			high: `https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Sandaya_Club_Fast_Impact_2312_CAMPAIGN_FR_20s/assets/${MODE}/video_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
