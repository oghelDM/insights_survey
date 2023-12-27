import { CreativeProps } from "@/types";
import { isMobile } from "@/utils/helper";
import { createDiv } from "@/utils/divMaker";
import { ImageDM } from "@/components/image";
import { bounceIn, bounceOut, hotSpotBounce } from "@/animations";

export type HotSpotsType = (
	root: HTMLElement,
	creativeProps: CreativeProps,
	props: HotSpotProps
) => void;

interface HotSpotProduct {
	clickUrl?: string; // redirection click url for the product (if any)
	productUrl: string; // product image url
	hotSpotUrl: string; // hotspot image url
	spotLeft: string; // css left position of the product hotspot
	spotTop: string; // css top position of the product hotspot
	cardLeft: string; // css left position of the product card
	cardTop: string; // css top position of the product card
}

interface HotSpotProps {
	clickUrl: string; // redirection click url
	bgUrl: string; // creative background url
	products: HotSpotProduct[];
	cardStyle?: Partial<CSSStyleDeclaration>; // css style to override the card style
	hotspotStyle?: Partial<CSSStyleDeclaration>; // css style to override the hotspot style
	closeBtnStyle?: Partial<CSSStyleDeclaration>; // css style to override the product card's close button style
}

interface Trio {
	hotspot: HTMLElement;
	card: HTMLElement;
	closeBtn: HTMLElement;
}

const defaultProps: Required<HotSpotProps> = {
	clickUrl: "https://www.dailymotion.fr",
	bgUrl: "https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/bg.png",
	products: [
		{
			clickUrl: "https://www.google.fr?q=product0",
			productUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product0.png",
			hotSpotUrl:
				"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/hotspot.png",
			spotLeft: "94%",
			spotTop: "33%",
			cardLeft: "66%",
			cardTop: "16%",
		},
	],
	cardStyle: {},
	hotspotStyle: {},
	closeBtnStyle: {},
};

export const hotSpotsTemplate: HotSpotsType = (
	root: HTMLElement,
	{ onClick }: CreativeProps,
	hotSpotProps: HotSpotProps
) => {
	const actualProps: Required<HotSpotProps> = {
		...defaultProps,
		...hotSpotProps,
	};

	const {
		clickUrl,
		bgUrl,
		products,
		cardStyle,
		hotspotStyle,
		closeBtnStyle,
	} = actualProps;

	const bg = new ImageDM("bg-dm", bgUrl);
	bg.addEventListener("click", () => onClick(clickUrl));
	root.appendChild(bg);

	const isMobileDevice = isMobile();
	const trios: Trio[] = products.map((product, i) => {
		const hotspot = createDiv(`spot_${i}`, {
			position: "absolute",
			width: isMobileDevice ? "6%" : "4.5%",
			aspectRatio: "1/1",
			left: product.spotLeft,
			top: product.spotTop,
			backgroundImage: `url(${product.hotSpotUrl})`,
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat",
			cursor: "pointer",
			pointerEvents: "auto",
			...hotspotStyle,
		});
		hotSpotBounce(hotspot, 1000, 250 * i);

		const card = createDiv(`card_${i}`, {
			position: "absolute",
			display: "none",
			width: "28%",
			height: "56%",
			left: product.cardLeft,
			top: product.cardTop,
			backgroundImage: `url(${product.productUrl})`,
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat",
			zIndex: "10",
			cursor: "pointer",
			pointerEvents: "none",
			...cardStyle,
		});
		card.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			onClick(product.clickUrl || clickUrl);
		});

		const closeBtn = createDiv(`close-btn_${i}`, {
			position: "absolute",
			top: "-3%",
			right: "-3%",
			width: "20%",
			height: "20%",
			cursor: "pointer",
			// backgroundColor: "red"
			...closeBtnStyle,
		});

		card.appendChild(closeBtn);
		root.appendChild(hotspot);
		root.appendChild(card);

		return {
			hotspot,
			card,
			closeBtn,
		};
	});

	trios.forEach((trio) => {
		const { hotspot, card, closeBtn } = trio;

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

	const displayCard = ({ hotspot, card }: Trio) => {
		trios.forEach((trio) => hideCard(trio, true));

		hotspot.style.pointerEvents = "none";
		hotspot.getAnimations()[0].pause();

		card.style.pointerEvents = "auto";
		card.style.display = "block";
		root.appendChild(card); // make sure that the card is above all other elements
		bounceIn(card, 700);
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
