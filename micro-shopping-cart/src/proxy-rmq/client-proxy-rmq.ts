import { Injectable } from '@nestjs/common';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ClientProxyRmq {
	private clientMicroProductProxy: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get clientMicroProduct(): ClientProxy {
		if (this.clientMicroProductProxy) {
			return this.clientMicroProductProxy;
		}

		this.clientMicroProductProxy = ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
				urls: [this.appConfigService.amqpUrl],
				queue: this.appConfigService.microProductQueue,
				queueOptions: {
					durable: false,
				},
			},
		});

		return this.clientMicroProductProxy;
	}
}
