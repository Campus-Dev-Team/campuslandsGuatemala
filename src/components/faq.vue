<template>
    <section class="faq overflow-hidden py-20 relative bg-gradient-to-r from-[#2F10A2] from-5% via-[#130640] via-28% to-[#260D84] to-62%">
        <div class="max-w-[550px] mx-auto my-auto flex flex-col gap-y-8">
            <p class="gradient-text text-4xl mb-1 font-bold text-center">Preguntas frecuentes</p>
            <div class="flex max-w-[555px] gap-x-[10px] mx-auto border bg-primary border-white rounded-full p-2 mb-5">
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px]  text-white" :class="`${tabCampers ? 'bg-primary_action' : ''}`" @click="activeTab('tabCampers')">
                    Campers
                </div>
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px] text-white" :class="`${tabPatrocinadores ? 'bg-primary_action' : ''}`" @click="activeTab('tabPatrocinadores')">
                    Patrocinadores
                </div>
                <div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px] text-white" :class="`${tabEmpleadores ? 'bg-primary_action' : ''}`" @click="activeTab('tabEmpleadores')">
                    Empleadores
                </div>
            </div>
            <div v-if="tabCampers" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <div class="max-w-lg mx-auto">
                    <div class="space-y-4 max-w-[480px]">
                        <div v-for="(faq, index) in faqCampers" :key="index" class="rounded-lg  shadow-sm">
                            <input type="checkbox" :id="`section${index + 1}`" class="hidden">
                            <label for="section1" class="flex justify-between cursor-pointer h-10 p-[10px] text-base font-semibold text-white">
                                {{ faq.pregunta }}
                            </label>
                            <div class="accordion-content">
                                <p class="px-4"> {{ faq.respuesta }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tabPatrocinadores" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <div class="max-w-lg mx-auto">
                    <div class="space-y-4 max-w-[480px]">
                        <div v-for="(faq, index) in faqPatrocinadores" :key="index" class="rounded-lg  shadow-sm">
                            <input type="checkbox" :id="`section${index + 1}`" class="hidden">
                            <label for="section1" class="flex justify-between cursor-pointer h-10 p-[10px] text-base font-semibold text-white">
                                {{ faq.pregunta }}
                            </label>
                            <div class="accordion-content">
                                <p class="px-4"> {{ faq.respuesta }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tabEmpleadores" class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                <div class="max-w-lg mx-auto">
                    <div class="space-y-4 max-w-[480px]">
                        <div v-for="(faq, index) in faqEmpleadores" :key="index" class="rounded-lg  shadow-sm">
                            <input type="checkbox" :id="`section${index + 1}`" class="hidden">
                            <label for="section1" class="flex justify-between cursor-pointer h-10 p-[10px] text-base font-semibold text-white">
                                {{ faq.pregunta }}
                            </label>
                            <div class="accordion-content">
                                <p class="px-4"> {{ faq.respuesta }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- building future -->
        <img src="/img/texxture.svg" alt="" class="w-1/2 absolute top-[290px] -right-[340px]">
        <img src="/img/texxture.svg" alt="" class="w-1/2 rotate-180 absolute top-[520px] -left-[340px]">
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue"

const currentIndex = ref(0)

const tabCampers = ref(true)
const tabPatrocinadores = ref(false)
const tabEmpleadores = ref(false)


const faqCampers = ref([
    {
        id: 1,
        pregunta: '¿Que es este programa y como puedo participar?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 2,
        pregunta: '¿Necesito experiencia previa en programación?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 3,
        pregunta: '¿Cuánto tiempo dura el programa y qué temas se cubren?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 1,
        pregunta: '¿Tiene algún costo participar en el programa?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 2,
        pregunta: '¿Cómo puedo saber si fui seleccionado para el programa?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 3,
        pregunta: '¿Qué es este programa y cómo puedo participar?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
])

const faqPatrocinadores = ref([
    {
        id: 1,
        pregunta: '¿Cómo puedo contribuir como patrocinador?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 2,
        pregunta: '¿Qué impacto tiene mi donación?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 3,
        pregunta: '¿Puedo elegir un tipo de apoyo específico para los estudiantes?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 4,
        pregunta: '¿Puedo recibir un reporte de los estudiantes apoyados gracias a mi donación?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 5,
        pregunta: '¿Mi donación es deducible de impuestos?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
])

const faqEmpleadores = ref([
    {
        id: 1,
        pregunta: '¿Qué tipo de talento puedo encontrar en este programa?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 2,
        pregunta: '¿Cómo puedo acceder a campers graduados?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 3,
        pregunta: '¿Puedo patrocinar a un estudiante y contratarlo después de graduarse?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 4,
        pregunta: '¿Cómo funciona el proceso de contratación?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
    {
        id: 5,
        pregunta: '¿Los campers cuentan con habilidades prácticas?',
        respuesta: 'Este programa ofrece formación intensiva en programación para preparar a futuros desarrolladores, para participar, solo tienes que inscribirte y pasar un proceso de selección'
    },
])

function activeTab(tab) {
    if (tab == 'tabCampers') {
        tabCampers.value = true
        tabPatrocinadores.value = false
        tabEmpleadores.value = false
    } else if (tab == 'tabPatrocinadores') {
        tabCampers.value = false
        tabPatrocinadores.value = true
        tabEmpleadores.value = false
    } else if (tab == 'tabEmpleadores') {
        tabCampers.value = false
        tabPatrocinadores.value = false
        tabEmpleadores.value = true
    }
}



</script>

<style scoped>
 /* Smooth transition for accordion content */
.accordion-content {
    transition: max-height 0.3s ease-out;
    max-height: 0;
    overflow: hidden;
}
input:checked + label + .accordion-content {
    max-height: 500px; /* Enough height to reveal the content */
}
</style>
