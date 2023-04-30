import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
          checked: false,
        },
      });
      return item;
    }),
});
