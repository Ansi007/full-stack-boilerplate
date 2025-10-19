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
  createCrud(@Input() req: CreateCrudRequest): CreateCrudResponse {
    const success = this.crudService.create(req.content);
    return {
      success,
      data: success
        ? { id: Date.now().toString(), content: req.content }
        : undefined,
    };
  }

  /* 🔵 FIND ALL */
  @Query({
    output: FindAllCrudResponse,
  })
  findAll(): FindAllCrudResponse {
    return this.crudService.findAll();
  }

  /* 🟠 FIND ONE */
  @Query({
    input: FindOneCrudRequest,
    output: FindOneCrudResponse,
  })
  findOne(@Input() req: FindOneCrudRequest): FindOneCrudResponse {
    return this.crudService.findOne(req.id);
  }

  /* 🟣 UPDATE */
  @Mutation({
    input: UpdateCrudRequest,
    output: UpdateCrudResponse,
  })
  updateCrud(@Input() req: UpdateCrudRequest): UpdateCrudResponse {
    return this.crudService.update(req.id, req.data);
  }

  /* 🔴 DELETE */
  @Mutation({
    input: DeleteCrudRequest,
    output: DeleteCrudResponse,
  })
  deleteCrud(@Input('id') id: string): DeleteCrudResponse {
    const before = this.crudService.findAll().length;
    this.crudService.delete(id);
    const after = this.crudService.findAll().length;
    return { success: after < before };
  }
}
