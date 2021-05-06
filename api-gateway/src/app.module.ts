import { Module } from '@nestjs/common';
import { ProxyRmqModule } from './proxy-rmq/proxy-rmq.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ProductModule } from './product/product.module';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AccountModule } from './account/account.module';

@Module({
	imports: [
		ProxyRmqModule,
		AppConfigModule,
		ProductModule,
		ShoppingCartModule,
		AccountModule,
	],
	controllers: [ShoppingCartController],
	providers: [ShoppingCartService],
})
export class AppModule {}
