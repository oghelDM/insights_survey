import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const ALL_DATA = {
	igbt: {
		clickUrlLeft:
			"https://www.youtube.com/watch?v=bCNJPY2h2dY&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-igbt-fr",
		clickUrlRight:
			"https://www.mouser.fr/new/infineon/Infineon-trenchstop-igbt7-feature/?&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-igbt-fr",
		assetPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Mouser_Electronics_IGBT_Skin_Static_2402_40s/assets/igbt_1/",
	},
	fusion: {
		clickUrlLeft:
			"https://www.youtube.com/watch?v=4aWEA-IYsyM&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-sensor-fusion-fr",
		clickUrlRight:
			"https://www.mouser.fr/new/stmicroelectronics/stmemsaccelerometers/?&utm_source=dailymotion&utm_medium=video&utm_campaign=what-is-sensor-fusion-fr",
		assetPrefix:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Mouser_Electronics_IGBT_Skin_Static_2402_40s/assets/fusion_1/",
	},
};

const DATA = ALL_DATA.igbt;

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const bg = new ImageDM("bg", `${DATA.assetPrefix}bg.png`, {
			position: "absolute",
			width: "100%",
			height: "100%",
		});

		const clickZoneRight = new ImageDM("click-zone-right", "", {
			transform: "rotate(180deg)",
			right: "0%",
			width: "31%",
		});

		root.appendChild(bg);
		root.appendChild(clickZoneRight);

		root.addEventListener("click", () => onClick(DATA.clickUrlLeft));
		clickZoneRight.addEventListener("click", () =>
			onClick(DATA.clickUrlRight)
		);
	}

	public getVideos() {
		return {
			low: `${DATA.assetPrefix}video_low.mp4`,
			mid: `${DATA.assetPrefix}video_mid.mp4`,
			high: `${DATA.assetPrefix}ideo_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
