<template>
	<main class="overflow-auto h-full w-full">
		<article class="w-full h-full">
			<section class="flex flex-col mx-8 lg:mx-32 pt-4 h-full gap-y-8">
				<img src="/src/assets/logoCampus.svg" alt="" class="object-cover w-[156px] h-[48px]">
				<div class="flex items-center w-fit cursor-pointer gap-x-2">
					<img src="/src/assets/img/icons/arrow-left.svg" class="size-[25px] lg:size-[16px]" />
					<p class="font-semibold hidden lg:block text-sm">Regresar</p>
				</div>
				<div class="flex justify-center items-center h-full gap-x-[100px]">
					<div class="h-fit !shadow-[0_0_32px_0_rgba(0,0,0,0.4)] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#8484841F] backdrop-blur-2xl rounded-[40px] px-10 py-8 min-w-[328px] lg:max-w-[456px]">
						<p class="gradient-text font-bold text-2xl">Agenda tu visita</p>
						<p class="text-sm font-normal my-2">Completa el formulario y pronto nos pondremos en contacto para coordinar los detalles de tu visita.</p>
						<p class="font-semibold mt-4 pb-1">Tu nombre</p>
						<input :value="model.name" class="w-full" placeholder="¿Cómo te llamas?" />
						<p class="font-semibold mt-4 pb-1">Correo electrónico</p>
						<input :value="model.email" class="w-full" placeholder="Correo de contacto" />
						<p class="font-semibold mt-4 pb-1">WhatsApp</p>
						<input :value="model.wpp" class="w-full" placeholder="Tu número de WhatsApp" />
						<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14">Solicitar visita <img src="/src/assets/img/icons/arrow-right.svg" alt="" class="size-5"> </button>
						<p class="text-white text-center text-[10px]">*Al solicitar tu visita, aceptas el tratamiento de tus datos personales</p>
					</div>
					<camperPhotoFrame class="block max-[1200px]:hidden" />
				</div>
			</section>
		</article>
	</main>
</template>

<script setup>
import { ref } from 'vue'
import camperPhotoFrame from '../components/camperPhotoFrame.vue'

const model = ref({
	name: '',
	email: '',
	wpp: null
})

const valueInput = ref('')

</script>

<style scoped>
main {
	background-image: url('/src/assets/img/texxture.svg');
	background-position: 100% 100%;
	background-repeat: no-repeat;
	background-size: 75%;
}

</style>