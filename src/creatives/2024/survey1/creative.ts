import { VPAIDVideoPlayer } from "@/app/app";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";

const prefixUrl =
	"https://statics.dmcdn.net/d/PRODUCTION/2024/Auto_Moto_Dacia_Jogger_Interactive_Hotspot_2402_FR_15s/assets/v1/";
const clickUrl =
	"https://ad.doubleclick.net/ddm/trackclk/N5648.5074599DAILYMOTIONDISPLAY0/B31626447.389151874;dc_trk_aid=580620240;dc_trk_cid=211534146;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		const myDiv = new ImageDM("myDiv", "", { backgroundColor: "crimson" });
		root.appendChild(myDiv);
	}

	public getVideos() {
		return {
			low: `${prefixUrl}video_low.mp4`,
			mid: `${prefixUrl}video_mid.mp4`,
			high: `${prefixUrl}video_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
