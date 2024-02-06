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
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-logo.svg",
			{ backgroundColor: "black", backgroundSize: "30%" }
		);
		root.appendChild(bg);

		const bgs = [
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/bg-1.jpg",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/bg-2.jpg",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/bg-3.jpg",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/bg-4.jpg",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/bg-5.jpg",
		].map((url, i) => {
			const bg = new ImageDM(`${i}-id`, url);
			root.appendChild(bg);
			return [bg];
		});

		const arrows = ["left", "right"].map((name, i) => {
			const btn = createDiv(`${name}-id`, {
				position: "absolute",
				width: "80px",
				height: "80px",
				cursor: "pointer",
				textAlign: "center",
				lineHeight: "80px",
				borderRadius: "5px",
				left: i === 0 ? "0" : "unset",
				right: i === 1 ? "0" : "unset",
				top: "calc(50% - 40px)",
				backgroundColor: "crimson",
				userSelect: "none",
			});
			btn.innerHTML = name;
			root.appendChild(btn);
			return btn;
		});

		// Collection component
		const collection = new Collection(
			{
				id: "collection-DM",
				productUrls: [
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-1.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-2.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-3.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-4.png",
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-5.png",
					// "https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-6.png",
				],
				clickUrls: [
					"https://www.google.com/search?q=collection-0",
					"https://www.google.com/search?q=collection-1",
					"https://www.google.com/search?q=collection-2",
					"https://www.google.com/search?q=collection-3",
					"https://www.google.com/search?q=collection-4",
					// "https://www.google.com/search?q=collection-5",
				],
				onClick,
				clickUrl: "https://www.google.com/search?q=collection",
				arrows,
				debug: false,
				fadeObjects: bgs,
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
