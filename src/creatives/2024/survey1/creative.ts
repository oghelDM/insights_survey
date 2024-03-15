import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps, SurveyType } from "@/creative";

import jsonData from "./data.json";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super(root, creativeProps, jsonData as any as SurveyType);
	}
}

customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
