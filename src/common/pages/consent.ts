import { PageType } from "@creatives/2024/survey1/creative";
import { CssType } from "../types";
import { Page } from "./page";

export class Consent extends Page {
	constructor(props: PageType) {
		super(props);

		const { name, prompt } = props;
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-consent", Consent);
