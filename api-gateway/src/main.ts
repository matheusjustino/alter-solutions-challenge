import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';

// COMMON
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api/v1');
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TimeoutInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	Date.prototype.toJSON = function (): any {
		return momentTimezone(this)
			.tz('America/Sao_Paulo')
			.format('YYYY-MM-DD HH:mm:ss.SSSS');
	};

	await app.listen(8080);
}
bootstrap();
