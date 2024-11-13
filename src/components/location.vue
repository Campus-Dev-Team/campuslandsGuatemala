<template>
    <section class="location overflow-hidden py-20 relative bg-gradient-to-r from-[#2F10A2] from-5% via-[#130640] via-28% to-[#260D84] to-62%">
        <div class="flex max-w-[1130px] mx-auto gap-x-20">
            <img src="/src/assets/img/mapa.png" alt="" class="w-[420px] h-[420px]">
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






</script>

<style scoped>
</style>