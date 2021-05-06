import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

// PROVIDERS
import { ModelsProviderAsync } from './models.provider';

// REPOSITORIES
import { ProductRepository } from './repositores/product.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(ModelsProviderAsync),
	],
	providers: [ProductRepository],
	exports: [ProductRepository],
})
export class DatabaseModule {}
