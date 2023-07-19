<script lang="ts">
	import { Paper, Skeleton, Title, Flex, Stack, Text } from '@svelteuidev/core';
	import Telegram from '~icons/fa6-brands/telegram';
	import Behance from '~icons/devicon-plain/behance';
	import { GithubLogo } from 'radix-icons-svelte';

	const Technologies = ['Web', 'React', 'Firebase', 'Spring', 'Blender', 'Photoshop'];
</script>

<Paper class="mb-40">
	<Flex align="center">
		<Skeleton circle height={125} />
		<Flex class="ml-10">
			<Stack>
				<Title order={1}>Name Surname</Title>
				<Text color="#6E6E6E">1st year student</Text>
				<Paper
					class="bg-[#E1F2F3] w-1/2 h-3 flex justify-center items-center rounded-xl py-3 px-2 text-[#67737E]"
				>
					Edit profile
				</Paper>
			</Stack>
			<Flex class="w-36 -mt-16 ml-32" align="center" justify="space-evenly">
				<Telegram class="w-8 h-8" color="#6E6E6E" />
				<GithubLogo class="w-8 h-8" color="#6E6E6E" />
				<Behance class="w-8 h-8" color="#6E6E6E" />
			</Flex>
		</Flex>
	</Flex>
	<Stack class="mt-5">
		<Title order={1} class="w-full">About me</Title>
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
		<Title order={1}>Technologies</Title>
		<Flex justify="space-between">
			{#each Technologies as technology}
				<Paper
					class="bg-[#CFE4F7] w-auto h-3 flex justify-center items-center rounded-xl py-3 px-6 text-[#67737E]"
				>
					{technology}
				</Paper>
			{/each}
		</Flex>
	</Stack>
</Paper>
