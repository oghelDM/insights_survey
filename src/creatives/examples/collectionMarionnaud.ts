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
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/bg2.png"
		);
		root.appendChild(bg);

		const arrows = ["left", "right"].map((name, i) => {
			const btn = new ImageDM(
				`${name}-id`,
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/carrousel/arrow_left.png",
				{
					width: "unset",
					height: "8%",
					aspectRatio: "1 / 1",
					cursor: "pointer",
					left: i === 0 ? "1%" : "26%",
					top: "38%",
					rotate: i === 0 ? "" : "180deg",
					// backgroundColor: "rgba(255, 0, 0, .6)",
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
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/product-0.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/product-1.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/product-2.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/product-3.png",
				],
				clickUrls: [
					"https://www.google.com/search?q=collection-0",
					"https://www.google.com/search?q=collection-1",
					"https://www.google.com/search?q=collection-2",
					"https://www.google.com/search?q=collection-3",
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
					scale: "0",
				},
				styleProductOutRight: {
					opacity: "0",
					scale: "0",
				},
				styleProductInLeft: {
					top: "60%",
					opacity: "0",
				},
				styleProductInRight: {
					top: "-60%",
					opacity: "0",
				},
				introAnimationProperties: {
					delay: 120,
					duration: 400,
					easing: "cubic-bezier(.01,.58,.17,1)",
				},
				outroAnimationProperties: {
					delay: 0,
					duration: 400,
					easing: "cubic-bezier(.01,.58,.17,1)",
				},
			},
			{ width: "23%", left: "4%" }
		);
		root.appendChild(collection);

		arrows.forEach((arrow) => root.appendChild(arrow));
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/video_low.mp4",
			high: "https://statics.dmcdn.net/d/TESTS/fwk/assets/products/marionnaud-perfumes/video_low.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
