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

export interface CssType extends Partial<CSSStyleDeclaration> {
	"-webkit-backface-visibility"?: string;
	"-webkit-transform"?: string;
	scrollbarWidth?: string;
}

export interface ComponentBaseType {
	id: string; // div id
	debug?: boolean;
	clickUrl: string; // main url redirection
	onClick: (url: string) => void; // onClick callback
}

export type LiveStreamData = {
	url: string;
	duration: number;
	Hls: any;
};

export const defaultComponentValues: Required<ComponentBaseType> = {
	id: "default-component-id",
	debug: true,
	clickUrl: "https://www.dailymotion.com",
	onClick: (url?: string) => console.log("click to url: ", url),
};
