<template>
    <section class="location overflow-hidden py-20 relative">
        <div class="flex flex-col max-w-[1130px] lg:mx-auto gap-x-20 lg:flex-row mx-6">
            <div class="max-w-[550px] my-auto flex flex-col gap-y-8">
                <p class="gradient-text text-4xl mb-1 font-bold text-center lg:text-left">Conviértete en el puente hacia el futuro de un joven desarrollador</p>
                <p class="text-white font-normal text-center lg:text-left">En Campuslands, nos enorgullece transformar el talento emergente en protagonistas del mundo TI. Estos son los pasos para emplear a un joven desarrollador con nosotros:</p>
                <div class="flex flex-col lg:flex-row gap-x-6">
                    <slot></slot>
                </div>
            </div>
            <div class="relative h-[380px] max-md:mt-5">
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    v-show="currentDiv === index + 1"
                    class="transition-opacity p-6 flex-col gap-4 rounded-[40px] w-[342px] lg:w-[435px] h-fit duration-4000 ease-in-out opacity-100 inset-0 flex text-white"
                    style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 55.8%, rgba(153, 153, 153, 0.08) 111.74%);"
                >
                    <p class="text-[40px]">0{{ index + 1 }}</p>
                    <div class="flex flex-col gap-2">
                        <p class="text-2xl font-bold">{{ step.title }}</p>
                        <p class="text-base mt-2">{{ step.description }}</p>
                        <p v-if="step.subdescription" class="text-base mt-2">{{ step.subdescription }}</p>
                    </div>
                </div>
            </div>
        </div>
        <img src="src/assets/img/texxture.svg" alt="" class="w-1/2 absolute top-[290px] -right-[340px]">
        <img src="src/assets/img/texxture.svg" alt="" class="w-1/2 rotate-180 absolute top-[520px] -left-[340px]">
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
    setInterval(switchDiv, 4000);
})

const currentDiv = ref(1);
const steps = ref([
    {
        id: 1,
        title: 'Descubre el talento que se adapta a tus necesidades',
        description: 'Revisa perfiles de candidatos preseleccionados con habilidades técnicas, dominio del inglés y experiencia práctica. Accede a perfiles seleccionados según las necesidades específicas de tu proyecto.',
    },
    {
        id: 2,
        title: 'Entrevista y prueba sus habilidades',
        description: 'Realizamos evaluaciones técnicas y entrevistas para verificar las habilidades de los candidatos, asegurando su alineación con tus necesidades. Además, te brindamos informes con retroalimentación sobre sus competencias y áreas de mejora.',
    },
    {
        id: 3,
        title: 'Flexibilidad en la vinculación',
        description: 'Gestión administrativa (opcional): Nos encargamos de la contratación y administración para que te enfoques en los resultados.',
        subdescription: 'Vinculación directa: Puedes contratar directamente al desarrollador, y nosotros facilitamos todo el proceso como puente de apoyo.',
    },
    {
        id: 4,
        title: 'Seguimiento constante del talento',
        description: 'Monitoreo post-incorporación: Evaluamos el desempeño del desarrollador periódicamente para asegurar que tus objetivos se cumplan.',
        subdescription: 'Formación continua: El talento sigue mejorando sus habilidades técnicas con certificaciones durante su etapa productiva.',
    },
    {
        id: 5,
        title: 'Garantía de éxito',
        description: 'Ofrecemos reposición gratuita con nuevas opciones de candidatos si el seleccionado no cumple tus expectativas. Además, nuestros desarrolladores destacan por su innovación y capacidad de adaptarse a la cultura de tu empresa.',
    },
])

const switchDiv = () => {
    currentDiv.value = (currentDiv.value % steps.value.length) + 1; // Cycle through divs
};
</script>

<style scoped>
</style>