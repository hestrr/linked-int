import cookie from 'cookie';
import { browser } from '$app/environment';
import {
	type User,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../firebase/client';

export const user = writable<User | null>(null);

export async function register(email: string, password: string) {
	const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
	user.set(userCredentials.user);
	return userCredentials.user;
}

export async function login(email: string, password: string) {
	const userCredentials = await signInWithEmailAndPassword(auth, email, password);
	user.set(userCredentials.user);
}

export async function logout() {
	await signOut(auth);
	user.set(null);
}

if (browser) {
	auth.onIdTokenChanged(async (newUser) => {
		const tokenCurrentlySet = cookie.parse(document.cookie)['token'] !== undefined;
		const token = newUser ? await newUser?.getIdToken() : undefined;
		document.cookie = cookie.serialize('token', token ?? '', {
			path: '/',
			maxAge: token ? undefined : 0,
			sameSite: 'none',
			secure: true
		});
		user.set(newUser);

		if (!tokenCurrentlySet && token) {
			document.location.reload();
		}
	});

	// refresh the ID token every 10 minutes
	setInterval(async () => {
		if (auth.currentUser) {
			await auth.currentUser.getIdToken(true);
		}
	}, 10 * 60 * 1000);
}
