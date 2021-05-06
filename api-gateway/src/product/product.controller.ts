import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// SERVICES
import { ProductService } from './product.service';

// DTO's
import { CreateProductDto } from './dtos/create-product.dto';

// INTERFACES
import { Product } from './interfaces/product.interface';

// GUARDS
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	public createProduct(
		@Body() createProductDto: CreateProductDto,
	): Observable<{
		message: string;
	}> {
		return this.productService
			.createProduct(createProductDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@Get()
	public getProducts(): Observable<Product[]> {
		return this.productService
			.getProducts()
			.pipe(catchError((error) => throwError(error)));
	}
}
