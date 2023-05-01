import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppingItem.findMany({
      take: 100,
      orderBy: [{ createdAt: "asc" }],
    });
    return items;
  }),
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
