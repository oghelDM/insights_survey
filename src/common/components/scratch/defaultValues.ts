import { ComponentBaseType, defaultComponentValues } from "../../types";

export interface ScratchType extends ComponentBaseType {
	cursorUrl?: string;
	timeoutDuration?: number; // time before the scratch auto reveals, in milliseconds
	backImageUrl: string;
	frontImageUrl: string;
	scratchImageUrl?: string;
	scratchSizeCoeff?: number;
	cursorAutoRotate?: boolean;
	onAutoRevealStart?: () => void;
	onAutoRevealComplete?: () => void;
	onUserScratchStart?: () => void;
}

export const defaultValuesScratch: Required<ScratchType> = {
	...defaultComponentValues,
	id: "scratch-dm",
	onClick: () => console.log("click on scratch"),
	onAutoRevealStart: () => console.log("auto reveal start"),
	onAutoRevealComplete: () => console.log("auto reveal complete"),
	onUserScratchStart: () => console.log("user scratch start"),
	cursorUrl:
		"https://statics.dmcdn.net/d/TESTS/components/scratch/target.png",
	timeoutDuration: 4000,
	backImageUrl:
		"https://statics.dmcdn.net/d/TESTS/components/scratch/back_voda.png",
	frontImageUrl:
		"https://statics.dmcdn.net/d/TESTS/components/scratch/front_voda.png",
	scratchImageUrl:
		"https://statics.dmcdn.net/d/TESTS/components/scratch/scratch1.png",
	scratchSizeCoeff: 2,
	cursorAutoRotate: true,
};
