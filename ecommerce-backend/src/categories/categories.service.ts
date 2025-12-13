import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, IsNull } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { parentId, ...rest } = createCategoryDto;
    let parent: Category | null = null;
    if (parentId) {
      parent = await this.categoryRepository.findOne({ where: { id: parentId } });
      if (!parent) {
        throw new NotFoundException(`Parent category with ID ${parentId} not found`);
      }
    }
    const category = this.categoryRepository.create({ ...rest, parent });
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({
      where: { parent: IsNull() },
      relations: ['children'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['children', 'parent'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    const { parentId, ...rest } = updateCategoryDto;

    if (parentId !== undefined) {
      if (parentId === null) {
        category.parent = null;
      } else {
        const parent = await this.categoryRepository.findOne({ where: { id: parentId } });
        if (!parent) {
          throw new NotFoundException(`Parent category with ID ${parentId} not found`);
        }
        category.parent = parent;
      }
    }

    Object.assign(category, rest);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }

  async search(query: string) {
    const results = await this.categoryRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
      relations: ['children', 'parent'],
    });

    // Filter out categories if their parent is also in the results
    return results.filter(category => {
      if (!category.parent) return true;
      const parentInResults = results.some(r => r.id === category.parent!.id);
      return !parentInResults;
    });
  }
}
