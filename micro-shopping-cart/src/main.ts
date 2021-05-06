import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';

const logger = new Logger('MAIN-MICRO-SHOPPING-CART');
const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);

async function bootstrap() {
	logger.log('Starting MICRO-SHOPPING-CART');

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [appConfigService.amqpUrl],
				queue: appConfigService.queue,
				queueOptions: {
					durable: false,
				},
			},
		},
	);

	app.useGlobalPipes(new ValidationPipe());

	app.listen(() =>
		logger.log(
			`Nestjs-Micro-Shopping-Cart-RBMQ Microservice is listening: ${appConfigService.queue}`,
		),
	);
}
bootstrap();
