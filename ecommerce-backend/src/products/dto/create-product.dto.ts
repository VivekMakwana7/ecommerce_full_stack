import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @Type(() => String) // Ensure it's treated as string initially if coming from form-data
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
        }
        return value;
    })
    @IsArray()
    @IsString({ each: true })
    color: string[];

    @IsNotEmpty()
    @Type(() => String)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
        }
        return value;
    })
    @IsArray()
    @IsString({ each: true })
    size: string[];

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    subCategoryId: number;
}
