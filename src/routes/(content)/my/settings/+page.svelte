<script lang="ts">
	import {
		Paper,
		Flex,
		Stack,
		Title,
		Text,
		NativeSelect,
		Textarea,
		Button
	} from '@svelteuidev/core';
	import Camera from '~icons/mdi/camera';
	import Telegram from '~icons/fa6-brands/telegram';
	import Behance from '~icons/devicon-plain/behance';
	import { GithubLogo, Cross2, Keyboard } from 'radix-icons-svelte';
	import { auth, firestore } from '$lib';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import type { User as UserType } from '$lib/types';
	import type { User } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let user: User;
	let userData: UserType;

	let username: string;
	let email: string;

	let name: string;
	let surname: string;
	let year: string | undefined;
	let about: string | undefined;
	let tags = [] as string[];

	let githubLink: string | undefined;
	let telegramLink: string | undefined;
	let behanceLink: string | undefined;

	const yearOptions = [
		'1st year bachelor',
		'2nd year bachelor',
		'3rd year bachelor',
		'4th year bachelor',
		'1st year master',
		'2nd year master',
		'3rd year master',
		'1st year postgrad',
		'2nd year postgrad',
		'3rd year postgrad'
	] as string[];

	onMount(async () => {
		if (!auth.currentUser || !auth.currentUser.uid) throw redirect(307, '/auth/login');
		user = auth.currentUser;
		let userDataSnap = await getDoc(doc(firestore, '/users', user.uid));
		userData = userDataSnap.data() as UserType;
		if (!userData) throw redirect(307, '/auth/login');
		username = userData?.username;
		name = userData?.name;
		surname = userData?.surname;
		year = userData?.year;
		about = userData?.about;
		githubLink = userData?.githubLink;
		telegramLink = userData?.telegramLink;
		behanceLink = userData?.behanceLink;
		email = userData?.email;
		tags = userData?.tags ?? [];
	});

	let newTagValue: string;

	function handleNewTag(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		tags = [...tags, newTagValue];
		newTagValue = '';
	}

	function handleDeleteTag(tagToDelete: string) {
		tags = tags.filter((el) => el !== tagToDelete);
	}
	function handleSubmit() {
		setDoc(doc(firestore, '/users', user.uid), {
			username,
			name,
			surname,
			email,
			about: about ?? '',
			year: year ?? [],
			tags,

			telegramLink: telegramLink ?? '',
			githubLink: githubLink ?? '',
			behanceLink: behanceLink ?? ''
		} as UserType);
		goto('/my/profile');
	}
</script>

