import {
	collection,
	onSnapshot,
	type CollectionReference,
	type Firestore,
	type Query
} from 'firebase/firestore';
import { writable } from 'svelte/store';

/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|Query|CollectionReference} ref collection path, reference, or query
 * @param  {[]} startWith optional default data
 * @returns a store with realtime updates on collection data
 */
export function collectionStore<T>(
	firestore: Firestore,
	ref: string | Query | CollectionReference,
	startWith: T[] = []
) {
	let unsubscribe: () => void;

	// Fallback for SSR
	if (!firestore || !globalThis.window) {
		console.warn('Firestore is not initialized or not in browser');
		const { subscribe } = writable(startWith);
		return {
			subscribe,
			ref: null
		};
	}

	const colRef = typeof ref === 'string' ? collection(firestore, ref) : ref;

	const { subscribe } = writable(startWith, (set) => {
		unsubscribe = onSnapshot(colRef, (snapshot) => {
			const data = snapshot.docs.map((s) => {
				return { id: s.id, ref: s.ref, ...s.data() } as T;
			});
			set(data);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: colRef
	};
}
