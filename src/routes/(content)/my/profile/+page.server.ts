import { auth, firestore } from '$lib/firebase/server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ cookies }: PageServerLoadEvent) {
	let user;
	let userData;
	try {
		const token = cookies.get('token');
		user = token ? await auth.verifyIdToken(token) : null;
	} catch {
		// The token is set but invalid or expired
		cookies.set('token', '', { maxAge: -1 });
		throw redirect(307, '/auth/login');
	}
	if (user) {
		const userSnapshot = await firestore.collection('/users').doc(user.uid).get();
		userData = userSnapshot.data();
	}
	return {
		userData: userData
	};
}
