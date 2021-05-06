import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// RMQ PROXY
import { ClientProxyRmq } from './client-proxy-rmq';

@Module({
	imports: [AppConfigModule],
	providers: [ClientProxyRmq],
	exports: [ClientProxyRmq],
})
export class ProxyRmqModule {}
