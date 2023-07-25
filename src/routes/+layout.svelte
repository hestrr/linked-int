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
</svelte:head>
<SvelteUIProvider class={customTheme}>
	<slot />
</SvelteUIProvider>
