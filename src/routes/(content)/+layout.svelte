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
		Button,
		Flex
	} from '@svelteuidev/core';
	import { MagnifyingGlass } from 'radix-icons-svelte';
	import Person from '~icons/material-symbols/person';
	import BookmarkFilled from '~icons/material-symbols/bookmark';
	import List from '~icons/ph/list-fill';
	import Bell from '~icons/mdi/bell';
	import { goto } from '$app/navigation';
	import { firestore, FirebaseApp, User } from '$lib';
	import { auth } from '$lib/firebase/client';
	import { logout } from '$lib/stores/auth';

	// so typescript doesn't cry about the type "MagnifyingGlass" is not an SVG type
	const MagnifyingGlassTS = MagnifyingGlass as unknown as undefined;
</script>

<FirebaseApp {auth} {firestore}>
	<AppShell class="h-auto min-h-screen bg-[#EAF4F4]">
		<Header slot="header" height={'75px'} class="flex items-center">
			<Title class="ml-[6%] font-plex font-[600]"><b>LinkedIn't</b></Title>
			<TextInput
				placeholder="Search"
				icon={MagnifyingGlassTS}
				class="ml-[8.5%] w-1/4"
				radius="xl"
				variant="filled"
			/>
			<User>
				<button on:click={() => logout()} class="ml-auto mr-44">
					<Skeleton circle height={50} />
				</button>
				<div slot="signedOut" class="ml-auto mr-[3%] h-full w-[17%]">
					<Flex class="h-full w-full" justify="space-between" align="center">
						<Button
							variant="outline"
							color="#35484E"
							on:click={() => goto('/auth/register')}
							class="rounded-2xl px-5 text-xl  font-[500]  hover:bg-gray-200">Sign Up</Button
						>
						<Button
							variant="subtle"
							color="#35484E"
							on:click={() => goto('/auth/login')}
							class="rounded-2xl px-5 text-xl font-[500] hover:bg-gray-200">Log in</Button
						>
					</Flex>
				</div>
			</User>
		</Header>
		<Navbar slot="navbar" class="mt-6 h-full w-1/5 bg-[#EAF4F4]">
			<Stack class="w-50 ml-auto flex h-full" spacing="lg">
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="mr-auto h-auto font-[500]  hover:bg-[#EAF4F4]"
					on:click={() => goto('/projects')}
				>
					<List slot="leftIcon" color="#646F70" />Ongoing projects
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="mr-auto h-auto font-[500] hover:bg-[#EAF4F4]"
					on:click={() => goto('/my/projects')}
				>
					<BookmarkFilled slot="leftIcon" color="#646F70" />My projects
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="mr-auto h-auto font-[500]  hover:bg-[#EAF4F4]"
					on:click={() => goto('/my/profile')}
				>
					<Person slot="leftIcon" color="#646F70" />Profile
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size="xl"
					class="mr-auto h-auto font-[500]  hover:bg-[#EAF4F4]"
					on:click={() => goto('/my/notifications')}
				>
					<Bell slot="leftIcon" color="#646F70" />Notifications
				</Button>
				<Button
					variant="subtle"
					color="#19191D"
					class="ml-auto mr-auto h-16 w-10/12 rounded-3xl bg-[#B3E9D5] text-xl font-[500] hover:bg-[#B3E9D5]"
					on:click={() => goto('/projects/create')}
				>
					New Post
				</Button>
			</Stack>
		</Navbar>
		<ShellSection grow className="w-2/3 ml-16 h-full"><slot /></ShellSection>
	</AppShell>
</FirebaseApp>