<form>
	<Paper class="mb-40">
		<Flex align="center">
			<Paper
				class="bg-[#D9D9D9] rounded-full w-32 aspect-square flex justify-center items-center ml-[5%]"
				><Camera class="w-14 h-14" color="white" /></Paper
			>
			<Flex class="ml-[5%] w-[80%]" justify="space-between">
				<Stack>
					<Title order={1} class="font-[500]">
						{name}
						{surname}
					</Title>
					<Text color="#6E6E6E" class="ml-[2%]">{year}</Text>
				</Stack>
				<Flex class="w-[30%] -mt-[7%] float-right mr-[5%]" align="center" justify="space-evenly">
					{#if telegramLink}
						<a href={telegramLink}><Telegram class="w-8 h-8" color="#6E6E6E" /></a>
					{/if}
					{#if githubLink}
						<a href={githubLink}><GithubLogo class="w-8 h-8" color="#6E6E6E" /></a>
					{/if}
					{#if behanceLink}
						<a href={behanceLink}><Behance class="w-8 h-8" color="#6E6E6E" /></a>
					{/if}
				</Flex>
			</Flex>
		</Flex>
		<Flex class="mt-[3%]">
			<Stack spacing="sm" class="w-2/5 ml-[5%]">
				<label for="name" class="font-[400] text-lg">Name</label>
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 placeholder-gray-500 placeholder-opacity-100 border-[#C9CFD6] focus:text-black"
					id="name"
					placeholder={name}
					bind:value={name}
				/>
			</Stack>
			<Stack spacing="sm" class="w-2/5 ml-[10%]">
				<label for="name" class="font-[400] text-lg">Surname</label>
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 border-[#C9CFD6] text-black"
					id="name"
					placeholder={surname}
					bind:value={surname}
				/>
			</Stack>
		</Flex>
		<Stack class="m-[5%] w-2/5">
			<label for="year" class="font-[400] text-lg">Year</label>
			<NativeSelect
				data={yearOptions}
				class="[&>*>*]:border-[#C9CFD6] [&>*>:not(div)]:bg-[#F8F9FA] [&>*>*]:rounded-xl"
				id="year"
				placeholder={year ? year : 'Select from this list'}
				bind:value={year}
			/>
		</Stack>
		<Stack class="m-[5%] w-[90%] mb-[2%]">
			<label for="year" class="font-[400] text-lg">About</label>
			<Textarea
				class="[&>*>*]:p-2 [&>*>*]:border-[#C9CFD6] [&>*>*]:bg-[#F8F9FA] [&>*>*]:pb-[5%] focus:[&>*>*]:border-black [&>*>*]:border-2 [&>*>*]:rounded-xl"
				bind:value={about}
				placeholder="Tell about yourself"
				variant="unstyled"
			/>
		</Stack>
		<Stack class="m-[5%] w-[90%] mt-0">
			<label for="year" class="font-[400] text-lg">Tecnologies</label>
			<div class="h-auto">
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-lg p-4 border-[#C9CFD6] text-black"
					placeholder="Enter new tag"
					bind:value={newTagValue}
					on:keydown={handleNewTag}
				/>
				<Flex class="w-full flex-wrap [&>*]:mt-[2%] [&>*]:mr-[2%]">
					{#if tags}
						{#each tags as tag}
							<div class="bg-blue-100 px-4 py-2 rounded-2xl flex items-center max-h-16 w-auto">
								{tag}
								<button type="button" on:dblclick={() => handleDeleteTag(tag)}>
									<Cross2 class="mt-[2%] ml-[2%] [color:gray] hover:[color:black]" size={20} />
								</button>
							</div>
						{/each}
					{:else}
						<div class="mt-5">
							You haven't specified your technologies yet. It's time to fix it!
						</div>
					{/if}
				</Flex>
			</div>
		</Stack>
		<Stack>
			<div class="ml-[5%] text-xl">Links</div>
			<Flex class="w-2/5 ml-[5.5%] h-auto">
				<Telegram class="w-8 h-8" color="#6E6E6E" />
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 placeholder-gray-500 placeholder-opacity-100 border-[#C9CFD6] focus:text-black ml-[5%]"
					placeholder={'Add Telegram link'}
					bind:value={telegramLink}
				/>
			</Flex>
			<Flex class="w-2/5 ml-[5.5%] h-auto">
				<GithubLogo class="w-8 h-8" color="#6E6E6E" />
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 placeholder-gray-500 placeholder-opacity-100 border-[#C9CFD6] focus:text-black ml-[5%]"
					placeholder={'Add Github link'}
					bind:value={githubLink}
				/>
			</Flex>
			<Flex class="w-2/5 ml-[5.5%] h-auto">
				<Behance class="w-8 h-8" color="#6E6E6E" />
				<input
					class="w-full h-8 bg-[#F8F9FA] border-2 rounded-xl p-4 placeholder-gray-500 placeholder-opacity-100 border-[#C9CFD6] focus:text-black ml-[5%]"
					placeholder={'Add Behance link'}
					bind:value={behanceLink}
				/>
			</Flex>
		</Stack>
		<Button
			variant="subtle"
			color="#19191D"
			class="bg-[#B3E9D5] hover:bg-[#6bd9b3] ml-[5%] mt-[5%] rounded-3xl w-1/5 h-14 text-xl font-[500]"
			type="button"
			on:click={handleSubmit}
		>
			Save
		</Button>
	</Paper>
</form>
