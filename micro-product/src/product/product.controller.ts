import { Types } from 'mongoose';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// SERVICES
import { ProductService } from './product.service';

// SCHEMAS
import { ProductDocument } from '../database/schemas/product.schema';

// DTO's
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@MessagePattern('create-product')
	public createProduct(
		createProductDto: CreateProductDto,
	): Observable<ProductDocument> {
		return this.productService
			.createProduct(createProductDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@EventPattern('get-products')
	public getProducts(): Observable<ProductDocument[]> {
		return this.productService
			.getProducts()
			.pipe(catchError((error) => throwError(error)));
	}

	@EventPattern('get-product-by-id')
	public getProductById(
		productId: Types.ObjectId,
	): Observable<ProductDocument> {
		return this.productService
			.getProductById(productId)
			.pipe(catchError((error) => throwError(error)));
	}
}
