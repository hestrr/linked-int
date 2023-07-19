<script>
	import { goto } from '$app/navigation';
	import { Button, Flex, Stack } from '@svelteuidev/core';
</script>

<div class="flex">
	<div
		class="bg-gradient-to-br from-[#3AA0A6] to-[#A3FCC3] w-3/5 h-screen flex justify-center flex-col"
	>
		<h1 class="text-5xl w-full font-plex text-[#31363F] flex justify-center mt-[15%]">
			<b>
				Welcome to <span class="text-white">LinkedIn’t</span><br />
				- a service for finding a<br />
				project team in IU!
			</b>
		</h1>
		<Stack class="w-full h-1/4 mt-10 flex items-center" spacing="xl">
			<Button
				class="w-1/4 h-14 rounded-full bg-white text-[#31363F] text-2xl font-[500] hover:bg-gray-200"
				variant="filled"
				on:click={async () => await goto('/auth/register')}>Sign up</Button
			>
			<Button
				class="w-1/4 h-14 rounded-full text-[#35484E] border-[#35484E] text-2xl font-[500]"
				variant="outline"
				on:click={async () => await goto('/auth/login')}>Log in</Button
			>
		</Stack>
		<Flex class="text-[#4D7F76] text-2xl w-1/2 ml-[25%] mt-[15%]" justify="space-around">
			<a href="/about">About us</a>
			<a href="/projects">Go to projects</a>
		</Flex>
	</div>
	<div class="bg-[#57C1B8] w-2/5 h-screen">
		<img class="h-screen" src={'/images/homepage_pic.png'} alt="" />
	</div>
</div>
