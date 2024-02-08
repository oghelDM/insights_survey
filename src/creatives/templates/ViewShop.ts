import { CssType } from "@/types";
import { CreativeProps } from "@/creative";
import { ImageDM } from "@/components/image";
import { HotSpotProduct, hotSpotsTemplate } from "./HotSpots";
import { createDiv } from "@/utils/divMaker";

export type ViewShopType = (
	root: HTMLElement,
	creativeProps: CreativeProps,
	props: ViewShopProps
) => void;

interface PageProps {
	videoProgress: number; // video percentage progress when the card should be added to the screen
	bgUrl: string;
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

	const { clickUrl, pagesProps, cardStyle, hotspotStyle, hotSpotUrl } =
		actualProps;

	const pages = pagesProps.map(({ videoProgress, bgUrl, products }, i) => {
		const page = new ImageDM(`page_${i}`, "");
		hotSpotsTemplate(page, creativeProps, {
			bgUrl,
			clickUrl,
			hotSpotUrl,
			products,
		});
		root.appendChild(page);
		return page;
	});

	root.appendChild(leftPanel);
};
