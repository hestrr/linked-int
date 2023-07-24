<script>
	import { SvelteUIProvider, createTheme } from '@svelteuidev/core';
	import '../app.css';

	const customTheme = createTheme('custom-theme', {
		fonts: {
			standard: 'Inter',
			mono: 'Inter',
			fallback: 'Inter'
		}
	});
</script>

<svelte:head>
	<title>LinkedIn't</title>
	<meta name="author" content="LinkedIn't Team">
	<meta name="description" content="A service for students to find teammates for their projects">
</svelte:head>
<SvelteUIProvider class={customTheme}>
	<slot />
</SvelteUIProvider>
