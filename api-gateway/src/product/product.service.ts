import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

// PROXY RMQ
import { ClientProxyRmq } from '../proxy-rmq/client-proxy-rmq';

// DTO's
import { CreateProductDto } from './dtos/create-product.dto';

// INTERFACES
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
	private logger = new Logger(`API-GATEWAY: ${ProductService.name}`);
	private microProductClient: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRmq) {
		this.microProductClient = this.clientProxyRmq.clientMicroProduct;
	}

	public createProduct(
		product: CreateProductDto,
	): Observable<{
		message: string;
	}> {
		this.logger.log(`Create product - Payload: ${JSON.stringify(product)}`);

		return this.microProductClient.emit('create-product', product).pipe(
			switchMap(() => of({ message: 'Product created' })),
			catchError((error) => throwError(error)),
		);
	}

	public getProducts(): Observable<Product[]> {
		this.logger.log('Get Products');

		return this.microProductClient
			.send('get-products', '')
			.pipe(catchError((error) => throwError(error)));
	}
}
