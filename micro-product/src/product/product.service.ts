import { RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

// REPOSITORIES
import { ProductRepository } from './../database/repositores/product.repository';

// SCHEMAS
import { ProductDocument } from '../database/schemas/product.schema';

// DTO's
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductService {
	private logger = new Logger(`MICRO-PRODUCT: ${ProductService.name}`);

	constructor(private readonly productRepository: ProductRepository) {}

	public createProduct(
		createProductDto: CreateProductDto,
	): Observable<ProductDocument> {
		this.logger.log(
			`Create product - Payload: ${JSON.stringify(createProductDto)}`,
		);

		return from(
			this.productRepository.productModel.create(createProductDto),
		).pipe(catchError((error) => throwError(error)));
	}

	public getProducts(): Observable<ProductDocument[]> {
		this.logger.log('Get Products');

		return from(this.productRepository.productModel.find()).pipe(
			catchError((error) => throwError(error)),
		);
	}

	public getProductById(
		productId: Types.ObjectId,
	): Observable<ProductDocument> {
		this.logger.log(`Get Product By Id - Payload ${productId}`);

		return from(
			this.productRepository.productModel.findById(productId),
		).pipe(
			map((product) => {
				if (!product) {
					throw new RpcException('Product not found');
				}

				return product;
			}),
			catchError((error) => {
				throw new RpcException(error);
			}),
		);
	}
}
