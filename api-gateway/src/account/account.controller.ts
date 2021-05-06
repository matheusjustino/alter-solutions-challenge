import { Controller, Body, Post } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// SERVICES
import { AccountService } from './account.service';

// DTO's
import { LoginDto } from './dtos/login.dto';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('create-account')
	public createAccount(@Body() createAccountDto: CreateAccountDto) {
		return this.accountService
			.createAccount(createAccountDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@Post('login')
	public login(@Body() loginDto: LoginDto) {
		return this.accountService
			.login(loginDto)
			.pipe(catchError((error) => throwError(error)));
	}
}
