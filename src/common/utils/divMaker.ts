import { CssType } from "@/types";

export const createDiv = (
	id: string,
	style: CssType,
	tagName = "div"
): HTMLElement => {
	const div = document.createElement(tagName);
	div.id = id;
	for (const [key, value] of Object.entries(style)) {
		// @ts-ignore
		div.style[key] = value;
	}

	return div;
};

export const createButton = (id: string, style: CssType = {}): HTMLElement => {
	return createDiv(id, { cursor: "pointer" }, "button");
};
