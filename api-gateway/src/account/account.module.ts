import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ProxyRmqModule } from '../proxy-rmq/proxy-rmq.module';

@Module({
	imports: [ProxyRmqModule],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
