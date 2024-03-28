export enum LANGUAGE {
	FR = "FR",
	EN = "EN",
	DE = "DE",
	SP = "SP",
	PT = "PT",
	IT = "IT",
}

enum vocabulary {
	consentPrompt = "consentPrompt",
	consentYes = "consentYes",
	consentNo = "consentNo",
	skip = "skip",
	nextPage = "nextPage",
	termsAccept = "termsAccept",
	endPrompt = "endPrompt",
	endBtn = "endBtn",
}

const DICTIONARY: {
	[key in LANGUAGE]: { [key in vocabulary]: string };
} = {
	FR: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
	EN: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
	DE: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
	SP: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
	PT: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
	IT: {
		consentPrompt:
			"Hello. We could really use your opinion on a study, it will not take more than 30s :)",
		consentYes: "Yes, sure",
		consentNo: "Maybe next time",
		skip: "Skip question >",
		nextPage: "Continue",
		termsAccept: "I accept these terms and conditions.",
		endPrompt: "Thank you",
		endBtn: "Close survey",
	},
};

export abstract class Dico {
	public static translation: { [key in vocabulary]: string };

	public static setDictionary(language: LANGUAGE): void {
		this.translation = DICTIONARY[language];
	}
}
