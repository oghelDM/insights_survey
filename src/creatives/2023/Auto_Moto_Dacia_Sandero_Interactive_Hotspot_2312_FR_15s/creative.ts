import { VPAIDVideoPlayer } from "@app";
import { isMobile, trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { CreativeHandler, CreativeProps } from "@/types";
import { bounceIn, bounceOut, hotSpotBounce } from "@/animations";

interface Trio {
	hotspot: HTMLElement;
	card: HTMLElement;
	closeBtn: HTMLElement;
	floodLight: string;
}

const CLICK_URL =
	"https://ad.doubleclick.net/ddm/trackclk/N5648.5074599DAILYMOTIONDISPLAY0/B31124944.384612119;dc_trk_aid=575590790;dc_trk_cid=208000782;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	/////// BG ////////
	const bg = new ImageDM(
		"bg-dm",
		"https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/v2/bg.png"
	);
	bg.addEventListener("click", () => onClick(CLICK_URL));
	root.appendChild(bg);

	const products = [
		{
			spotLeft: "85%",
			spotTop: "45%",
			cardLeft: "66%",
			cardTop: "16%",
			floodLight:
				"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		},
		{
			spotLeft: "74%",
			spotTop: "38%",
			cardLeft: "66%",
			cardTop: "16%",
			floodLight:
				"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		},
		{
			spotLeft: "81%",
			spotTop: "36%",
			cardLeft: "66%",
			cardTop: "16%",
			floodLight:
				"https://ad.doubleclick.net/ddm/activity/src=13920045;type=invmedia;cat=adops003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		},
	];

	const isMobileDevice = isMobile();
	const trios: Trio[] = products.map((product, i) => {
		const hotspot = document.createElement("div");
		hotspot.id = `spot_${i}`;
		hotspot.style.position = "absolute";
		hotspot.style.width = isMobileDevice ? "6%" : "4.5%";
		hotspot.style.aspectRatio = "1/1";
		hotspot.style.left = product.spotLeft;
		hotspot.style.top = product.spotTop;
		hotspot.style.backgroundImage =
			"url(https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/hotspot.png)";
		hotspot.style.backgroundSize = "contain";
		hotspot.style.backgroundRepeat = "no-repeat";
		hotspot.style.cursor = "pointer";
		hotspot.style.pointerEvents = "auto";
		hotSpotBounce(hotspot, 1000, 250 * i);

		const card = document.createElement("div");
		card.setAttribute("id", `card_${i}`);
		card.style.position = "absolute";
		card.style.display = "none";
		card.style.width = "28%";
		card.style.height = "56%";
		card.style.left = `${product.cardLeft}`;
		card.style.top = `${product.cardTop}`;
		card.style.backgroundImage = `url(https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/v2/product${i}.png)`;
		card.style.backgroundSize = "contain";
		card.style.backgroundRepeat = "no-repeat";
		card.style.zIndex = "10";
		card.style.cursor = "pointer";
		card.style.pointerEvents = "none";

		const closeBtn = document.createElement("div");
		closeBtn.style.position = "absolute";
		closeBtn.style.top = "-3%";
		closeBtn.style.right = "-3%";
		closeBtn.style.width = "20%";
		closeBtn.style.height = "20%";
		closeBtn.style.cursor = "pointer";
		// closeBtn.style.backgroundColor = "red";

		card.appendChild(closeBtn);
		root.appendChild(hotspot);
		root.appendChild(card);

		return {
			hotspot,
			card,
			closeBtn,
			floodLight: product.floodLight,
		};
	});

	trios.forEach((trio) => {
		const { hotspot, card, closeBtn } = trio;

		card.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			onClick(CLICK_URL);
		});

		if (isMobileDevice) {
			hotspot.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				displayCard(trio);
			});
		} else {
			hotspot.addEventListener("mouseover", () => displayCard(trio));
			card.addEventListener("mouseleave", () => hideCard(trio));
		}

		closeBtn.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			hideCard(trio);
		});
	});

	const displayCard = ({ hotspot, card, floodLight }: Trio) => {
		trios.forEach((trio) => hideCard(trio, true));

		hotspot.style.pointerEvents = "none";
		hotspot.getAnimations()[0].pause();

		card.style.pointerEvents = "auto";
		card.style.display = "block";
		root.appendChild(card); // make sure that the card is above all other elements
		bounceIn(card, 700);
		trackPixel(floodLight);
	};

	const hideCard = ({ hotspot, card }: Trio, instant = false) => {
		// already hidden, no need to hide it again
		if (card.style.pointerEvents === "none") {
			return;
		}

		hotspot.style.pointerEvents = "auto";
		hotspot.getAnimations()[0].play();

		card.style.pointerEvents = "none";
		if (instant) {
			card.style.display = "none";
		} else {
			bounceOut(card, 450);
		}
	};
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/v2/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/v2/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Auto_Moto_Dacia_Sandero_Interactive_Hotspot_2312_FR_15s/assets/v2/video_high.mp4",
	});
