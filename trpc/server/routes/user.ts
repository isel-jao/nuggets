import { publicProcedure, router } from '../trpc';
import prisma from '../common/prisma';
import { z } from 'zod';
import { isBetween, isEmail, isId } from '../utils';
import bcrypt from 'bcryptjs';



export const createUserSchema = z.object({
	id: z.number().optional(),
	firstName: isBetween(2, 50),
	lastName: isBetween(2, 50),
	email: isEmail(),
	password: z.string().min(8),
});

export const updateUserSchema = createUserSchema.partial();

const userRouter = router({

	userList: publicProcedure
		.query(async () => {
			return await prisma.user.findMany();
		}),

	userById: publicProcedure
		.input(isId())
		.query(async (opts) => {
			const { input } = opts;
			return await prisma.user.findUnique({ where: { id: input } });
		}),

	userCreate: publicProcedure
		.input(createUserSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const { password, ...rest } = input;
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			return await prisma.user.create({
				data: {
					...rest,
					password: hashedPassword,
				}
			});
		}),

	userCreateMany: publicProcedure
		.input(z.array(createUserSchema))
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.user.createMany({
				data: await Promise.all(input.map(async (user) => {
					const { password, ...rest } = user;
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(password, salt);
					return {
						...rest,
						password: hashedPassword,
					};
				})),
			});
		}),

	userUpdate: publicProcedure
		.input(z.object({
			id: isId(),
			data: updateUserSchema,
		}))
		.mutation(async (opts) => {
			const { input } = opts;
			const { id, data } = input;
			return await prisma.user.update({ where: { id }, data });
		}),

	userDelelte: publicProcedure
		.input(isId())
		.mutation(async (opts) => {
			const { input } = opts;
			return await prisma.user.delete({ where: { id: input } });
		}),

	userDeleteAll: publicProcedure
		.mutation(async () => {
			return await prisma.user.deleteMany();
		}),


});


export default userRouter;

