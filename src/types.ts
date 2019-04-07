export interface Apartment {
	id: string;
	number: number;
	size: number;
	floor: number;
	entrance: number;
	owner: string;
}

export interface Company {
	id: string;
	taxId: string;
	name: string;
	address: string;
	phone: string;
	email?: string
}

export interface User {
	id: string;
	clientId: string;
	fullName: string;
	phone: string;
	email: string;
	userType: UserType;
}

export enum UserType {
	B2B = 'B2B',
	B2C = 'B2C'
}

export interface NewsEvent {
	id: string;
	date: Date;
	text: string;
}
