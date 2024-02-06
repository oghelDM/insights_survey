import {
	CssType,
	ComponentBaseType,
	defaultComponentValues,
} from "../../types";

export interface CollectionType extends ComponentBaseType {
	productUrls: string[]; // image elements
	clickUrls?: string[]; // productredirections
	startIndex?: number;
	arrows?: HTMLElement[];
	fadeObjects?: HTMLElement[][];
	styleProductFocused?: CssType;
	styleProductOutLeft?: CssType;
	styleProductOutRight?: CssType;
	styleProductInLeft?: CssType;
	styleProductInRight?: CssType;
	introAnimationProperties?: {
		delay: number;
		duration: number;
		easing: string;
	};
	outroAnimationProperties?: {
		delay: number;
		duration: number;
		easing: string;
	};
}

export const defaultValuesCollection: Required<CollectionType> = {
	...defaultComponentValues,
	id: "collection-dm",
	onClick: () => console.log("click on collection"),
	productUrls: [
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-1.png",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-2.png",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-3.png",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-4.png",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-5.png",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/products/mizuno-shoes/mizuno-6.png",
	],
	styleProductFocused: {
		width: "100%",
		height: "100%",
		backgroundPosition: "center center",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		left: "0%",
		opacity: "1",
		position: "absolute",
		rotate: "0deg",
	},
	styleProductOutLeft: { left: "-100%", opacity: "0", rotate: "-20deg" },
	styleProductOutRight: { left: "100%", opacity: "0", rotate: "20deg" },
	styleProductInLeft: { left: "-100%", opacity: "0", rotate: "10deg" },
	styleProductInRight: { left: "100%", opacity: "0", rotate: "-10deg" },
	introAnimationProperties: {
		delay: 300,
		duration: 400,
		easing: "cubic-bezier(.01,.58,.17,1)",
	},
	outroAnimationProperties: {
		delay: 0,
		duration: 400,
		easing: "cubic-bezier(.01,.58,.17,1)",
	},
	arrows: [],
	startIndex: 0,
	clickUrls: [],
	fadeObjects: [],
};
