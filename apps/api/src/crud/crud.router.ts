import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { CrudService } from './crud.service';
import * as crudSchema from './crud.schema';

import {
  ZCrudCreateRequest,
  ZCrudCreateResponse,
  ZCrudDeleteRequest,
  ZCrudDeleteResponse,
  ZCrudFindAllRequest,
  ZCrudFindAllResponse,
  ZCrudFindOneRequest,
  ZCrudFindOneResponse,
  ZCrudUpdateRequest,
  ZCrudUpdateResponse,
} from './crud.schema';

@Router({ alias: 'crud' })
export class CrudRouter {
  constructor(private readonly crudService: CrudService) {}

  @Mutation({
    input: ZCrudCreateRequest,
    output: ZCrudCreateResponse,
  })
  async createCrud(
    @Input() req: crudSchema.TCrudCreateRequest,
  ): Promise<crudSchema.TCrudCreateResponse> {
    const created = await this.crudService.createCrud({
      data: {
        content: req.content,
      },
    });
    return {
      success: created != null,
      id: created?.id,
      message: created ? 'Item created successfully' : 'Failed to create item',
    };
  }

  @Query({
    input: ZCrudFindAllRequest,
    output: ZCrudFindAllResponse,
  })
  async findAll(
    @Input() req?: crudSchema.TCrudFindAllRequest,
  ): Promise<crudSchema.TCrudFindAllResponse> {
    const limit = req?.limit ?? 10;
    const offset = req?.offset ?? 0;
    const data = await this.crudService.findAll();

    return {
      success: data != null,
      cruds: data,
      total: data.length,
      limit,
      offset,
    };
  }

  @Query({
    input: ZCrudFindOneRequest,
    output: ZCrudFindOneResponse,
  })
  async findOneCrud(
    @Input() req: crudSchema.TCrudFindOneRequest,
  ): Promise<crudSchema.TCrudFindOneResponse> {
    const result = await this.crudService.findOne({ where: { id: req.id } });
    return result ?? null;
  }

  @Mutation({
    input: ZCrudUpdateRequest,
    output: ZCrudUpdateResponse,
  })
  async updateCrud(
    @Input() req: crudSchema.TCrudUpdateRequest,
  ): Promise<crudSchema.TCrudUpdateResponse> {
    const updated = await this.crudService.update({
      where: { id: req.id },
      data: req.data,
    });
    return {
      success: updated != null,
      data: updated ?? undefined,
      message: updated ? 'Item updated successfully' : 'Failed to update item',
    };
  }

  @Mutation({
    input: ZCrudDeleteRequest,
    output: ZCrudDeleteResponse,
  })
  async deleteCrud(
    @Input() req: crudSchema.TCrudDeleteRequest,
  ): Promise<crudSchema.TCrudDeleteResponse> {
    const deleted = await this.crudService.delete({
      where: { id: req.id },
    });
    return {
      success: deleted != null,
      message: deleted ? 'Item deleted successfully' : 'Failed to delete item',
    };
  }
}
