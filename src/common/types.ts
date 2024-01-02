import { VPAIDVideoPlayer } from "@app";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/ban-types
		getVPAIDAd: () => VPAIDVideoPlayer;
	}
}

export enum VERTICAL_ALIGN {
	TOP,
	CENTER,
	BOTTOM,
}

export enum HORIZONTAL_ALIGN {
	LEFT = "left",
	CENTER = "center",
	RIGHT = "right",
}

export enum VIDEO_QUALITY {
	LOW = "low",
	MID = "mid",
	HIGH = "high",
}

export interface ComponentBaseType {
	id: string; // div id
	debug?: boolean;
	clickUrl: string; // main url redirection
	onClick: (url: string) => void; // onClick callback
}

export interface CreativeProps {
	videoSlot: HTMLVideoElement;
	onClick: (url: string) => void;
	stopAd: () => void;
	setAdVolume: (volume: number) => void;
}

export type CreativeHandler = (
	root: HTMLElement,
	creativeProps: CreativeProps
) => void;

export type CSSStyleType = { [key: string]: string };

export const defaultComponentValues: Required<ComponentBaseType> = {
	id: "default-component-id",
	debug: true,
	clickUrl: "https://www.dailymotion.com",
	onClick: (url?: string) => console.log("click to url: ", url),
};
