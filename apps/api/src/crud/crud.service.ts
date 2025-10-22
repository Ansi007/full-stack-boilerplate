import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Crud } from '../generated/prisma';

@Injectable()
export class CrudService {
  constructor(private prisma: PrismaService) {}

  async createCrud(args: Prisma.CrudCreateArgs): Promise<Crud> {
    return this.prisma.crud.create(args);
  }

  async findAll(): Promise<Crud[]> {
    return this.prisma.crud.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(args: Prisma.CrudFindUniqueArgs): Promise<Crud | null> {
    return this.prisma.crud.findUnique(args);
  }

  async update(args: Prisma.CrudUpdateArgs): Promise<Crud> {
    return this.prisma.crud.update(args);
  }

  async delete(args: Prisma.CrudDeleteArgs): Promise<Crud> {
    return this.prisma.crud.delete(args);
  }
}
