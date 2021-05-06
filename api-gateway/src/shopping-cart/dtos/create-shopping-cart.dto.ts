import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class CreateShoppingCartDto {
	@IsMongoId()
	@Type(() => Types.ObjectId)
	public readonly userId: Types.ObjectId;
}
