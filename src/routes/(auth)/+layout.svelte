<script lang="ts">
	import { Box, Flex, Title, Paper, Center, Text } from '@svelteuidev/core';
</script>

<Flex>
	<Box css={{ width: '60vw', height: '100vh', backgroundColor: '#D8F2F0' }}>
		<Box css={{ width: '20vw', height: '70vh', marginTop: '15vh', marginLeft: '18vw' }}>
			<slot />
		</Box>
	</Box>
	<Box css={{ width: '40vw', height: '100vh', backgroundColor: '#B1EBD6' }}>
		<Box css={{ width: '50%', margin: '7% 0 0 35%' }}
			><Paper><Center><Title order={1}><b>LinkedIn't</b></Title></Center></Paper></Box
		>
		<div id="to-projects-link">
			<Text variant="link" color={'#646F70'} align="center" size="xl" underline>
				No thanks, take me straight<br />
				to the projects list
			</Text>
		</div>
	</Box>
	<img src={'/images/login_guy.png'} alt="" id="login-guy" />
</Flex>

<style>
	#login-guy {
		position: absolute;
		margin: 10% 0 0 50%;
		width: 500px;
	}
	#to-projects-link {
		text-justify: center;
		margin: 85% 0 0 10%;
	}
</style>
