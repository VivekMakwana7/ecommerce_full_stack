import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @Roles('admin') // Only admin can view all users
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        if (req.user.role !== 'admin' && req.user.id !== +id) {
            throw new ForbiddenException('You can only view your own profile');
        }
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
        if (req.user.role !== 'admin' && req.user.id !== +id) {
            throw new ForbiddenException('You can only update your own profile');
        }
        // If not admin, prevent role change
        if (req.user.role !== 'admin' && updateUserDto.role) {
            throw new ForbiddenException('You cannot update your role');
        }
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Roles('admin') // Only admin can delete users
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
