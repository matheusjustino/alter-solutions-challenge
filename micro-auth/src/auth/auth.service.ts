import { RpcException } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';

// REPOSITORY
import { UserRepository } from '../database/repositories/user.repository';

// SCHEMAS
import { UserDocument } from '../database/schemas/user.schema';

// DTO's
import { LoginDto } from './dtos/login.dto';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AuthService {
	private logger = new Logger(AuthService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository,
	) {}

	public validateToken(token: string) {
		this.logger.log(`Validate Token - Payload: ${token}`);

		return from(this.jwtService.verifyAsync(token)).pipe(
			switchMap((payload) => {
				return from(
					this.userRepository.userModel.findOne({
						email: payload['email'],
					}),
				);
			}),
			map((user) => {
				if (!user) {
					throw new RpcException('Invalid token. User not found');
				}

				return user;
			}),
			catchError((error) => {
				this.logger.error(`Validate Token Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public login(loginDto: LoginDto) {
		this.logger.log(`Login - Payload: ${JSON.stringify(loginDto)}`);

		return from(
			this.userRepository.userModel.findOne({ email: loginDto.email }),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('Invalid login. User not found');
				}

				return from(bcrypt.compare(loginDto.password, user.password));
			}),
			switchMap((result) => {
				if (!result) {
					throw new RpcException('Password invalid!');
				}

				const token = this.jwtService.sign({ email: loginDto.email });

				return of({ token, email: loginDto.email });
			}),
			catchError((error) => {
				this.logger.error(`Login Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public createAccount(
		createAccountDto: CreateAccountDto,
	): Observable<UserDocument> {
		this.logger.log(
			`Create Account - Payload: ${JSON.stringify(createAccountDto)}`,
		);

		return from(
			this.userRepository.userModel.create(createAccountDto),
		).pipe(
			catchError((error) => {
				this.logger.error(`Create Account Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}
}
