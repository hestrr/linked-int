<script lang="ts">
	import { Paper, Skeleton, Title, Flex, Stack, Text } from '@svelteuidev/core';
	import Telegram from '~icons/fa6-brands/telegram';
	import Behance from '~icons/devicon-plain/behance';
	import { GithubLogo } from 'radix-icons-svelte';

	export let data;

	const Technologies = [
		'Web',
		'React',
		'Firebase',
		'Spring',
		'Blender',
		'Photoshop',
		'My ass',
		'Dick grayson'
	];
</script>

<Paper class="mb-40">
	<Flex align="center">
		<Skeleton circle height={125} />
		<Flex class="ml-[5%] w-[80%]" justify="space-between">
			<Stack>
				<Title order={1} class="font-[500]">
					{data.userData?.name}
					{data.userData?.surname}
				</Title>
				<Text color="#6E6E6E">1st year student</Text>
				<Paper
					class="flex h-3 w-5/6 items-center justify-center rounded-xl bg-[#E1F2F3] py-3 text-[#67737E]"
				>
					Edit profile
				</Paper>
			</Stack>
			<Flex class="float-right -mt-16 mr-[5%] w-36" align="center" justify="space-evenly">
				<Telegram class="h-8 w-8" color="#6E6E6E" />
				<GithubLogo class="h-8 w-8" color="#6E6E6E" />
				<Behance class="h-8 w-8" color="#6E6E6E" />
			</Flex>
		</Flex>
	</Flex>
	<Stack class="mt-5">
		<Title order={2} class="my-3 w-full font-[500]">About</Title>
		<Text
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim porta dignissim.
			Suspendisse eget lacus eget dolor commodo tempus. Vivamus porta diam enim, vel euismod leo
			venenatis in. Phasellus vehicula rhoncus dolor, eget elementum justo consectetur in. Nullam ut
			tortor tortor. Phasellus eget fermentum nulla, a luctus dolor. Integer eget quam sit amet
			turpis imperdiet euismod a sit amet erat. Vestibulum vel ante nulla. Integer bibendum, purus
			et tristique venenatis, augue dui rhoncus purus, et fringilla nibh nunc nec neque. If you want
			to know more about my experience and personality, contact me via telegram</Text
		>
	</Stack>
	<Stack class="mt-5">
		<Title order={2} class="my-3 font-[500]">Technologies</Title>
		<Flex justify="flex-start" wrap="wrap">
			{#each Technologies as technology}
				<Paper
					class="mb-5 mr-3 flex h-3 w-auto items-center justify-center rounded-2xl bg-[#CFE4F7] px-6 py-4 font-[500] text-[#67737E]"
				>
					{technology}
				</Paper>
			{/each}
		</Flex>
	</Stack>
</Paper>
