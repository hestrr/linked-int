<script lang="ts">
	import { goto } from '$app/navigation';
	import { Flex, Title, Paper, Text } from '@svelteuidev/core';
</script>

<Flex>
	<div class="w-[60vw] h-[100vh] bg-[#D8F2F0]">
		<div class="w-[20vw] h-[70vh] ml-[18vw] mt-[15vh]">
			<slot />
		</div>
	</div>
	<div class="w-[40vw] h-screen bg-[#B1EBD6]">
		<div class="w-1/2 ml-[35%] mt-[7%]">
			<Paper class="flex justify-center"
				><Title order={1} class="font-plex"><b>LinkedIn't</b></Title></Paper
			>
		</div>
		<div class="ml-[10%] mr-0 mt-[85%] mb-0">
			<Text
				variant="link"
				color={'#646F70'}
				align="center"
				size="xl"
				underline
				on:click={() => goto('/projects')}
			>
				No thanks, take me straight<br />
				to the projects list
			</Text>
		</div>
	</div>
	<img
		src={'/images/login_guy.png'}
		alt=""
		class="absolute w-[500px] ml-[50%] mr-0 mt-[10%] mb-0"
	/>
</Flex>
