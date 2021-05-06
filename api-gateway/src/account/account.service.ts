import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// PROXY RMQ
import { ClientProxyRmq } from '../proxy-rmq/client-proxy-rmq';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AccountService {
	private logger = new Logger(`API-GATEWAY: ${AccountService.name}`);
	private microAuthClient: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRmq) {
		this.microAuthClient = this.clientProxyRmq.clientMicroAuth;
	}

	public createAccount(
		createAccountDto: CreateAccountDto,
	): Observable<{
		message: string;
	}> {
		this.logger.log(
			`Create account - Payload: ${JSON.stringify(createAccountDto)}`,
		);

		return this.microAuthClient
			.send('create-account', createAccountDto)
			.pipe(
				switchMap(() => of({ message: 'Account created' })),
				catchError((error) => {
					this.logger.error(`Create Account Error`);

					return throwError(error);
				}),
			);
	}

	public login(loginDto: LoginDto) {
		this.logger.log(`Login - Payload: ${JSON.stringify(loginDto)}`);

		return this.microAuthClient.send('login', loginDto).pipe(
			catchError((error) => {
				this.logger.error(`Login Error`);

				return throwError(error);
			}),
		);
	}

	public validateToken(token: string) {
		this.logger.log(`Validate Token - Payload: ${JSON.stringify(token)}`);

		return this.microAuthClient.send('validate-token', token).pipe(
			catchError((error) => {
				this.logger.error(`validate Token Error`);

				return throwError(error);
			}),
		);
	}
}
