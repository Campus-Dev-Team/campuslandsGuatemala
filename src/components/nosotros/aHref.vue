<template>
	<a :href="isRef" @click="redirect($event, isRef)">
		<slot />
	</a>
</template>

<script setup>

const props = defineProps({
	isRef: {
		type: String,
		default: '#nosotros'
	}
})

function redirect(event, ref){
	event.preventDefault();
	const content = document.querySelector(ref);
	if(!content) return
	content.scrollIntoView({
		behavior: 'smooth'
	})
}

</script>