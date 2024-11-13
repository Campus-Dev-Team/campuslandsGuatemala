<template>
	<main class="h-full w-full">
		<article class="w-full h-full">
			<section class="flex flex-col mx-8 md:mx-32 h-full gap-y-8 pt-4">
				<img src="/src/assets/logoCampus.svg" alt="" class="object-cover w-[156px] h-[48px]">
				<div class="flex items-center w-fit cursor-pointer gap-x-2">
					<img src="/src/assets/img/icons/arrow-left.svg" class="size-[25px] lg:size-[16px]" />
					<p class="font-semibold hidden lg:block text-sm">Regresar</p>
				</div>
				<div class="flex items-center justify-center lg:hidden gap-x-6 mb-2">
					<div :class="['flex items-center rounded-full transition-all duration-75 ease-linear w-fit font-semibold px-6 h-10', viewDonate ? 'text-[#004232] bg-[#02D9A4]': 'cursor-pointer text-[#DFFBF4] hover:bg-[#B0F7E6] hover:text-[#004232]']" @click="showViewDonate">
						<p>Hacer donación</p>
					</div>
					<div :class="['flex items-center rounded-full transition-all duration-75 ease-linear w-fit font-semibold px-6 h-10', !viewDonate ? 'text-[#004232] bg-[#02D9A4]': 'cursor-pointer text-[#DFFBF4] hover:bg-[#B0F7E6] hover:text-[#004232]']" @click="showViewSubscribe">
						<p>Suscribirme</p>
					</div>
				</div>
				<div class="flex justify-center items-start md:items-center h-full gap-x-16">
					<div :class="['border-4 border-[#2CA2FF] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#8484841F] backdrop-blur-2xl rounded-[40px] w-full px-10 py-8 min-w-[328px] lg:max-w-[456px] lg:hover:scale-110 transition-all duration-75 ease-linear',
						{'hidden lg:block': !viewDonate}
					]">
						<template v-if="!isDonate">
							<p class="gradient-text font-bold text-2xl">Haz una donación</p>
							<p class="text-sm font-normal text-white my-2">Cada aporte cuenta. Haz una donación puntual y contribuye al futuro de nuestros campers con un impacto inmediato.</p>
							<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="donateCampus">Donar a Campuslands</button>
							<p class="text-white text-center text-[10px]">*Al donar, aceptas el tratamiento de tus datos personales</p>
						</template>
						<template v-else>
							<p class="gradient-text font-bold text-2xl">¡Gracias por contribuir!</p>
							<p class="text-sm font-normal text-white my-2">Tu donación hace una gran diferencia en la vida de nuestros campers.</p>
							<p class="font-semibold mt-4 pb-1">Tu nombre</p>
							<input :value="model.name" class="w-full" placeholder="¿Cómo te llamas?" />
							<p class="font-semibold mt-4 pb-1">Correo electrónico</p>
							<input :value="model.email" class="w-full" placeholder="Correo electrónico de contacto" />
							<p class="font-semibold mt-4 pb-1">Monto de la donación</p>
							<input :value="model.amount" class="w-full" placeholder="Ingresa el monto de tu donación" />
							<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="donateNow">Donar ahora</button>
						</template>
					</div>
					<div :class="['border-4 border-[#2CA2FF] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#8484841F] backdrop-blur-2xl rounded-[40px] w-full px-10 py-8 min-w-[328px] lg:max-w-[456px] lg:hover:scale-110 transition-all duration-75 ease-linear',
						{'hidden lg:block': viewDonate}
					]">
						<template v-if="!isSubscribe">
							<p class="gradient-text font-bold text-2xl">Suscríbete y cambia vidas</p>
							<p class="text-sm font-normal text-white my-2">Al unirte como suscriptor, aseguras apoyo constante a nuestros campers y te destacas en nuestros eventos y plataformas.</p>
							<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="subscribeCampus">Suscribirte a Campuslands</button>
							<p class="text-white text-center text-[10px]">*Al suscribirte, aceptas el tratamiento de tus datos personales</p>
						</template>
						<template v-else>
							<p class="gradient-text font-bold text-2xl">¡Gracias por suscribirte!</p>
							<p class="text-sm font-normal text-white my-2">Tu donación hace una gran diferencia en la vida de nuestros campers.</p>
							<p class="font-semibold mt-4 pb-1">Tu nombre</p>
							<input :value="model.name" class="w-full" placeholder="¿Cómo te llamas?" />
							<p class="font-semibold mt-4 pb-1">Correo electrónico</p>
							<input :value="model.email" class="w-full" placeholder="Correo electrónico de contacto" />
							<p class="font-semibold mt-4 pb-1">Monto de la donación</p>
							<input :value="model.amount" class="w-full" placeholder="Ingresa el monto de tu donación" />
							<button class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="subscribeNow">Suscribirme ahora</button>
						</template>
					</div>
				</div>
			</section>
		</article>
	</main>
</template>

<script setup>
import { ref } from 'vue'

const isDonate = ref(false)
const isSubscribe = ref(false)
const viewDonate = ref(true)

const model = ref({
	name: '',
	email: '',
	amount: null
})

/* Functions */
function showViewDonate(){
	viewDonate.value = true
}

function showViewSubscribe(){
	viewDonate.value = false
}

function donateCampus(){
	isDonate.value = true
}

function donateNow(){
	isDonate.value = false
}

function subscribeCampus(){
	isSubscribe.value = true
}

function subscribeNow(){
	isSubscribe.value = false
}

</script>

<style scoped>
main {
	background-image: url('/src/assets/img/texxture.svg');
	background-position: 100% 100%;
	background-repeat: no-repeat;
	background-size: 75%;
}

</style>