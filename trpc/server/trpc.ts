import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import prisma from './common/prisma';
import { Role } from '@prisma/client';
import { verifyToken } from './utils';


interface Context {
	user?: {
		id: string;
		role: Role
	};
}

export const createContext = async (opts: CreateNextContextOptions) => {

	return {
	} as Context;
};


const t = initTRPC.context<typeof createContext>().create();

export const middleware = t.middleware;
export const publicProcedure = t.procedure;


export const router = t.router;