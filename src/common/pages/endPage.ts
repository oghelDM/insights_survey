import { Page } from "./page";
import { GREEN } from "@/constants";
import { PageType } from "@/creative";

export class EndPage extends Page {
	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		this.nextPageButton.style.top = "78%";
		this.nextPageButton.style.left = "50%";
		this.nextPageButton.style.transform = "translate(-50%)";
		this.nextPageButton.innerHTML = "close survey";

		this.promptDiv.style.color = GREEN;
		this.promptDiv.style.marginTop = "20%";

		this.style.backgroundImage =
			"url(https://statics.dmcdn.net/d/PRODUCTION/common/assets/insight/img_end.png)";
		this.style.backgroundSize = "cover";
		this.style.backgroundRepeat = "no-repeat";
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-end-page", EndPage);
