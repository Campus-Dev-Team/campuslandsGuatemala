<template>
	<nav class="navbar bg-transparent sticky top-0 z-[35] p-4">
		<div class="max-w-7xl mx-auto flex justify-between items-center h-16">
			<div class="text-white text-2xl font-bold">
				<a href="/">
					<slot name="logo" />
				</a>
			</div>
			<slot />
			<div class="md:hidden flex items-center">
				<button
					@click="toggleMobileMenu"
					class="text-white focus:outline-none"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			</div>
		</div>
		<slot v-if="showMenuMobile" name="menuMobile" />
	</nav>
</template>

<script setup>
import { ref } from 'vue';

const showMenuMobile = ref(false);

const toggleMobileMenu = () => {
	showMenuMobile.value = !showMenuMobile.value
}
</script>
