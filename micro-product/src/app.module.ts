import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [AppConfigModule, DatabaseModule, ProductModule],
})
export class AppModule {}
