import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ProxyRmqModule } from './proxy-rmq/proxy-rmq.module';

@Module({
	imports: [DatabaseModule, AppConfigModule, ShoppingCartModule, ProxyRmqModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
