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

export interface Message {
	id: string;
	senderId: string;
	recipientId: string;
	listingId: string;
	content: string;
	timestamp: string;
}

export interface Bookmark {
	id: string;
	userId: string;
	listingId: string;
}
