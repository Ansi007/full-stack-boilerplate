import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  crud: t.router({
    createCrud: publicProcedure.input(z.object({
      content: z.string(),
    })).output(z.object({
      success: z.boolean(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.output(z.array(z.object({
      id: z.number().int(),
      content: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findOneCrud: publicProcedure.input(z.object({
      id: z.number().int(),
    })).output(z.object({
      id: z.number().int(),
      content: z.string(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateCrud: publicProcedure.input(z.object({
      id: z.number().int(),
      data: z.object({
        content: z.string().optional(),
      }),
    })).output(z.object({
      id: z.number().int(),
      content: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteCrud: publicProcedure.input(z.object({
      id: z.number().int(),
    })).output(z.object({
      success: z.boolean(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

