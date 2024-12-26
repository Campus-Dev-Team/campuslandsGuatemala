<template>
    <section class="testimonials overflow-hidden py-10 relative">
        <!-- companies -->
        <p class="text-white text-center mb-10">Estas compañías confían en nuestro talento para impulsar su éxito</p>
        <div class="flex flex-wrap gap-6 mx-auto max-w-[1150px]">
            <img v-for="(company, index) in companies" :key="index" :src="company.img" :alt="company.alt"
                class="hover:scale-110 transform transition duration-300 ease-in-out" />
        </div>
        <!-- testimonials -->
        <div class="carousel-containerr max-w-[910px] mx-auto my-20">
            <!-- <div v-for="item in campers" :key="item.id" class="flex"> -->
            <div class="flex gap-x-12">
                <div>
                    <img src="/src/assets/img/campers/camper1.png" alt="" class="w-[340px]">
                </div>
                <div class="testimonial-info relative my-auto ms-20 max-w-[400px]">
                    <img src="'/src/assets/img/quote.svg" alt="" class="absolute top-[-31px] left-[-90px] w-[115px]">
                    <div class="flex flex-col">
                        <p class="gradient-text text-4xl mb-1">Yuli Stefany Sánchez</p>
                        <p class="text-white f-bold mb-4">Desarrolladora Frontend en GBP</p>
                        <p class="text-white">"Campuslands no solo me enseñó a programar, me preparó para enfrentar
                            retos reales en la industria tech. Hoy trabajo en una empresa que siempre soñé, gracias a
                            las habilidades que adquirí aquí."</p>
                    </div>
                    <div class="flex justify-between w-[120px] mt-8">
                        <div class="flex items-center justify-center size-10 min-w-10 rounded-full bg-[#CBBFF8]">
                            <img src="/src/assets/img/icons/arrow-left.svg" alt="">
                        </div>
                        <div class="flex items-center justify-center size-10 min-w-10 rounded-full bg-[#CBBFF8]">
                            <img src="/src/assets/img/icons/arrow-right.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- building -->
        <div class="indicators max-w-[934px] mx-auto my-40">
            <div class="flex flex-col gap-y-8 text-center mb-16">
                <p class="gradient-text text-4xl font-bold max-w-[472px] mx-auto"> Construyendo el futuro del talento
                    tech en Colombia </p>
                <p class="text-white max-w-[730px] mx-auto"> Conecta con el talento que tu empresa necesita. En
                    Campuslands formamos desarrolladores preparados para los retos de la industria tech. </p>
            </div>
            <div class="flex flex-col gap-12">
                <div class="flex flex-wrap justify-between">
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/contratados.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">500+</p>
                        </div>
                        <p class="text-center text-white font-semibold">Nuestros Campers contratados en empresas</p>
                    </div>
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/inscritos.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">2000+</p>
                        </div>
                        <p class="text-center text-white font-semibold">Campers inscritos en Colombia</p>
                    </div>
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/patrocinadores.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">50+</p>
                        </div>
                        <p class="text-center text-white font-semibold">Patrocinadores apoyando el crecimiento de
                            nuestros Campers</p>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between">
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/empresas.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">100+</p>
                        </div>
                        <p class="text-center text-white font-semibold">Empresas han confiado en el talento formado en
                            Campuslands</p>
                    </div>
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/graduados.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">80%</p>
                        </div>
                        <p class="text-center text-white font-semibold">De los Campers se especializa en las tecnologías
                            más demandadas del mercado</p>
                    </div>
                    <div class="flex flex-col w-[258px]">
                        <div class="flex items-center justify-center gap-x-2">
                            <img src="/src/assets/img/icons/indicators/contratadosMeses.svg" alt="" class="size-10">
                            <p class="text-white font-bold text-[40px] countup">90%</p>
                        </div>
                        <p class="text-center text-white font-semibold">De los Campers son contratados en los primeros 3
                            meses.</p>
                    </div>
                </div>
            </div>
            <p class="text-2xl text-white text-center font-semibold max-w-[722px] mx-auto my-20">El éxito de tu empresa
                comienza con el mejor talento. Únete a la red de empleadores que confían en el futuro tech.</p>
            <button class="btn-primary max-w-[297px] mx-auto h-14 px-6 flex items-center gap-x-2">
                Emplea nuestros Campers
                <img src="/src/assets/img/icons/arm.svg" alt="">
            </button>
        </div>
        <!-- habilidades -->
        <div class="indicators max-w-[934px] mx-auto my-10">
            <div class="flex flex-col gap-y-8 text-center mb-16">
                <p class="gradient-text text-4xl font-bold max-w-[472px] mx-auto"> Construyendo el futuro del talento tech en Colombia</p>
                <p class="text-white max-w-[730px] mx-auto"> Conecta con el talento que tu empresa necesita. En Campuslands formamos desarrolladores preparados para los retos de la industria tech. </p>
            </div>
            <div class="flex max-w-[555px] gap-x-[10px] mx-auto border bg-primary border-white rounded-full p-2 mb-10">
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px]  text-white" :class="`${tabHabilidadesTecnicas ? 'bg-primary_action' : ''}`" @click="activeTab('tabHabilidadesTecnicas')">
                    Habilidades técnicas
                </div>
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px] text-white" :class="`${tabHerramientas ? 'bg-primary_action' : ''}`" @click="activeTab('tabHerramientas')">
                    Herramientas
                </div>
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px] text-white" :class="`${tabHabilidadesBlandas ? 'bg-primary_action' : ''}`" @click="activeTab('tabHabilidadesBlandas')">
                    Habilidades blandas
                </div>
            </div>
            <div v-if="tabHabilidadesTecnicas" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <img src="/src/assets/img/group1.png" alt="">
                <img src="/src/assets/img/group2.png" alt="">
                <img src="/src/assets/img/group3.png" alt="">
            </div>
            <div v-if="tabHerramientas" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <img src="/src/assets/img/herramientas1.png" alt="" class="mx-auto">
                <img src="/src/assets/img/herramientas2.png" alt="" class="mx-auto">
            </div>
            <div v-if="tabHabilidadesBlandas" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <img src="/src/assets/img/habilidadesBlandas1.png" alt="" class="mx-auto">
                <img src="/src/assets/img/habilidadesBlandas2.png" alt="" class="mx-auto">
                <img src="/src/assets/img/habilidadesBlandas3.png" alt="" class="mx-auto">
            </div>
        </div>
        <!-- building future -->
        <img src="/src/assets/img/texxture.svg" alt="" class="w-1/2 absolute top-[290px] -right-[340px]">
        <img src="/src/assets/img/texxture.svg" alt="" class="w-1/2 rotate-180 absolute top-[520px] -left-[340px]">
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue"

