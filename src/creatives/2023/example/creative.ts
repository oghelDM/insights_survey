import { VPAIDVideoPlayer } from "@app";
import { Cuber } from "@/components/cuber";
import { CreativeHandler, CreativeProps, VIDEO_QUALITY } from "@/types";

export const videos = [
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
	"https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
];

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	// Cuber component
	const cuber = new Cuber({
		id: "cuberDM",
		products: [
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
		onClick: () => console.log("cuber click"),
		parent: root,
	});
	root.appendChild(cuber);
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		[VIDEO_QUALITY.LOW]:
			"https://statics.dmcdn.net/d/vpaid/split/assets/video_low.mp4",
		[VIDEO_QUALITY.MID]:
			"https://statics.dmcdn.net/d/vpaid/split/assets/video_mid.mp4",
		[VIDEO_QUALITY.HIGH]:
			"https://statics.dmcdn.net/d/vpaid/split/assets/video_high.mp4",
	});
