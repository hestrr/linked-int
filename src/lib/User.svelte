<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import { sdk, userStore } from './stores';

	export let auth: Auth = $sdk?.auth;

	const user = userStore(auth);
</script>

{#if $user}
	<slot user={$user} />
{:else}
	<slot name="signedOut" />
{/if}
