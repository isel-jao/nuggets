import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';


const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
			headers: {
				authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjg1OTc3NDU4LCJleHAiOjE2ODU5NzgzNTh9.3KDhUaQy3SOS8tqa8FNeyDqKsIlQ-hJml34V-M6fi1A`
			}
		}),
	],
});

async function main() {
	console.clear();

	const posts = await trpc.post.findMany.query();
	console.log({ posts });

	const users = await trpc.user.findMany.query();
	console.log({ users });


}


main().catch(err => {
	console.error(err);
});