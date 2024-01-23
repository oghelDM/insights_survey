import { VPAIDVideoPlayer } from "@app";
import { LiveStreamData } from "@/types";
import { Creative, CreativeProps } from "@/creative";
import { DepthMap } from "@/components/three/depthMap";

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const depthMap = new DepthMap(
			{
				id: "depthMapDM",
				imageUrl:
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar.png",
				depthMapUrl:
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar-depthMap.png",
				onClick,
				clickUrl: "https://www.google.com/search?q=depthMap",
			},
			{ width: "30%", right: 0 }
		);
		root.appendChild(depthMap);

		root.addEventListener("click", () =>
			onClick("https://www.google.com/search?q=avatar")
		);
	}

	public getLiveStreamData(): LiveStreamData | undefined {
		return {
			// url: "https://www.dailymotion.com/player/metadata/video/x2lefik?locale=en&dmV1st=12f9c0c6-0342-42a6-b82c-8f12e3aa7ad5&dmTs=423062&is_native_app=0",
			// url: "https://www.dailymotion.com/cdn/live/video/x2lefik.m3u8?sec=NTkR1ilZ2-X2I7meMAG74VEKuGaG69b6vw0xg5H_74jX4ehDINQ9-0Rz1-Oj8oqG&dmTs=423062&dmV1st=12f9c0c6-0342-42a6-b82c-8f12e3aa7ad5",
			url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
			// url: 'https://live-par-1-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8',
			duration: 15,
			Hls: require("../../common/utils/hlsLib"),
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
