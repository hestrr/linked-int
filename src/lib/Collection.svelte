<script lang="ts">
	import type { CollectionReference, Firestore, Query } from 'firebase/firestore';
	import { collectionStore, sdk } from './stores';

	interface $$Slots {
		default: { data: any[]; ref: CollectionReference | Query | null; count: number };
		loading: {};
	}

	export let ref: string | CollectionReference | Query;
	export let firestore: Firestore = $sdk?.firestore;
	export let startWith: any = undefined;

	let store = collectionStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
	<slot name="loading" />
{/if}
