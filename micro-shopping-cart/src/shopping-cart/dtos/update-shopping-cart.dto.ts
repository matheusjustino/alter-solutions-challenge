import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShoppingCartDto {
	@IsNotEmpty()
	@IsString()
	public shoppingCartId: string;

	@IsNotEmpty()
	@IsString()
	public productId: string;
}
