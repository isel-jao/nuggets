import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc"


const isAuthed = middleware((opts) => {
	const { ctx } = opts;
	// `ctx.user` is nullable
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return opts.next({
		ctx: {
			// ✅ user value is known to be non-null now
			user: ctx.user,
		},
	});
});

export default isAuthed;