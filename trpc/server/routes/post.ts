import { publicProcedure, router } from '../trpc';
import prisma from '../common/prisma';
import { z } from 'zod';
import { isBetween } from '../utils';



export const createPostSchema = z.object({
	id: z.number().optional(),
	title: isBetween(2, 50),
	content: isBetween(2, 50),
	userId: z.number(),
});

export const updatePostSchema = createPostSchema.partial();

const postRouter = router({

	postList: publicProcedure
		.query(async () => {
			return await prisma.post.findMany();
		}),

	postById: publicProcedure
		.input(z.number())
		.query(async (opts) => {
			const { input } = opts;
			return await prisma.post.findUnique({ where: { id: input } });
		}),

	postCreate: publicProcedure
		.input(createPostSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.post.create({ data: input });
		}),

	postCreateMany: publicProcedure
		.input(z.array(createPostSchema))
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.post.createMany({ data: input });
		}),

	postUpdate: publicProcedure
		.input(z.object({
			id: z.number(),
			data: updatePostSchema,
		}))
		.mutation(async (opts) => {
			const { input } = opts;
			const { id, data } = input;
			return await prisma.post.update({ where: { id }, data });
		}),

	postDelelte: publicProcedure
		.input(z.number())
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.post.delete({ where: { id: input } });
		}),

	postDeleteAll: publicProcedure
		.mutation(async () => {
			return await prisma.post.deleteMany();
		}),


});


export default postRouter;

