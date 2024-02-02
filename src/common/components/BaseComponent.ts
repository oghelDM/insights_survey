import { CssType, ComponentBaseType } from "../types";

export class BaseComponent extends HTMLElement {
	constructor({ onClick, clickUrl }: ComponentBaseType, style: CssType = {}) {
		super();

		for (const [key, value] of Object.entries(style)) {
			(this.style as any)[key] = value;
		}

		this.addEventListener("click", () => onClick(clickUrl));
	}
}
