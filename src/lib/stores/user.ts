import { onAuthStateChanged, type Auth } from 'firebase/auth';
import { writable } from 'svelte/store';

/**
 * @param  {Auth} auth firebase auth instance
 * @returns a store with the current firebase user
 */
export function userStore(auth: Auth) {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized on not in browser');
		const { subscribe } = writable(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}
