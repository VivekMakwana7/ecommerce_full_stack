import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    private transformProduct(product: Product): Product {
        if (product && product.image) {
            // Ensure no double slashes and correct path separator
            const cleanPath = product.image.replace(/\\/g, '/');
            // Assuming image is stored as 'uploads/filename.ext', and we mapped /uploads to server root
            // But multer diskStorage usually gives full relative path like 'uploads\filename'
            // We want 'http://localhost:3000/uploads/filename'

            // Extract just the filename if it includes 'uploads'
            const filename = cleanPath.split('/').pop();
            const baseUrl = 'http://localhost:3000'; // Ideally from ConfigService
            product.image = `${baseUrl}/uploads/${filename}`;
        }
        return product;
    }

    async create(createProductDto: CreateProductDto, image?: string) {
        const { categoryId, subCategoryId, ...rest } = createProductDto;

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const subCategory = await this.categoryRepository.findOne({ where: { id: subCategoryId } });
        if (!subCategory) throw new NotFoundException(`SubCategory with ID ${subCategoryId} not found`);

        const product = this.productRepository.create({
            ...rest,
            category,
            subCategory,
            image,
        });
        const savedProduct = await this.productRepository.save(product);
        return this.transformProduct(savedProduct);
    }

    async findAll() {
        const products = await this.productRepository.find();
        return products.map(product => this.transformProduct(product));
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return this.transformProduct(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto, image?: string) {
        const product = await this.findOne(id); // access inner findOne usually, but here we can just do repo find to avoid double transform? 
        // Actually, findOne returns transformed product. saving it back might be an issue if we change the URL.
        // Better to act on the Entity directly from repo for update logic.

        // Let's refactor findOne inside update to use repo
        const productToUpdate = await this.productRepository.findOne({ where: { id } });
        if (!productToUpdate) throw new NotFoundException(`Product with ID ${id} not found`);

        const { categoryId, subCategoryId, ...rest } = updateProductDto;

        if (categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
            productToUpdate.category = category;
        }

        if (subCategoryId) {
            const subCategory = await this.categoryRepository.findOne({ where: { id: subCategoryId } });
            if (!subCategory) throw new NotFoundException(`SubCategory with ID ${subCategoryId} not found`);
            productToUpdate.subCategory = subCategory;
        }

        if (image) {
            productToUpdate.image = image;
        }

        Object.assign(productToUpdate, rest);
        const savedProduct = await this.productRepository.save(productToUpdate);
        return this.transformProduct(savedProduct);
    }

    async remove(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return this.productRepository.remove(product);
    }
}
