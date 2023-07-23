import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const sdk = writable<{ auth: Auth; firestore: Firestore }>();
