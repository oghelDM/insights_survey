import { VPAIDVideoPlayer } from "@app";
import { Cuber } from "@/components/cuber";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";

export const videos = [
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
];

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	// BG
	const bg = new ImageDM(
		"bg-dm",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Hyundai_Tucson_Interactive_Carousel_2311_CAMPAIGN_ES_20s/assets/fg.png"
	);
	root.appendChild(bg);

	// Cuber component
	const cuber = new Cuber({
		id: "cuberDM",
		productUrls: [
			"https://images.unsplash.com/photo-1696464795756-2d92a11c504f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1695496573688-3e0e8ac8657e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1695456261833-3794ab617deb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
			"https://plus.unsplash.com/premium_photo-1694670200212-3122e7c5c9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1695878026745-1d07d1088045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
		],
		focusedElementWidth: 40,
		focusedElementHeight: 80,
		faceLeft: 30,
		faceBottom: 10,
		onClick,
		clickUrl: "https://www.google.com/search?q=example",
		parent: root,
	});
	root.appendChild(cuber);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
	});
