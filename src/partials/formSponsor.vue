<template>
	<main class="overflow-auto h-full w-full">
		<article class="w-full h-full">
			<section class="flex flex-col mx-8 md:mx-32 h-full gap-y-8 pt-4">
				<a href="/" aria-label="Volver al inicio de Campuslands Guatemala">
					<img src="/favicon.svg" alt="Campuslands Guatemala" class="object-contain w-[156px] h-[48px]">
				</a>
				<h1 class="sr-only">Apoya la formación de Campers en Guatemala</h1>
				<div class="flex items-center justify-center lg:hidden gap-x-6 mb-2" role="tablist" aria-label="Tipo de aporte">
					<button type="button" role="tab" :aria-selected="viewDonate" :class="['flex items-center rounded-full transition-all duration-75 ease-linear w-fit font-semibold px-6 h-10', viewDonate ? 'text-[#07102B] bg-[#00AA80]': 'cursor-pointer text-[#57BBFF] hover:bg-[#2CAAFF] hover:text-[#07102B]']" @click="showViewDonate">
						Hacer donación
					</button>
					<button type="button" role="tab" :aria-selected="!viewDonate" :class="['flex items-center rounded-full transition-all duration-75 ease-linear w-fit font-semibold px-6 h-10', !viewDonate ? 'text-[#07102B] bg-[#00AA80]': 'cursor-pointer text-[#57BBFF] hover:bg-[#2CAAFF] hover:text-[#07102B]']" @click="showViewSubscribe">
						Suscribirme
					</button>
				</div>
				<div class="flex justify-center items-start md:items-center h-full gap-x-16">
					<div :class="['border-4 border-[#2CAAFF] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#1111111F] backdrop-blur-2xl rounded-[40px] w-full px-10 py-8 min-w-[328px] lg:max-w-[456px] lg:hover:scale-110 transition-all duration-75 ease-linear',
						{'hidden lg:block': !viewDonate}
					]">
						<template v-if="!isDonate">
							<p class="gradient-text font-bold text-2xl">Haz una donación</p>
							<p class="text-sm font-normal text-white my-2">Cada aporte cuenta. Haz una donación puntual y contribuye al futuro de nuestros campers con un impacto inmediato.</p>
							<button type="button" class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="donateCampus">Donar a Campuslands</button>
							<p class="text-white text-center text-[10px]">*Al donar, aceptas el tratamiento de tus datos personales</p>
						</template>
						<template v-else>
							<p class="gradient-text font-bold text-2xl">¡Gracias por contribuir!</p>
							<p class="text-sm font-normal text-white my-2">Tu donación hace una gran diferencia en la vida de nuestros campers.</p>
							<label for="donation-name" class="block font-semibold mt-4 pb-1">Tu nombre</label>
							<input id="donation-name" v-model="model.name" name="name" type="text" autocomplete="name" class="w-full" placeholder="¿Cómo te llamas?" required />
							<label for="donation-email" class="block font-semibold mt-4 pb-1">Correo electrónico</label>
							<input id="donation-email" v-model="model.email" name="email" type="email" autocomplete="email" class="w-full" placeholder="Correo electrónico de contacto" required />
							<label for="donation-amount" class="block font-semibold mt-4 pb-1">Monto de la donación</label>
							<input id="donation-amount" v-model="model.amount" name="amount" type="number" inputmode="decimal" min="1" class="w-full" placeholder="Ingresa el monto de tu donación" required />
							<button type="button" class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="donateNow">Donar ahora</button>
						</template>
					</div>
					<div :class="['border-4 border-[#2CAAFF] bg-gradient-to-bl !from-[#FFFFFF1F] !to-[#1111111F] backdrop-blur-2xl rounded-[40px] w-full px-10 py-8 min-w-[328px] lg:max-w-[456px] lg:hover:scale-110 transition-all duration-75 ease-linear',
						{'hidden lg:block': viewDonate}
					]">
						<template v-if="!isSubscribe">
							<p class="gradient-text font-bold text-2xl">Suscríbete y cambia vidas</p>
							<p class="text-sm font-normal text-white my-2">Al unirte como suscriptor, aseguras apoyo constante a nuestros campers y te destacas en nuestros eventos y plataformas.</p>
							<button type="button" class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="subscribeCampus">Suscribirte a Campuslands</button>
							<p class="text-white text-center text-[10px]">*Al suscribirte, aceptas el tratamiento de tus datos personales</p>
						</template>
						<template v-else>
							<p class="gradient-text font-bold text-2xl">¡Gracias por suscribirte!</p>
							<p class="text-sm font-normal text-white my-2">Tu donación hace una gran diferencia en la vida de nuestros campers.</p>
							<label for="subscription-name" class="block font-semibold mt-4 pb-1">Tu nombre</label>
							<input id="subscription-name" v-model="model.name" name="subscription-name" type="text" autocomplete="name" class="w-full" placeholder="¿Cómo te llamas?" required />
							<label for="subscription-email" class="block font-semibold mt-4 pb-1">Correo electrónico</label>
							<input id="subscription-email" v-model="model.email" name="subscription-email" type="email" autocomplete="email" class="w-full" placeholder="Correo electrónico de contacto" required />
							<label for="subscription-amount" class="block font-semibold mt-4 pb-1">Monto mensual</label>
							<input id="subscription-amount" v-model="model.amount" name="subscription-amount" type="number" inputmode="decimal" min="1" class="w-full" placeholder="Ingresa el monto mensual" required />
							<button type="button" class="flex items-center justify-center w-full primary mt-5 mb-2 gap-x-4 h-14" @click="subscribeNow">Suscribirme ahora</button>
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
	background-image: url('/img/texxture.svg');
	background-position: 100% 100%;
	background-repeat: no-repeat;
	background-size: 75%;
}

</style>
