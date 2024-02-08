import { VPAIDVideoPlayer } from "@app";
import { Creative, CreativeProps } from "@/creative";
import { viewShopTemplate } from "@creatives/templates/ViewShop";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		viewShopTemplate(root, creativeProps, {
			clickUrl: "https://www.dailymotion.fr",
			hotSpotUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/hotspot.png",
			pagesProps: [
				{
					videoProgress: 8,
					bgUrl: "https://plus.unsplash.com/premium_photo-1706896055883-880d1710dc2f?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					products: [
						{
							clickUrl: "https://www.google.fr?q=product0",
							productUrl:
								"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product0.png",
							spotLeft: "94%",
							spotTop: "33%",
							cardLeft: "66%",
							cardTop: "16%",
						},
					],
				},
			],
			cardStyle: {},
			hotspotStyle: {},
		});
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
