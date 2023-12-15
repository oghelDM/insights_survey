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
	LEFT,
	CENTER,
	RIGHT,
}

export interface ComponentBaseType {
	id: string; // div id
	debug?: boolean;
	redirectUrl?: string; // main url redirection
	onClick: (url?: string) => void; // onClick callback
}

export interface CreativeProps {
	onClick: (url?: string) => void;
}

export type CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => void;

export type CSSStyleType = { [key: string]: string };

export const defaultComponentValues: ComponentBaseType = {
	id: "default-component-id",
	debug: true,
	redirectUrl: "https://www.dailymotion.com",
	onClick: (url?: string) => console.log("click to url: ", url),
};
