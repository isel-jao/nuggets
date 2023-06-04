import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { User } from '@prisma/client';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
		}),
	],
});


async function main() {
	await trpc.userDeleteAll.mutate();
	await trpc.userCreateMany.mutate([
		{
			firstName: "j",
			lastName: "Doe",
		},
		{
			firstName: "Jane",
			lastName: "Doe",
		},
	]);
	const users = await trpc.userList.query();
	console.log({ users });
}


main().catch(err => {
	console.error(err);
});

