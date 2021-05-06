import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

// MODULES
import { ProxyRmqModule } from '../proxy-rmq/proxy-rmq.module';
import { AccountModule } from '../account/account.module';

@Module({
	imports: [ProxyRmqModule],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [ProductService],
})
export class ProductModule {}
