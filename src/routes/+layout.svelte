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
	<meta name="author" content="Slumber Team" />
	<meta name="description" content="A service for students to find teammates for their projects" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://linkedint.inno.tatar/">
	<meta property="og:type" content="website">
	<meta property="og:title" content="LinkedIn't">
	<meta property="og:description" content="A service for students to find teammates for their projects">
	<meta property="og:image" content="images/preview.png">

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image">
	<meta property="twitter:domain" content="linkedint.inno.tatar">
	<meta property="twitter:url" content="https://linkedint.inno.tatar/">
	<meta name="twitter:title" content="LinkedIn't">
	<meta name="twitter:description" content="A service for students to find teammates for their projects">
	<meta name="twitter:image" content="images/preview.png">

</svelte:head>
<SvelteUIProvider class={customTheme}>
	<slot />
</SvelteUIProvider>
