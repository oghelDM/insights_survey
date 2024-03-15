import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps } from "@/creative";

import jsonData from "./data.json";
import { createDiv } from "@/utils/divMaker";
import { Consent } from "@/pages/consent";
import {
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
} from "@/constants";

export interface SurveyType {
	name: string;
	firstPage: string;
	pages: PageType[];
}

export interface PageType {
	name: string;
	type: string;
	prompt: string;
	answers: string[];
	nextPage: string;
	skippable: boolean;
	maxNbAnswers?: number;
	randomize?: boolean;
	nextPages?: string[];
	min?: number;
	max?: number;
	step?: number;
}

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super(creativeProps, jsonData as any as SurveyType);

		console.log("pause from MyCreative constructor");
		setTimeout(() => {}, 1000);
		creativeProps.pauseAd();
		this.canResumeVideo = false;

		console.log(jsonData);

		const allData = jsonData.pages.map((p, i) => {
			const page = p as any as PageType;

			const div = this.makePage(page);

			root.appendChild(div);

			const data = { ...page, div };

			return data;
		});
		console.log(allData);
	}

	private makePage = (page: PageType) => {
		switch (page.type) {
			case PAGE_TYPE_CONSENT:
			case PAGE_TYPE_MULTIPLE:
			case PAGE_TYPE_RANGE:
				return new Consent(page);
			default:
				return createDiv("default", {});
		}
	};
}

customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
