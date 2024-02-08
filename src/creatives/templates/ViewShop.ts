import { CssType } from "@/types";
import { CreativeProps } from "@/creative";
import { ImageDM } from "@/components/image";
import { createDiv } from "@/utils/divMaker";
import { HotSpotProduct, hotSpotsTemplate } from "./HotSpots";

export type ViewShopType = (
	root: HTMLElement,
	creativeProps: CreativeProps,
	props: ViewShopProps
) => (percentage: number) => void;

interface PageProps {
	videoProgress: number; // video percentage progress when the card should be added to the screen
	bgUrl: string;
	thumbnailUrl: string;
	products: HotSpotProduct[];
}

interface ViewShopProps {
	clickUrl: string; // redirection click url
	pagesProps: PageProps[];
	cardStyle?: CssType; // css style to override the card style
	hotspotStyle?: CssType; // css style to override the hotspot style
	hotSpotUrl: string; // hotspot style bg image
}

const defaultProps: Required<ViewShopProps> = {
	clickUrl: "https://www.dailymotion.fr",
	hotSpotUrl:
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/hotspot.png",
	pagesProps: [
		{
			videoProgress: 8,
			bgUrl: "https://plus.unsplash.com/premium_photo-1706896055883-880d1710dc2f?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			thumbnailUrl:
				"https://plus.unsplash.com/premium_photo-1706896055883-880d1710dc2f?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
};

export const viewShopTemplate: ViewShopType = (
	root: HTMLElement,
	creativeProps: CreativeProps,
	hotSpotProps: ViewShopProps
) => {
	let currPage: HTMLElement | undefined;
	let inactivityTimeout: number;

	const actualProps: Required<ViewShopProps> = {
		...defaultProps,
		...hotSpotProps,
	};

	const leftPanel = createDiv("left-panel", {
		position: "absolute",
		width: "20%",
		height: "100%",
		left: "0",
		top: "0",
		transition: "left .6s",
		backgroundColor: "crimson",
	});
	const qqq = createDiv("qqq", {
		position: "relative",
		width: "100%",
		height: "200%",
		outline: "2px solid crimson",
	});
	leftPanel.appendChild(qqq);

	const { clickUrl, pagesProps, hotSpotUrl } = actualProps;

	const pages = pagesProps.map(({ bgUrl, products }, i) => {
		const page = new ImageDM(`page_${i}`, "", {
			// pointerEvents: "none",
			left: "-100%",
			transition: "left .6s",
		});
		hotSpotsTemplate(page, creativeProps, {
			bgUrl,
			clickUrl,
			hotSpotUrl,
			products,
		});
		root.appendChild(page);
		return page;
	});

	// hide the current page if any and resume the video when the user does not interact for some time
	root.addEventListener("pointermove", () => {
		window.clearTimeout(inactivityTimeout);
		inactivityTimeout = window.setTimeout(() => {
			if (currPage) {
				currPage.style.left = "-100%";
				currPage = undefined;
				creativeProps.resumeAd();
			}
		}, 3000);
	});

	const thumbnails = pagesProps.map(({ thumbnailUrl }, i) => {
		const thumbnail = new ImageDM(`thumbnail_${i}`, thumbnailUrl, {
			width: "90%",
			height: "17%",
			top: `${2 + (17 + 2) * i}%`,
			left: "5%",
			cursor: "pointer",
			opacity: "0",
			transition: "opacity .6s",
			pointerEvents: "none",
		});
		thumbnail.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log("click on thumbnail: ", i);

			const nextPage = pages[i];
			if (currPage === nextPage) {
				return;
			}
			if (currPage) {
				currPage.style.left = "-100%";
			}
			nextPage.style.left = "0%";
			currPage = nextPage;

			creativeProps.pauseAd();
		});
		leftPanel.appendChild(thumbnail);
		return thumbnail;
	});

	root.appendChild(leftPanel);

	return (percentage: number) => {
		actualProps.pagesProps.forEach(({ videoProgress }, i) => {
			if (percentage > videoProgress) {
				thumbnails[i].style.opacity = "1";
				thumbnails[i].style.pointerEvents = "auto";
			}
		});
	};
};
