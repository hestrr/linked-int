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
	class="h-4/5 w-full flex flex-wrap flex-col justify-evenly mt-[60%]"
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
	<Center><Button type="submit" size="lg" class="bg-[#1CBC7F]">Submit</Button></Center>
</form>
