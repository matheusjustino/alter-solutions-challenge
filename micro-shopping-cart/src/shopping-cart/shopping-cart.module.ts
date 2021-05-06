import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

// MODULES
import { DatabaseModule } from '../database/database.module';
import { ProxyRmqModule } from '../proxy-rmq/proxy-rmq.module';

// ENTITIES
import { ProductCart } from '../database/entities/product-cart.entity';
import { ShoppingCart } from '../database/entities/shopping-cart.entity';

@Module({
	imports: [
		DatabaseModule,
		ProxyRmqModule,
		TypeOrmModule.forFeature([ShoppingCart, ProductCart]),
	],
	providers: [ShoppingCartService],
	controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
