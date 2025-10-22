import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { CrudService } from './crud.service';
import * as crudSchema from './crud.schema';

import {
  ZCrudCreateRequest,
  ZCrudCreateResponse,
  ZCrudDeleteRequest,
  ZCrudDeleteResponse,
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
    };
  }

  @Query({
    output: ZCrudFindAllResponse,
  })
  async findAll(): Promise<crudSchema.TCrudFindAllResponse> {
    return (await this.crudService.findAll()) as crudSchema.TCrudFindAllResponse;
  }

  @Query({
    input: ZCrudFindOneRequest,
    output: ZCrudFindOneResponse,
  })
  async findOneCrud(
    @Input() req: crudSchema.TCrudFindOneRequest,
  ): Promise<crudSchema.TCrudFindOneResponse> {
    const result = await this.crudService.findOne({ where: { id: req.id } });
    if (!result) {
      throw new Error(`Crud item with ID ${req.id} not found.`);
    }
    return result as crudSchema.TCrudFindOneResponse;
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
    return updated as crudSchema.TCrudUpdateResponse;
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
    };
  }
}
