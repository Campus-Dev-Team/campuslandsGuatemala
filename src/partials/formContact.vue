<template>
	<main class="overflow-auto h-full w-full">
		<article class="w-full h-full">
			<section class="flex flex-col mx-8 lg:mx-32 pt-4 h-full gap-y-8">
				<img src="/img/logos/logoCampus_v1.svg" alt="" class="object-cover w-[156px] h-[48px]">
				<div class="flex justify-center items-center h-full gap-x-[100px]">
					<div class="!shadow-[0_0_32px_0_rgba(0,0,0,0.4)] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#8484841F] backdrop-blur-2xl rounded-[40px] px-10 py-8 w-full min-w-[328px] lg:max-w-[456px]">
						<p class="gradient-text font-bold text-2xl">Contáctanos</p>
						<p class="text-sm font-normal my-2">Llena el formulario y nuestro equipo se comunicará contigo en breve.</p>
						<p class="font-semibold mt-5 pb-1">Tu nombre</p>
						<input :value="model.name" class="w-full" placeholder="¿Cómo te llamas?" />
						<p class="font-semibold mt-5 pb-1">Correo electrónico</p>
						<input :value="model.email" class="w-full" placeholder="Correo de contacto" />
						<p class="font-semibold mt-5 pb-1">Contacto telefónico</p>
						<input :value="model.email" class="w-full" placeholder="Número de teléfono" />
						<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14">Contactar <img src="/img/icons/arrow-left.svg" alt="" class="hidden lg:block size-5"></button>
						<p class="text-white text-center text-[10px]">*Al solicitar tu visita, aceptas el tratamiento de tus datos personales</p>
					</div>
					<camperPhotoFrame class="block max-[1200px]:hidden" img="img/campers/camper-contact.png" />
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