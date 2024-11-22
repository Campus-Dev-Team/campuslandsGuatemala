<template>
    <section class="location overflow-hidden py-20 relative bg-gradient-to-r from-[#00001A] from-0% via-[#000066] via-26% to-[#000080] to-75%">
        <!-- como emplear -->
        <div class="flex max-w-[1130px] mx-auto gap-x-20">
            <div class="max-w-[550px] my-auto flex flex-col gap-y-8">
                <p class="gradient-text text-4xl mb-1 font-bold">Visita nuestras instalaciones, vive la experiencia Campuslands</p>
                <p class="text-white font-semibold">Visítanos en nuestras sedes y descubre cómo Campuslands está transformando el talento tech. Agenda una cita y descubre cómo puedes ser parte de esta revolución, ya sea como estudiante, empleador o patrocinador.</p>
                <div class="flex gap-x-6">
                    <button class="btn-primary max-w-[216px] h-14 px-6 font-semibold flex items-center gap-x-2">
                        Agenda tu visita
                        <img src="/src/assets/img/icons/agenda.svg" alt="">
                    </button>
                    <button class="btn-outline  max-w-[252px] h-14 px-6 font-semibold flex items-center gap-x-2">
                        <p class="text-primary">Chatea con nosotros</p>
                        <img src="/src/assets/img/icons/whatsapp.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="relative">
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    v-show="currentDiv === index + 1"
                    class="transition-opacity p-6 flex-col gap-4 rounded-[40px] w-[385px] h-[265px] duration-4000 ease-in-out opacity-100 absolute inset-0 flex text-white"
                    style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 55.8%, rgba(153, 153, 153, 0.08) 111.74%);"
                >
                    <p class="text-[40px]">0{{ index + 1 }}</p>
                    <div class="flex flex-col gap-2">
                        <p class="text-2xl font-bold">{{ step.title }}</p>
                        <p class="text-base mt-2">{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <img src="/src/assets/img/texxture.svg" alt="" class="w-1/2 absolute top-[290px] -right-[340px]">
        <img src="/src/assets/img/texxture.svg" alt="" class="w-1/2 rotate-180 absolute top-[520px] -left-[340px]">
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
    setInterval(switchDiv, 6000);
})

const currentDiv = ref(1);
const steps = ref([
    {
        id: 1,
        title: 'Contáctanos',
        description: 'Inicia el proceso comunicándote con nuestro equipo para conocer más sobre nuestros egresados y las oportunidades que podemos ofrecerte.',
    },
    {
        id: 2,
        title: 'Define el Perfil',
        description: 'Comparte con nosotros las necesidades específicas de tu empresa y el tipo de talento que estás buscando.',
    },
    {
        id: 3,
        title: 'Acceso a Perfiles',
        description: 'Te proporcionaremos acceso a una selección de perfiles cuidadosamente preseleccionados, ajustados a los requisitos de tu empresa',
    },
    {
        id: 4,
        title: 'Entrevista a los Candidatos',
        description: 'Coordina las entrevistas con los candidatos más prometedores para evaluar sus habilidades técnicas y socioemocionales.',
    },
    {
        id: 5,
        title: 'Contratación',
        description: 'Elige al mejor talento y procede con la contratación para integrarlo a tu equipo.',
    },
    {
        id: 6,
        title: 'Soporte Post-Contratación',
        description: 'Nuestro equipo estará disponible para cualquier asistencia o seguimiento necesario durante el proceso de incorporación del nuevo empleado.',
    },
])

const switchDiv = () => {
    currentDiv.value = (currentDiv.value % steps.value.length) + 1; // Cycle through divs
};
</script>

<style scoped>
</style>