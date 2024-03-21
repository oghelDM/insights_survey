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
	return createDiv(id, {
		borderRadius: ".7vi",
		backgroundColor: "gray",
		padding: "8px 4px",
		userSelect: "none",
		cursor: "pointer",
		width: "40%",
		color: "white",
		textAlign: "center",
		fontSize: "2.5vi",
		lineHeight: "5vi",
		fontFamily: "Inter,sans-serif",
		...style,
	});
};
