import {
	PAGE_TYPE_CONSENT,
	PAGE_TYPE_END,
	PAGE_TYPE_MULTIPLE,
	PAGE_TYPE_RANGE,
} from "@/constants";
import { SurveyType } from "@/creative";

export const isDataCorrupted = (jsonData: SurveyType): boolean => {
	console.log("checkData jsonData: ", jsonData);

	const { firstPage, pages } = jsonData;
	const pageNames = pages.map((page) => page.name);

	// check that the first page exists
	if (!pageNames.includes(firstPage)) {
		alert(
			`There is an issue with the first page name (${firstPage}): it cannot be found in the provided pages`
		);
		return true;
	}

	// check that each page name is unique
	for (let i = 0; i < pages.length; i++) {
		if (pageNames.indexOf(pages[i].name) !== i) {
			alert(
				`Page name "${pages[i].name}" was found more than once. Each page name should be unique.`
			);
			return true;
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
			].includes(pages[i].type)
		) {
			alert(
				`page "${pages[i].name}" has unknown type "${pages[i].type}"`
			);
			return true;
		}
	}

	return false;
};
