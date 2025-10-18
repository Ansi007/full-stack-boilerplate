import { z } from 'zod';

export const CrudEntity = z.object({
  id: z.string(),
  content: z.string(),
});
export type CrudEntity = z.infer<typeof CrudEntity>;

/* -------------------- CREATE -------------------- */
export const CreateCrudRequest = z.object({
  content: z.string(),
});
export type CreateCrudRequest = z.infer<typeof CreateCrudRequest>;

export const CreateCrudResponse = z.object({
  success: z.boolean(),
  data: CrudEntity.optional(),
});
export type CreateCrudResponse = z.infer<typeof CreateCrudResponse>;

/* -------------------- READ -------------------- */
export const FindOneCrudRequest = z.object({
  id: z.string(),
});
export type FindOneCrudRequest = z.infer<typeof FindOneCrudRequest>;

export const FindOneCrudResponse = CrudEntity;
export type FindOneCrudResponse = z.infer<typeof FindOneCrudResponse>;

export const FindAllCrudResponse = z.array(CrudEntity);
export type FindAllCrudResponse = z.infer<typeof FindAllCrudResponse>;

/* -------------------- UPDATE -------------------- */
export const UpdateCrudRequest = z.object({
  id: z.string(),
  data: z.object({
    content: z.string().optional(),
  }),
});
export type UpdateCrudRequest = z.infer<typeof UpdateCrudRequest>;

export const UpdateCrudResponse = CrudEntity;
export type UpdateCrudResponse = z.infer<typeof UpdateCrudResponse>;

/* -------------------- DELETE -------------------- */
export const DeleteCrudRequest = z.object({
  id: z.string(),
});
export type DeleteCrudRequest = z.infer<typeof DeleteCrudRequest>;

export const DeleteCrudResponse = z.object({
  success: z.boolean(),
});
export type DeleteCrudResponse = z.infer<typeof DeleteCrudResponse>;
