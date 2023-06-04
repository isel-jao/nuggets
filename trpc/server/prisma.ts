import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
	console.log('prisma interceptor', params);

	const result = await next(params);
	return result
})
export default prisma;