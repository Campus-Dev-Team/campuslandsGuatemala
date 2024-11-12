<template>
	<article class="!h-dvh !w-dvw">
		<section class="flex flex-col mx-auto h-full gap-y-8 w-[90%]">
			<img src="/src/assets/logoCampus.svg" alt="" class="object-cover w-[156px] h-[48px]">
			<div class="flex items-center w-fit cursor-pointer gap-x-2">
				<img src="/src/assets/img/icons/arrow-left.svg" class="size-[14px]" />
				<p class="font-semibold text-sm">Regresar</p>
			</div>
			<div class="flex justify-center items-center h-full gap-x-[100px]">
				<div class="h-fit !shadow-[0_0_32px_0_rgba(0,0,0,0.4)] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#8484841F] backdrop-blur-2xl rounded-[40px] px-10 py-8 w-[456px]">
					<p class="gradient-text font-bold text-2xl" :onclick="ejecutar">Contáctanos</p>
					<p class="text-sm font-normal my-2">Llena el formulario y nuestro equipo se comunicará contigo en breve.</p>
					<p class="font-semibold mt-4 pb-1">Tu nombre</p>
					<input :value="model.name" class="w-full" placeholder="¿Cómo te llamas?" />
					<p class="font-semibold mt-4 pb-1">Correo electrónico</p>
					<input :value="model.email" class="w-full" placeholder="Correo de contacto" />
					<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14">Contactar <img src="/src/assets/img/icons/arrow-right.svg" alt="" class="size-5"> </button>
					<p class="text-white text-center text-[10px]">*Al solicitar tu visita, aceptas el tratamiento de tus datos personales</p>
				</div>
				<camperPhotoFrame img="/src/assets/img/campers/camper-contact.png" />
			</div>
		</section>
	</article>
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