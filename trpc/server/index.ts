import { createContext, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import userRouter from './routes/user';
import postRouter from './routes/post';
import authRouter from './routes/auth';




const appRouter = router({
	user: userRouter,
	post: postRouter,
	auth: authRouter
});

const server = createHTTPServer({
	router: appRouter,
	createContext,
});

server.listen(3000);

console.log('server started on http://localhost:3000');

export type AppRouter = typeof appRouter;
