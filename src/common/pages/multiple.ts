import { PageType } from "@creatives/2024/survey1/creative";
import { Page } from "./page";

export class Multiple extends Page {
	constructor(props: PageType) {
		super(props);

		const { name, prompt } = props;
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-multiple", Multiple);
