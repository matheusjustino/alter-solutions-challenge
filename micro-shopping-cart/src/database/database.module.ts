import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '123',
			database: 'micro_shopping_cart',
			entities: [__dirname + '../**/*.entity{.ts,.js}'],
			autoLoadEntities: true,
			synchronize: true,
		}),
	],
})
export class DatabaseModule {}
