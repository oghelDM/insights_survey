import { VPAIDVideoPlayer } from "@app";
import { Creative, CreativeProps } from "@/creative";
import { viewShopTemplate } from "@creatives/templates/ViewShop";

class MyCreative extends Creative {
	private viewShopTimeUpdate: (percentage: number) => void;

	private setCanResumeVideo(canResumeVideo: boolean): void {
		this.canResumeVideo = canResumeVideo;
	}

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.viewShopTimeUpdate = viewShopTemplate(
			root,
			creativeProps,
			(b) => this.setCanResumeVideo(b),
			{
				clickUrl: "https://www.dailymotion.fr",
				hotSpotUrl:
					"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/hotspot.png",
				pagesProps: [
					{
						videoProgress: 8,
						bgUrl: "https://images.unsplash.com/photo-1706460257771-b1c110b09b23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMDJ8fHxlbnwwfHx8fHw%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1706460257771-b1c110b09b23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMDJ8fHxlbnwwfHx8fHw%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product0",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product0.png",
								spotLeft: "34%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product1.png",
								spotLeft: "44%",
								spotTop: "63%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 12,
						bgUrl: "https://images.unsplash.com/photo-1707306984355-4388b7ad51f1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1707306984355-4388b7ad51f1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product2.png",
								spotLeft: "44%",
								spotTop: "63%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 13,
						bgUrl: "https://images.unsplash.com/photo-1707501734938-57bac2fb7f81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8fA%3D%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1707501734938-57bac2fb7f81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8fA%3D%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product3.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 14,
						bgUrl: "https://images.unsplash.com/photo-1703252933215-6b089d36d5bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4N3x8fGVufDB8fHx8fA%3D%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1703252933215-6b089d36d5bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4N3x8fGVufDB8fHx8fA%3D%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product0.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 15,
						bgUrl: "https://images.unsplash.com/photo-1706783125838-f39bfa4e1298?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1706783125838-f39bfa4e1298?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product1.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 21,
						bgUrl: "https://images.unsplash.com/photo-1706820642477-c7049e15876c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fHw%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1706820642477-c7049e15876c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fHw%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product2.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 23,
						bgUrl: "https://images.unsplash.com/photo-1706378886599-41ecb840e43d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzl8fHxlbnwwfHx8fHw%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1706378886599-41ecb840e43d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzl8fHxlbnwwfHx8fHw%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product3.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 32,
						bgUrl: "https://images.unsplash.com/photo-1707420256622-0af616bb57b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fHw%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1707420256622-0af616bb57b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fHw%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product0.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
					{
						videoProgress: 42,
						bgUrl: "https://images.unsplash.com/photo-1707306984355-4388b7ad51f1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						thumbnailUrl:
							"https://images.unsplash.com/photo-1707306984355-4388b7ad51f1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						products: [
							{
								clickUrl: "https://www.google.fr?q=product1",
								productUrl:
									"https://statics.dmcdn.net/d/TESTS/fwk/assets/templates/hotSpots/product1.png",
								spotLeft: "54%",
								spotTop: "33%",
								cardLeft: "52%",
								cardTop: "16%",
							},
						],
					},
				],
				cardStyle: {},
				hotspotStyle: {},
			}
		);
	}

	public videoTimeUpdate(completionPercent: number): void {
		this.viewShopTimeUpdate(completionPercent);
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2023/Entertainement_DisneyPlus_Miraculous_0923_Skins_Split_x_3_and_Countdown/assets/V2/teasing/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);
