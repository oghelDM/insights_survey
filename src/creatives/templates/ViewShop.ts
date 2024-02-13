import { CssType } from "@/types";
import { CreativeProps } from "@/creative";
import { ImageDM } from "@/components/image";
import { createDiv } from "@/utils/divMaker";
import { HotSpotProduct, hotSpotsTemplate } from "./HotSpots";

export type ViewShopType = (
	root: HTMLElement,
	creativeProps: CreativeProps,
	_setCanResumeVideo: (canResumeVideo: boolean) => void,
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
	_setCanResumeVideo: (canResumeVideo: boolean) => void,
	hotSpotProps: ViewShopProps
) => {
	let currPage: HTMLElement | undefined;
	let inactivityTimeout: number;
	const setCanResumeVideo = _setCanResumeVideo;

	const actualProps: Required<ViewShopProps> = {
		...defaultProps,
		...hotSpotProps,
	};

	const leftPanel = createDiv("left-panel", {
		position: "absolute",
		flexDirection: "row",
		width: "25%",
		height: "100%",
		left: "-25%",
		top: "0",
		transition: "left .6s",
	});
	const container = createDiv("panel-container", {
		position: "absolute",
		width: "80%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,.7)",
	});
	const subContainer = createDiv("panel-subcontainer", {
		width: "100%",
		height: "85%",
		overflow: "scroll",
		scrollbarWidth: "none",
	});
	const downArrow = new ImageDM(
		"panel-down-arrow",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/viewShop/arrow_down.png",
		{
			height: "2%",
			backgroundSize: "contain",
			opacity: "0",
			transition: "opacity .6s",
		}
	);
	const panelButton = new ImageDM(
		"panel-button",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/viewShop/btnOff.png",
		{
			width: "20%",
			aspectRatio: "1 / 1",
			height: "unset",
			left: "80%",
			top: "40%",
			cursor: "pointer",
			transition: "background-image 0.5s",
		}
	);
	container.appendChild(subContainer);
	container.appendChild(downArrow);
	leftPanel.appendChild(container);
	leftPanel.appendChild(panelButton);

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

	const hideCurrPage = () => {
		if (currPage) {
			currPage.style.left = "-100%";
			currPage = undefined;

			playBtn.style.opacity = "0";
			playBtn.style.pointerEvents = "none";

			setCanResumeVideo(true);
			creativeProps.resumeAd();
		}
	};

	const togglePanel = () => {
		const isPanelHidden = leftPanel.style.left !== "0%";
		leftPanel.style.left = isPanelHidden ? "0%" : "-20%";
		panelButton.style.backgroundImage = `url(https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/viewShop/btnO${
			isPanelHidden ? "ff" : "n"
		}.png)`;
	};

	panelButton.addEventListener("pointerenter", () => {
		const isPanelHidden = leftPanel.style.left !== "0%";
		if (isPanelHidden) {
			togglePanel();
		}
	});

	panelButton.addEventListener("click", () => {
		const isPanelHidden = leftPanel.style.left !== "0%";
		if (!isPanelHidden) {
			togglePanel();
		}
	});

	// hide the current page if any and resume the video when the user does not interact for some time
	root.addEventListener("pointermove", () => {
		window.clearTimeout(inactivityTimeout);
		inactivityTimeout = window.setTimeout(() => hideCurrPage(), 3000);
	});

	const thumbnails = pagesProps.map(({ thumbnailUrl }, i) => {
		const thumbnail = new ImageDM(`thumbnail_${i}`, thumbnailUrl, {
			position: "unset",
			width: "90%",
			aspectRatio: "16 / 9",
			height: "0%", // allows to hide the thumbnail until it is displayed
			margin: "5% 5%",
			cursor: "pointer",
			opacity: "0",
			transition: "opacity .6s .3s",
			pointerEvents: "none",
		});
		thumbnail.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();

			const nextPage = pages[i];
			if (currPage === nextPage) {
				return;
			}
			if (currPage) {
				currPage.style.left = "-100%";
			}
			nextPage.style.left = "0%";
			currPage = nextPage;
			playBtn.style.opacity = "1";
			playBtn.style.pointerEvents = "auto";

			setCanResumeVideo(false);
			creativeProps.pauseAd();
		});
		subContainer.appendChild(thumbnail);

		return thumbnail;
	});

	root.appendChild(leftPanel);

	const playBtn = new ImageDM(
		"playBtn",
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/viewShop/play.png",
		{
			width: "10%",
			left: "86%",
			top: "40%",
			aspectRatio: "1 / 1",
			height: "auto",
			opacity: "0",
			transition: "opacity .6s",
			cursor: "pointer",
			pointerEvents: "none",
		}
	);
	playBtn.addEventListener("click", hideCurrPage);
	root.appendChild(playBtn);

	return (percentage: number) => {
		actualProps.pagesProps.forEach(({ videoProgress }, i) => {
			const thumbnail = thumbnails[i];
			if (percentage > videoProgress && thumbnail.style.height === "0%") {
				thumbnail.style.height = "unset";
				thumbnail.style.opacity = "1";
				thumbnail.style.pointerEvents = "auto";

				if (subContainer.children.length > 3) {
					downArrow.style.opacity = "1";
					thumbnail.scrollIntoView({ behavior: "smooth" });
				}

				if (i === 0) {
					togglePanel(); // display the panel for the first time
				}
			}
		});
	};
};
