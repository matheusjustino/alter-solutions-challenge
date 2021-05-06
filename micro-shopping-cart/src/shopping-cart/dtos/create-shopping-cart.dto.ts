import { IsString } from 'class-validator';

export class CreateShoppingCartDto {
	@IsString()
	public readonly userId: string;
}

export interface CreateShoppingCart {
	readonly userId: string;
}
