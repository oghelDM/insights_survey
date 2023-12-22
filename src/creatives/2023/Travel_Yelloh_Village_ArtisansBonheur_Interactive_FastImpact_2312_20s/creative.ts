import { VPAIDVideoPlayer } from "@app";
import { createDiv } from "@/utils/divMaker";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick, stopAd, setAdVolume }: CreativeProps
) => {
	const maxSeconds = 5;
	const startDate = Date.now();

	root.addEventListener("click", () =>
		onClick("https://www.yellohvillage.fr")
	);

	const bg = new ImageDM(
		"bg-dm",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/bg.png",
		{ pointerEvents: "none", opacity: 0, transition: "opacity .4s" }
	);

	const cta = createDiv("cta-dm", {
		position: "absolute",
		width: "23%",
		height: "13%",
		backgroundColor: "rgba(0,0,0,.8)",
		cursor: "pointer",
		right: "2%",
		bottom: "16%",
		color: "white",
		textAlign: "center",
		lineHeight: "320%",
		borderRadius: "4px",
		fontSize: "2.2vi",
		fontFamily: "sans-serif",
		userSelect: "none",
		pointerEvents: "none",
	});
	cta.innerHTML = "skip video";

	root.appendChild(cta);
	root.appendChild(bg);

	const intervaleId = setInterval(() => {
		let remainingSeconds = (Date.now() - startDate) / 1000;
		remainingSeconds = maxSeconds - Math.floor(remainingSeconds);
		if (remainingSeconds >= 0) {
			cta.innerHTML = `Passer dans ${remainingSeconds}`;
		} else {
			cta.innerHTML = "Passer vite ⇥";
			clearInterval(intervaleId);
			cta.style.pointerEvents = "auto";
			cta.addEventListener("click", (e) => skipVideo(e));
		}
	}, 100);

	const skipVideo = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setAdVolume(0);
		bg.style.opacity = "1";
		cta.style.pointerEvents = "none";
		setTimeout(() => stopAd(), 3000);
	};
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, [
		`https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_low.mp4`,
		`https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_mid.mp4`,
		`https://statics.dmcdn.net/d/PRODUCTION/2023/Travel_Yelloh_Village_ArtisansBonheur_Interactive_FastImpact_2312_20s/assets/video_high.mp4`,
	]);
