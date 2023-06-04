import { publicProcedure, router } from './trpc';
import prisma from './prisma';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const isMin = (min: number) => z.string().min(min, {
	message: `Must be at least ${min} characters long`,
});

const isMax = (max: number) => z.string().max(max, {
	message: `Must be at most ${max} characters long`,
});

const isBetween = (min: number, max: number) => z.string().min(min, {
	message: `Must be at least ${min} characters long`,
}).max(max, {
	message: `Must be at most ${max} characters long`,
});


const createUserSchema = z.object({
	id: z.number().optional(),
	firstName: isBetween(2, 50),
	lastName: isBetween(2, 50),
});

const updateUserSchema = createUserSchema.partial();

const appRouter = router({

	// user procedures
	userList: publicProcedure
		.query(async () => {
			return await prisma.user.findMany();
		}),

	userById: publicProcedure
		.input(z.number())
		.query(async (opts) => {
			const { input } = opts;
			return await prisma.user.findUnique({ where: { id: input } });
		}),

	userCreate: publicProcedure
		.input(createUserSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.user.create({ data: input });
		}),

	userCreateMany: publicProcedure
		.input(z.array(createUserSchema))
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.user.createMany({ data: input });
		}),

	userUpdate: publicProcedure
		.input(z.object({
			id: z.number(),
			data: updateUserSchema,
		}))
		.mutation(async (opts) => {
			const { input } = opts;
			const { id, data } = input;
			return await prisma.user.update({ where: { id }, data });
		}),

	userDelelte: publicProcedure
		.input(z.number())
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.user.delete({ where: { id: input } });
		}),

	userDeleteAll: publicProcedure
		.mutation(async () => {
			return await prisma.user.deleteMany();
		}),


});

const server = createHTTPServer({
	router: appRouter,
});

server.listen(3000);

console.log('server started on http://localhost:3000');

export type AppRouter = typeof appRouter;
