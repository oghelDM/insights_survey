interface CssType extends Partial<CSSStyleDeclaration> {
	"-webkit-backface-visibility"?: string;
	"-webkit-transform"?: string;
}

export const createDiv = (id: string, style: CssType): HTMLElement => {
	const div = document.createElement("div");
	div.id = id;
	for (const [key, value] of Object.entries(style)) {
		// @ts-ignore
		div.style[key] = value;
	}

	return div;
};
