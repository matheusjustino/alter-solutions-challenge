import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [AppConfigModule, DatabaseModule, AuthModule],
})
export class AppModule {}
