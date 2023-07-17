<script>
	import { Button, TextInput, Title, Center, ActionIcon } from '@svelteuidev/core';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';

	let showPassword = false;
</script>

<form
	method="POST"
	on:submit|preventDefault={() => {
		console.log('login form submit');
	}}
>
	<Center><Title order={1}>Log in</Title></Center>
	<TextInput
		placeholder="Email"
		size="lg"
		type="email"
		pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
		required
	/>
	<TextInput placeholder="Password" size="lg" type={showPassword ? 'text' : 'password'} required>
		<svelte:fragment slot="rightSection">
			{#if showPassword}
				<ActionIcon on:click={() => (showPassword = false)}><EyeOpen /></ActionIcon>
			{:else}
				<ActionIcon on:click={() => (showPassword = true)}><EyeClosed color="#646F70" /></ActionIcon
				>
			{/if}
		</svelte:fragment>
	</TextInput>
	<Center><Button color="#1CBC7F" size="lg">Submit</Button></Center>
</form>

<style>
	form {
		margin-top: 60%;
		height: 80%;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>
