export interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	address: string;
	images: string[];
	slug: string;
	ownerId: string;
	dateTimePosted: string;
	still_available: boolean;
}

export interface User {
	id: string;
	email: string;
	username: string;
	profileImage?: string;
}

export interface MessageData {
	id: number;
	created_at: string;
	listing_id: number;
	message_text_id: number;
	message_texts: {
		id: number;
		created_at: string;
		message_text: string;
	};
	receiver_id: string;
	sender_id: string;
}


export interface Bookmark {
	id: string;
	userId: string;
	listingId: string;
}