const currentIndex = ref(0)

const tabHabilidadesTecnicas = ref(true)
const tabHerramientas = ref(false)
const tabHabilidadesBlandas = ref(false)

const companies = [
    {
        id: 1,
        img: '/src/assets/img/companies/Solvo.svg',
        alt: 'Solvo - Bringing you a world of talent',
    },
    {
        id: 2,
        img: '/src/assets/img/companies/QNT.svg',
        alt: 'QNT - Creemos, ayudamos e impulsamos sueños',
    },
    {
        id: 3,
        img: '/src/assets/img/companies/Pensemos1.svg',
        alt: 'Pensemos - Logo',
    },
    {
        id: 4,
        img: '/src/assets/img/companies/AmarisConsulting.svg',
        alt: 'Amaris Consulting - Logo',
    },
    {
        id: 5,
        img: '/src/assets/img/companies/GalapagoAgroConsultores.svg',
        alt: 'GalapagoAgroConsultores - Logo',
    },
    {
        id: 6,
        img: '/src/assets/img/companies/Applus.svg',
        alt: 'Applus - Logo',
    },
    {
        id: 7,
        img: '/src/assets/img/companies/Grafosoft.svg',
        alt: 'Grafosoft - Logo',
    },
]

const campers = ref([
    { image: '/src/assets/img/campers/camper1.png', alt: 'Image 1', caption: 'First Image' },
    { image: '/src/assets/img/campers/camper2.png', alt: 'Image 1', caption: 'First Image' },
    { image: '/src/assets/img/campers/camper3.png', alt: 'Image 2', caption: 'Second Image' },
    { image: '/src/assets/img/campers/camper4.png', alt: 'Image 2', caption: 'Second Image' },
    { image: '/src/assets/img/campers/camper5.png', alt: 'Image 3', caption: 'Third Image' },
    { image: '/src/assets/img/campers/camper6.png', alt: 'Image 3', caption: 'Third Image' },
    { image: '/src/assets/img/campers/camper7.png', alt: 'Image 3', caption: 'Third Image' },
    { image: '/src/assets/img/campers/camper8.png', alt: 'Image 3', caption: 'Third Image' },
])

onMounted(() => {
    setInterval(nextSlide(), 3000);
})

function nextSlide(params) {
    currentIndex.value = (currentIndex.value + 1) % campers.value.length;
}
function name(params) {
    currentIndex.value = (currentIndex.value - 1 + campers.value.length) % campers.value.length;
}

function activeTab(tab) {
    if (tab == 'tabHabilidadesTecnicas') {
        tabHabilidadesTecnicas.value = true
        tabHerramientas.value = false
        tabHabilidadesBlandas.value = false
    } else if (tab == 'tabHerramientas') {
        tabHabilidadesTecnicas.value = false
        tabHerramientas.value = true
        tabHabilidadesBlandas.value = false
    } else if (tab == 'tabHabilidadesBlandas') {
        tabHabilidadesTecnicas.value = false
        tabHerramientas.value = false
        tabHabilidadesBlandas.value = true
    }
}




</script>

<style scoped>
/* // .testimonials {
//     background-image: url('/img/texxture.svg');
//     background-position: -80% 0%;
//     background-repeat: no-repeat;
//     background-size: 100%;
// } */

.countup {
    font-size: 40px;
    font-weight: bold;
    color: white;
    display: inline-block;
    position: relative;
    animation: count 10s forwards;
    /* 2s animation duration */
}

@keyframes count {
    0% {
        content: "0";
        /* Initial state */
    }

    50% {
        content: "50";
        /* Halfway state */
    }

    100% {
        content: "100";
        /* Final state */
    }
}
</style>