import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { Creative, CreativeProps } from "@/creative";
import { Collection } from "@/components/collection";

const isKids = true; // Cucina otherwise

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const bg = new ImageDM(
			"bg-id",
			isKids
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/bg.png"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/bg.png"
		);
		bg.addEventListener("click", (e) => {
			e.stopPropagation();
			e.preventDefault();
			trackPixel(
				"https://track.adform.net/adfserve/?bn=71618531;1x1inv=1;srctype=3;ord=[timestamp]"
			);
			onClick("https://track.adform.net/C/?bn=71618531");
		});
		root.appendChild(bg);

		const arrows = ["left", "right"].map((name, i) => {
			const btn = new ImageDM(`${name}-id`, "", {
				width: "unset",
				height: "8%",
				aspectRatio: "1 / 1",
				cursor: "pointer",
				left: i === 0 ? "72%" : "96%",
				top: "43%",
				// backgroundColor: "rgba(255, 0, 0, .6)",
			});
			root.appendChild(btn);
			return btn;
		});

		// Collection component
		const collection = new Collection(
			{
				id: "collection-DM",
				productUrls: isKids
					? [
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/product0.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/product1.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/product2.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/product3.png",
					  ]
					: [
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/product0.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/product1.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/product2.png",
							"https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/product3.png",
					  ],
				clickUrls: isKids
					? [
							"https://track.adform.net/C/?bn=71618529",
							"https://track.adform.net/C/?bn=71618536",
							"https://track.adform.net/C/?bn=71618533",
							"https://track.adform.net/C/?bn=71618532",
					  ]
					: [
							"https://track.adform.net/C/?bn=71618537",
							"https://track.adform.net/C/?bn=71618534",
							"https://track.adform.net/C/?bn=71618528",
							"https://track.adform.net/C/?bn=71618530",
					  ],
				floodlights: isKids
					? [
							"https://track.adform.net/adfserve/?bn=71618529;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618536;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618533;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618532;1x1inv=1;srctype=3;ord=[timestamp]",
					  ]
					: [
							"https://track.adform.net/adfserve/?bn=71618537;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618534;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618528;1x1inv=1;srctype=3;ord=[timestamp]",
							"https://track.adform.net/adfserve/?bn=71618530;1x1inv=1;srctype=3;ord=[timestamp]",
					  ],
				onClick,
				clickUrl: "https://www.google.com/search?q=collection",
				arrows,
				debug: false,
				styleProductFocused: {
					width: "100%",
					height: "100%",
					backgroundPosition: "center center",
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					top: "0%",
					left: "0%",
					opacity: "1",
					scale: "1",
					position: "absolute",
				},
				styleProductOutLeft: {
					opacity: "0",
					left: "-7%",
				},
				styleProductOutRight: {
					opacity: "0",
					left: "7%",
				},
				styleProductInLeft: {
					opacity: "0",
					left: "-7%",
				},
				styleProductInRight: {
					opacity: "0",
					left: "7%",
				},
				introAnimationProperties: {
					delay: 0,
					duration: 400,
					easing: "ease-in-out",
				},
				outroAnimationProperties: {
					delay: 0,
					duration: 400,
					easing: "ease-in-out",
				},
			},
			{
				width: "20%",
				height: "50%",
				right: "4%",
				top: "25%",
				// backgroundColor: "lavender",
			}
		);
		root.appendChild(collection);

		arrows.forEach((arrow) => root.appendChild(arrow));
	}

	public getVideos() {
		return {
			low: isKids
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/video_low.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/video_low.mp4",
			mid: isKids
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/video_mid.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/video_mid.mp4",
			high: isKids
				? "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsKids_1/video_high.mp4"
				: "https://statics.dmcdn.net/d/PRODUCTION/2024/Home_Garden_Ikea_Animated_Carousel_2402_CAMPAIGN_EN_15s/assetsCucina_2/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
