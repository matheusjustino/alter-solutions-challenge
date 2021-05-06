import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter
	extends BaseRpcExceptionFilter
	implements RpcExceptionFilter<RpcException> {
	public catch(
		exception: RpcException,
		host: ArgumentsHost,
	): Observable<any> {
		return throwError(exception.getError());
	}
}
