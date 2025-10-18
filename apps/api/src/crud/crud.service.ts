// crud.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudEntity } from './crud.schema';

@Injectable()
export class CrudService {
  private readonly cruds: CrudEntity[] = [];

  create(content: string): boolean {
    const id: string = Date.now().toString();
    const crud: CrudEntity = { id, content };

    const previousLength = this.cruds.length;
    this.cruds.push(crud);

    return this.cruds.length > previousLength;
  }

  findAll(): CrudEntity[] {
    return this.cruds;
  }

  findOne(id: string): CrudEntity {
    const crud = this.cruds.find((item) => item.id === id);
    if (!crud) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }
    return crud;
  }

  update(id: string, updatedCrud: Partial<CrudEntity>): CrudEntity {
    const index = this.cruds.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    this.cruds[index] = { ...this.cruds[index], ...updatedCrud };
    return this.cruds[index];
  }

  // TODO: (It/All (api(s) should return Custom Error Code)
  delete(id: string): void {
    const index = this.cruds.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    this.cruds.splice(index, 1);
  }
}
