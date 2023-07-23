import { auth } from '$lib/firebase/server';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export async function load({ cookies }: LayoutServerLoadEvent) {
	let user;
	try {
		const token = cookies.get('token');
		user = token ? await auth.verifyIdToken(token) : null;
	} catch {
		// The token is set but invalid or expired
		cookies.set('token', '', { maxAge: -1 });
		throw redirect(307, '/');
	}
	if (user !== null) {
		throw redirect(307, '/projects');
	}
}
