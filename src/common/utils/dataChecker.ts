import {
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_END,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
	PAGE_TYPE_SINGLE,
} from "@/constants";
import { PageType, SurveyType } from "@/creative";

export const isDataCorrupted = (jsonData: SurveyType): string | void => {
	console.log("checkData jsonData: ", jsonData);

	const { firstPage, pages } = jsonData;
	const pageNames = pages.map((page) => page.name);

	// check that the first page exists
	if (!pageNames.includes(firstPage)) {
		return `There is an issue with the first page name (${firstPage}): it cannot be found in the provided pages`;
	}

	// check that each page name is unique
	for (let i = 0; i < pages.length; i++) {
		if (pageNames.indexOf(pages[i].name) !== i) {
			return `Page name "${pages[i].name}" was found more than once. Each page name should be unique.`;
		}
	}

	// check that each page has a name, a prompt and a nextPage(s)
	for (let i = 0; i < pages.length; i++) {
		const { name, prompt, nextPage, nextPages, type } = pages[i];
		if (!name) {
			return `Page #${i} does not have a name.`;
		}
		if (!prompt) {
			return `Page "${name}" does not have a prompt.`;
		}
		if (type !== PAGE_TYPE_END && !nextPage && !nextPages) {
			return `Page "${name}" does not have a nextPage(s).`;
		}
	}

	// check that each page's type exists
	for (let i = 0; i < pages.length; i++) {
		if (
			![
				PAGE_TYPE_CONSENT,
				PAGE_TYPE_MULTIPLE,
				PAGE_TYPE_RANGE,
				PAGE_TYPE_END,
				PAGE_TYPE_SINGLE,
			].includes(pages[i].type)
		) {
			return `page "${pages[i].name}" has unknown type "${pages[i].type}"`;
		}
	}

	// check that each page's nextPage(s) exist(s)
	for (let i = 0; i < pages.length; i++) {
		const { nextPage, nextPages } = pages[i];
		if (nextPage && !pageNames.includes(nextPage)) {
			return `page "${pages[i].name}" has unknown nextPage: "${nextPage}"`;
		} else if (
			nextPages &&
			!nextPages.every((pageName) => pageNames.includes(pageName))
		) {
			return `page "${pages[i].name}" has unknown nextPages: "${nextPages}"`;
		}
	}

	// check that each page has proper parameters depending on its type
	for (let i = 0; i < pages.length; i++) {
		const page = pages[i];
		let error;
		switch (page.type) {
			case PAGE_TYPE_CONSENT:
				break;
			case PAGE_TYPE_RANGE:
				error = getRangeError(page);
				if (error) {
					return error;
				}
				break;
			case PAGE_TYPE_SINGLE:
			case PAGE_TYPE_MULTIPLE:
				error = getSingelMultipleError(page);
				if (error) {
					return error;
				}
				break;
			default:
				break;
		}
	}
};

const getRangeError = (page: PageType): string | void => {
	const { name, min, max, step } = page;
	if (!min) {
		return `page "${name}" should have a "min" property`;
	}
	if (!max) {
		return `page "${name}" should have a "max" property`;
	}
	if (!step) {
		return `page "${name}" should have a "step" property`;
	}
};

const getSingelMultipleError = (page: PageType): string | void => {
	const { name, answers } = page;
	if (!answers || answers.length === 0) {
		return `page "${name}" should have an "answers" property`;
	}
};
