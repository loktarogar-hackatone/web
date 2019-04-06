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
	name: string;
	phone: string;
	email: string;
}
