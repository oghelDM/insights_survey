import { VPAIDVideoPlayer } from "@app";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";
import { Collection } from "@/components/collection";
import { ImageDM } from "@/components/image";

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();

		const bg = new ImageDM(
			"bg-id",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/bg-2.jpg",
			{ backgroundColor: "black" }
		);
		root.appendChild(bg);

		const arrows = ["left", "right"].map((name, i) => {
			const btn = new ImageDM(
				`${name}-id`,
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/carrousel/arrow_left.png",
				{
					width: "unset",
					height: "12%",
					aspectRatio: "1 / 1",
					cursor: "pointer",
					left: i === 0 ? "5%" : "unset",
					right: i === 1 ? "5%" : "unset",
					top: "44%",
					rotate: i === 0 ? "" : "180deg",
				}
			);
			root.appendChild(btn);
			return btn;
		});

		// Collection component
		const collection = new Collection(
			{
				id: "collection-DM",
				productUrls: [
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/product-1.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/product-2.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/product-3.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/product-4.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/oceanSpray-drink/product-5.png",
				],
				clickUrls: [
					"https://www.google.com/search?q=collection-0",
					"https://www.google.com/search?q=collection-1",
					"https://www.google.com/search?q=collection-2",
					"https://www.google.com/search?q=collection-3",
					"https://www.google.com/search?q=collection-4",
				],
				onClick,
				clickUrl: "https://www.google.com/search?q=collection",
				arrows,
				debug: false,
				styleProductFocused: {
					width: "100%",
					height: "100%",
					backgroundPosition: "center center",
					backgroundSize: "60% auto",
					backgroundRepeat: "no-repeat",
					top: "0%",
					left: "0%",
					opacity: "1",
					position: "absolute",
					rotate: "0deg",
				},
				styleProductOutLeft: {
					top: "-70%",
					opacity: "0",
					rotate: "-120deg",
				},
				styleProductOutRight: {
					top: "-70%",
					opacity: "0",
					rotate: "120deg",
				},
				styleProductInLeft: {
					top: "60%",
					opacity: "0",
					rotate: "20deg",
				},
				styleProductInRight: {
					top: "60%",
					opacity: "0",
					rotate: "-20deg",
				},
				introAnimationProperties: {
					delay: 0,
					duration: 400,
					easing: "cubic-bezier(.54,0,.76,1.35)",
				},
				outroAnimationProperties: {
					delay: 0,
					duration: 400,
					easing: "cubic-bezier(.01,.58,.17,1)",
				},
			},
			{ width: "50%", left: "25%" }
		);
		root.appendChild(collection);
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
