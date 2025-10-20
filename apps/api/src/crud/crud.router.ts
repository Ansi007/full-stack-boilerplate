import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { CrudService } from './crud.service';
import {
  CreateCrudRequest,
  CreateCrudResponse,
  FindOneCrudRequest,
  FindOneCrudResponse,
  FindAllCrudResponse,
  UpdateCrudRequest,
  UpdateCrudResponse,
  DeleteCrudRequest,
  DeleteCrudResponse,
} from './crud.schema';

@Router({ alias: 'crud' })
export class CrudRouter {
  constructor(private readonly crudService: CrudService) {}

  /* 🟢 CREATE */
  @Mutation({
    input: CreateCrudRequest,
    output: CreateCrudResponse,
  })
  async createCrud(
    @Input() req: CreateCrudRequest,
  ): Promise<CreateCrudResponse> {
    const success = await this.crudService.create(req.content);
    return {
      success,
    };
  }

  /* 🔵 FIND ALL */
  @Query({
    output: FindAllCrudResponse,
  })
  async findAll(): Promise<FindAllCrudResponse> {
    return await this.crudService.findAll();
  }

  /* 🟠 FIND ONE */
  @Query({
    input: FindOneCrudRequest,
    output: FindOneCrudResponse,
  })
  async findOne(
    @Input() req: FindOneCrudRequest,
  ): Promise<FindOneCrudResponse> {
    return await this.crudService.findOne(req.id);
  }

  /* 🟣 UPDATE */
  @Mutation({
    input: UpdateCrudRequest,
    output: UpdateCrudResponse,
  })
  async updateCrud(
    @Input() req: UpdateCrudRequest,
  ): Promise<UpdateCrudResponse> {
    return await this.crudService.update(req.id, req.data);
  }

  /* 🔴 DELETE */
  @Mutation({
    input: DeleteCrudRequest,
    output: DeleteCrudResponse,
  })
  async deleteCrud(@Input('id') id: number): Promise<DeleteCrudResponse> {
    const success: boolean = await this.crudService.delete(id);
    return {
      success,
    };
  }
}
