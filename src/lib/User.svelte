<script lang="ts">
	import type { Auth, User } from 'firebase/auth';
	import { sdk, userStore } from './stores';

	interface $$Slots {
		default: { user: User };
		signedOut: NonNullable<unknown>;
	}

	export let auth: Auth = $sdk?.auth;

	const user = userStore(auth);
</script>

{#if $user}
	<slot user={$user} />
{:else}
	<slot name="signedOut" />
{/if}
