import { Page } from "./page";
import { PageType } from "@/creative";

export class EndPage extends Page {
	constructor(pageProps: PageType, gotoNextPage: () => void) {
		super(pageProps, gotoNextPage);

		this.nextPageButton.innerHTML = "close survey";
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-end-page", EndPage);
