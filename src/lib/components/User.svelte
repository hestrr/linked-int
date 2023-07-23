<script lang="ts">
	import type { Auth, User } from 'firebase/auth';
	import { sdk } from '../stores/sdk';
	import { userStore } from '../stores/user';

	interface $$Slots {
		default: { user: User };
		signedOut: {};
	}

	export let auth: Auth = $sdk?.auth;

	const user = userStore(auth);
</script>

{#if $user}
	<slot user={$user} />
{:else}
	<slot name="signedOut" />
{/if}
