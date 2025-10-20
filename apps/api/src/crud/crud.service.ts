import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Crud } from '../../generated/prisma';

@Injectable()
export class CrudService {
  constructor(private prisma: PrismaService) {}

  async create(content: string): Promise<boolean> {
    if (!content) {
      throw new NotFoundException();
    }

    try {
      await this.prisma.crud.create({
        data: { content },
      });
      return true;
    } catch (error: any) {
      console.error('Error creating item:', error);
      return false;
    }
  }

  async findAll(): Promise<Crud[]> {
    return this.prisma.crud.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Crud> {
    const crud = await this.prisma.crud.findUnique({
      where: { id },
    });

    if (!crud) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    return crud;
  }

  async update(id: number, data: Partial<Crud>): Promise<Crud> {
    try {
      return await this.prisma.crud.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Item with id "${id}" not found ${error}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    await this.prisma.crud.delete({
      where: { id },
    });

    const found = await this.prisma.crud.findFirst({
      where: { id },
    });

    return !found;
  }
}
