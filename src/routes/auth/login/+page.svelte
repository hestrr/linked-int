<script lang="ts">
	import { login } from '$lib/firebaseAuth';
	import { goto } from '$app/navigation';

	import { Button, TextInput, Title, Center, ActionIcon } from '@svelteuidev/core';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';

	let showPassword = false;

	let email = '' as string;
	let password = '' as string;

	async function handleLogin() {
		await login(email, password).then(() => {
			goto('/projects');
		});
	}
</script>

<form
	method="POST"
	on:submit|preventDefault={handleLogin}
	class="h-4/5 w-full flex flex-wrap flex-col justify-evenly mt-[60%]"
>
	<Center><Title order={1}>Log in</Title></Center>
	<TextInput
		placeholder="Email"
		size="lg"
		type="email"
		pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
		required
		bind:value={email}
	/>
	<TextInput
		placeholder="Password"
		size="lg"
		type={showPassword ? 'text' : 'password'}
		required
		bind:value={password}
	>
		<svelte:fragment slot="rightSection">
			{#if showPassword}
				<ActionIcon on:click={() => (showPassword = false)}><EyeOpen /></ActionIcon>
			{:else}
				<ActionIcon on:click={() => (showPassword = true)}><EyeClosed color="#646F70" /></ActionIcon
				>
			{/if}
		</svelte:fragment>
	</TextInput>
	<Center
		><Button type="submit" size="lg" class="bg-[#1CBC7F]  hover:bg-green-600">Submit</Button
		></Center
	>
</form>
