import { VPAIDVideoPlayer } from "@app";
import { Creative, CreativeProps } from "@/creative";
import { DepthMap } from "@/components/three/depthMap";

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const depthMap = new DepthMap({
			id: "depthMapDM",
			imageUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar.png",
			depthMapUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar-depthMap.png",
			onClick,
			clickUrl: "https://www.google.com/search?q=depthMap",
		});
		root.appendChild(depthMap);

		root.addEventListener("click", () =>
			onClick("https://www.google.com/search?q=avatar")
		);
	}
	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
			mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
			high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/liveStream/video_15s_low.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
