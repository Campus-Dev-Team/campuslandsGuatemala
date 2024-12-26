<template>
    <section class="benefits overflow-hidden py-20 relative bg-gradient-to-r from-[#00001A] from-0% via-[#000066] via-26% to-[#000080] to-75%">
        <div class="flex max-w-[1085px] mx-auto gap-x-20">
            <div class="relative my-auto">
                <img src="/img/emplea/students.png" alt="estudiantes trabajando en equipo">
            </div>
            <div class="max-w-[550px] my-auto flex flex-col gap-y-8">
                <p class="gradient-text text-[32px] mb-1 font-bold">Beneficios de emplear nuestros Campers</p>
                <div class="flex flex-wrap gap-y-6">
                    <div v-for="(benefit, index) in benefits" :key="index" class="flex items-center gap-x-2 min-w-[220px]">
                        <img src="/img/icons/circle-check.svg" alt="">
                        <p class="text-xs">{{ benefit.title }}</p>
                    </div>
                </div>
            </div>
        </div>
        <img src="/img/texxture.svg" alt="" class="w-1/2 absolute top-[290px] -right-[340px]">
        <img src="/img/texxture.svg" alt="" class="w-1/2 rotate-180 absolute top-[520px] -left-[340px]">
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';












const benefits = ref([
    { id: 1, title: 'Innovación continua', },
    { id: 2, title: 'Reducción de brechas sociales e inclusión', },
    { id: 3, title: 'Optimización de procesos', },
    { id: 4, title: 'Imagen corporativa positiva', },
    { id: 5, title: 'Capacidad de adaptación', },
    { id: 6, title: 'Contribución al crecimiento económico', },
    { id: 7, title: 'Solución de problemas', },
    { id: 8, title: 'Aplica a los beneficios a la ley de primer empleo', },
    { id: 9, title: 'Colaboración y comunicación', },
    { id: 10, title: 'Contribución a los ODS', },
    { id: 11, title: 'Talento apasionado y motivado', },
])

</script>

<style scoped>
.f-10{ font-size: 10px; }
</style>