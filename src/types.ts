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
	userType: UserRole;
	buildingIds?: string[];
	meters: string[];
	feed?: NewsEvent[];
	buildData?: {
		[buildingId: string]: {
			address: string;
			managementCompany: string;
		}
	};
}

export enum MeterType {
	HotWater = 0,
	ColdWater = 1,
	Electric  = 2,
	Gas = 3
}

export enum UserRole {
	B2B = 'B2B',
	B2C = 'B2C'
}

export interface NewsEvent {
	id: string;
	createDate: Date;
	text: string;
}
