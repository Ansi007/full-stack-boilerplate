import { z } from 'zod';

export const ZCrudModel = z.object({
  id: z.number().int(),
  content: z.string(),
});
export type TCrudModel = z.infer<typeof ZCrudModel>;

export const ZCrudCreateRequest = z.object({
  content: z.string(),
});
export type TCrudCreateRequest = z.infer<typeof ZCrudCreateRequest>;

export const ZCrudCreateResponse = z.object({
  success: z.boolean(),
});
export type TCrudCreateResponse = z.infer<typeof ZCrudCreateResponse>;

export const ZCrudFindOneRequest = z.object({
  id: z.number().int(),
});
export type TCrudFindOneRequest = z.infer<typeof ZCrudFindOneRequest>;

export const ZCrudFindOneResponse = ZCrudModel;
export type TCrudFindOneResponse = z.infer<typeof ZCrudFindOneResponse>;

export const ZCrudFindAllResponse = z.array(ZCrudModel);
export type TCrudFindAllResponse = z.infer<typeof ZCrudFindAllResponse>;

export const ZCrudUpdateRequest = z.object({
  id: z.number().int(),
  data: z.object({
    content: z.string().optional(),
  }),
});
export type TCrudUpdateRequest = z.infer<typeof ZCrudUpdateRequest>;

export const ZCrudUpdateResponse = ZCrudModel;
export type TCrudUpdateResponse = z.infer<typeof ZCrudUpdateResponse>;

export const ZCrudDeleteRequest = z.object({
  id: z.number().int(),
});
export type TCrudDeleteRequest = z.infer<typeof ZCrudDeleteRequest>;

export const ZCrudDeleteResponse = z.object({
  success: z.boolean(),
});
export type TCrudDeleteResponse = z.infer<typeof ZCrudDeleteResponse>;
