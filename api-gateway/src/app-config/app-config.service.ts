import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get microAuthQueue(): string {
		return this.configService.get<string>('MICRO_AUTH_QUEUE');
	}

	public get microProductQueue(): string {
		return this.configService.get<string>('MICRO_PRODUCT_QUEUE');
	}

	public get microShoppingCartQueue(): string {
		return this.configService.get<string>('MICRO_SHOPPING_CART_QUEUE');
	}
}
