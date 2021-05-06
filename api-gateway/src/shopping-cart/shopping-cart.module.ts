import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

// MODULES
import { ProxyRmqModule } from '../proxy-rmq/proxy-rmq.module';

@Module({
	imports: [ProxyRmqModule],
	providers: [ShoppingCartService],
	controllers: [ShoppingCartController],
	exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
