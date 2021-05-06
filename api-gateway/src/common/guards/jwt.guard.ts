import {
	ExecutionContext,
	Injectable,
	CanActivate,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientProxyRmq } from '../../proxy-rmq/client-proxy-rmq';

interface IRequest extends Request {
	token?: string;
	user: any;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
	private logger = new Logger(`API-GATEWAY: ${JwtAuthGuard.name}`);
	private microAuthClient: ClientProxy = null;

	public constructor(private readonly clientProxyRmq: ClientProxyRmq) {
		this.microAuthClient = this.clientProxyRmq.clientMicroAuth;
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: IRequest = context.switchToHttp().getRequest();

		this.logger.log('Buscando a requição', 'JwtAuthGuard');

		if (!req.headers['authorization']) {
			throw new UnauthorizedException('Token not provie');
		}

		try {
			this.logger.log('Iniciando validação do token');

			const result = await this.microAuthClient
				.send('validate-token', req.headers['authorization'])
				.toPromise();

			console.log(result);
			if (!result) {
				throw new UnauthorizedException('Falha na autenticação');
			}
			this.logger.log('Validação bem sucedida');

			const user = { id: result._id, email: result.email };

			req.user = user;

			return true;
		} catch (error) {
			this.logger.log('Falha na autenticação. Algum erro aconteceu.');
			console.log(error);
			throw new UnauthorizedException(error);
		}
	}
}
