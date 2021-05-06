import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	@IsNumber()
	public readonly price: number;
}
