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
	await trpc.user.userDeleteAll.mutate();
	await trpc.user.userCreateMany.mutate([
		{
			firstName: "John",
			lastName: "Doe",
			email: "JohnDoe@email.com",
			password: "password"
		},
		{
			firstName: "Jane",
			lastName: "Doe",
			email: "JaneDoe@email.com",
			password: "password"
		},
	]);
	const users = await trpc.user.userList.query();
	console.log({ users });
}


main().catch(err => {
	console.error(err);
});

