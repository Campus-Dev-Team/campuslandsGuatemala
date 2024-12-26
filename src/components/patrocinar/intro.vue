<template>
    <!-- <section class="principal from-8% relative h-[740px]" style="background: linear-gradient(350.82deg, #000033 -9.65%, #000080 45.47%, #000066 94.52%);"> -->
    <section class="principal from-8% relative h-[740px] bg-gradient-to-br from-[#000033] from-0% via-[#000080] via-53% to-[#000066] to-100%" >
        <div class="relative mx-auto flex h-full w-full lg:max-w-[1140px] px-4">
            <div class="my-auto w-6/12">
                <div class="items-center justify-center gap-2 self-end sm:gap-4 sm:self-auto sm:justify-self-end">
                    <div class="flex w-[425px] max-w-[425px] flex-col gap-y-4">
                        <p class="gradient-text font-extrabold leading-[60px] tracking-tighter text-4xl md:text-4xl"> Impulsa tu negocio con nuestro talento tech de alto impacto </p>
                        <p class="leading-6 text-white text-base">
                            En Campuslands formamos desarrolladores que se ajustan a tus proyectos. Conecta con talento listo para transformar tu empresa o apoya el crecimiento de nuestros nuevos líderes tech.
                        </p>
                        <button class="btn-primary max-w-[300px] h-14 px-6 flex items-center justify-center gap-x-2 z-30">
                            Emplea nuestros Campers
                            <img src="/img/icons/happyFace.svg" alt="">
                        </button>
                        <img src="/img/companies/Logos.png" alt="empresas que confian en nuestro talento">
                    </div>
                </div>
            </div>
			<img src="/img/sponsor/patrocinar-home.png" alt="" class="bg-studentsss my-auto" width="765" height="530" style="width: 765px; height: 530px;">
        </div>
        <div class="bg-gradient-to-r from-[#00001A] from-0% via-[#000066] via-26% to-[#000080] to-75%">
             <div class="max-w-[1130px] mx-auto py-40">
                 <img src="/img/sponsor/banner.png" alt="">
             </div>
         </div>
        <!-- tecnologias -->
        <div class="bg-gradient-to-r from-[#00001A] from-0% via-[#000066] via-26% to-[#000080] to-75%">
             <div class="indicators max-w-[580px] mx-auto py-20">
                 <div class="flex flex-col gap-y-8 text-center mb-12">
                     <p class="gradient-text text-4xl font-bold max-w-[472px] mx-auto"> Tecnologías que dominan nuestros Campers</p>
                     <p class="text-white mx-auto"> Los Campers están preparados para enfrentar los desafíos tecnológicos actuales. Nuestra formación intensiva les permite dominar las siguientes tecnologías clave:</p>
                 </div>
                 <div class="flex flex-wrap gap-y-4 justify-between max-w-[590px] mx-auto">
                     <img src="/img/group1.png" alt="">
                     <img src="/img/group2.png" alt="">
                     <img src="/img/group3.png" alt="">
                 </div>
             </div>
         </div>
        <ContactUs client:load />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Timeline from './timeline.vue';
import Benefits from './benefits.vue';
import ContactUs from '../contactUs.vue';

</script>

<style scoped>
.bg-students {
    position: absolute;
    bottom: 91px;
    right: 50px;
    width: 760px;
    max-width: 65%;
    max-height: 530px;
}

/* .principal {
    background-image: url('/src/assets/img/texxture.svg');
    background-position: 160% 0%;
    background-repeat: no-repeat;
    background-size: 85%;
} */
</style>