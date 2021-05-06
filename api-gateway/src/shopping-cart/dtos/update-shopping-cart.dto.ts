import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class UpdateShoppingCartDto {
	@IsMongoId()
	@Type(() => Types.ObjectId)
	public readonly userId: Types.ObjectId;

	@IsMongoId()
	@Type(() => Types.ObjectId)
	public readonly productId: Types.ObjectId;
}
