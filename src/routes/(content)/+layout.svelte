<script lang="ts">
	import {
		AppShell,
		Navbar,
		Header,
		Title,
		TextInput,
		Skeleton,
		ShellSection,
		Stack,
		Button
	} from '@svelteuidev/core';
	import { MagnifyingGlass } from 'radix-icons-svelte';
	import Person from '~icons/material-symbols/person';
	import BookmarkFilled from '~icons/material-symbols/bookmark';
	import List from '~icons/ph/list-fill';
	import Bell from '~icons/mdi/bell';
	import { goto } from '$app/navigation';

	// so typescript doesn't cry about the type "MagnifyingGlass" is not an SVG type
	const MagnifyingGlassTS = MagnifyingGlass as unknown as undefined;
</script>

<AppShell class="h-auto min-h-screen bg-[#EAF4F4]">
	<Header slot="header" height={'75px'} class="flex items-center">
		<Title class="ml-[7.75%] font-plex font-[600]"><b>LinkedIn't</b></Title>
		<TextInput
			placeholder="Search"
			icon={MagnifyingGlassTS}
			class="w-1/4 ml-24"
			radius="xl"
			variant="filled"
		/>
		<Skeleton circle height={50} class="ml-auto mr-44" />
	</Header>
	<Navbar slot="navbar" class="h-full w-1/5 bg-[#EAF4F4] mt-6">
		<Stack class="w-50 h-full flex ml-auto" spacing="lg">
			<Button
				variant="subtle"
				color="gray"
				size="xl"
				class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
				on:click={() => goto('/projects')}
			>
				<List slot="leftIcon" color="#646F70" />Feed
			</Button>
			<Button
				variant="subtle"
				color="gray"
				size="xl"
				class="hover:bg-[#EAF4F4] mr-auto h-auto font-[500]"
				on:click={() => goto('/my/projects')}
			>
				<BookmarkFilled slot="leftIcon" color="#646F70" />My projects
			</Button>
			<Button
				variant="subtle"
				color="gray"
				size="xl"
				class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
				on:click={() => goto('/my/profile')}
			>
				<Person slot="leftIcon" color="#646F70" />Profile
			</Button>
			<Button
				variant="subtle"
				color="gray"
				size="xl"
				class="hover:bg-[#EAF4F4] mr-auto h-auto  font-[500]"
				on:click={() => goto('/my/notifications')}
			>
				<Bell slot="leftIcon" color="#646F70" />Notifications
			</Button>
			<Button
				variant="subtle"
				color="#19191D"
				class="bg-[#B3E9D5] hover:bg-[#B3E9D5] ml-auto mr-auto rounded-3xl w-10/12 h-16 text-xl font-[500]"
				on:click={() => goto('/projects/create')}
			>
				New Post
			</Button>
		</Stack>
	</Navbar>
	<ShellSection grow className="w-2/3 ml-16 h-full"><slot /></ShellSection>
</AppShell>
