import { VPAIDVideoPlayer } from "@/app/app";
import { Creative, CreativeProps, SurveyType } from "@/creative";

class MyCreative extends Creative {
	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super(root, creativeProps, {} as any as SurveyType);

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const dataUrl = urlParams.get("dataUrl");
		console.log("dataUrl: ", dataUrl);

		if (!dataUrl) {
			console.log("no JSON dataUrl was provided, exiting");
			return;
		}

		fetch(dataUrl)
			.then((response) => response.json())
			.then((data) => {
				console.log("fetch data: ", data);
				this.loadData(data);
			});
	}
}

customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
