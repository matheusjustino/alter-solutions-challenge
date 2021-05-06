import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@EventPattern('login')
	public login(
		loginDto,
	): Observable<{
		token: string;
		email: any;
	}> {
		return this.authService
			.login(loginDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@EventPattern('create-account')
	public createAccount(createAccountDto) {
		return this.authService
			.createAccount(createAccountDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@EventPattern('validate-token')
	public validateToken(token: string) {
		return this.authService
			.validateToken(token)
			.pipe(catchError((error) => throwError(error)));
	}
}
