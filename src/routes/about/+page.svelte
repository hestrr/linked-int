<script lang="ts">
	import { Title, Stack, Flex, Paper } from '@svelteuidev/core';
	import Telegram from '~icons/fa6-brands/telegram';
	import { GithubLogo } from 'radix-icons-svelte';

	const founders = [
		{
			name: 'Polina Moiseeva',
			role: 'Graphic design, UX/UI design',
			socials: {
				telegram: 'https://t.me/hesterika',
				github: 'https://github.com/hestrr'
			},
			img: 'images/founders/polina.png'
		},
		{
			name: 'Roman Pogrebnyak',
			role: 'Frontend, DevOps',
			socials: {
				telegram: 'https://t.me/ropero_2',
				github: 'https://github.com/Gendiro'
			},
			img: 'images/founders/roman.png'
		},
		{
			name: 'Evgeniy Anisov',
			role: 'Frontend',
			socials: {
				telegram: 'https://t.me/anijack',
				github: 'https://github.com/anijackich'
			},
			img: 'images/founders/evgeniy.png'
		},
		{
			name: 'Dias Belgibayev',
			role: 'Layouts king',
			socials: {
				telegram: 'https://t.me/rincw',
				github: 'https://github.com/blgdis'
			},
			img: 'images/founders/dias.png'
		}
	];
</script>

<svelte:head>
	<title>About Us | LinkedIn't</title>
</svelte:head>
<h1 class="text-5xl font-plex text-[#31363F] mt-10">About Us</h1>
{#each founders as founder}
	<Paper
		class="flex bg-transparent align-middle space-x-8"
		style="margin-top: 43px; width: 810px; height: 188px; border-radius: 30px; border: 1px solid #31363F; box-shadow: 0 4px 4px 0 #00000040"
	>
		<Stack>
			<img src={founder.img} alt={founder.name} style="width: 120px !important; " />
		</Stack>
		<Stack spacing="md" class="w-3/5">
			<Title order={2} class="font-[500] font-inter" style="font-size: 32px">{founder.name}</Title>
			<p class="font-[400] font-inter" style="font-size: 26px">{founder.role}</p>
		</Stack>
		<Stack>
			<Flex class="w-36 -mt-16 float-right mr-[5%]" align="center" justify="space-evenly">
				<a href={founder.socials.telegram}><Telegram class="w-10 h-10" color="#373741" /></a>
				<a href={founder.socials.github}><GithubLogo class="w-10 h-10" color="#373741" /></a>
			</Flex>
		</Stack>
	</Paper>
{/each}
<h1 class="text-2xl font-[500]" style="margin-top: 95px;">
	To learn more about the project, visit our <a
		class="underline"
		href="https://github.com/hestrr/linked-int">GitHub repository</a
	>.
</h1>
