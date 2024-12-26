<template>
    <section class="principal from-8% relative h-[740px] bg-gradient-to-br from-[#16074A] to-[#3311B0] to-60%">
        <div class="flex items-center justify-center size-8 absolute left-[50%] bottom-0 bg-white z-20 rounded-full bounce-top">
            <img src="/img/icons/arrow-down.svg" alt="">
        </div>
        <div class="relative mx-auto flex h-full w-full lg:max-w-[740px] px-4">
            <div class="my-auto w-4/12">
                <div class="items-center justify-center gap-2 self-end sm:gap-4 sm:self-auto sm:justify-self-end">
                    <div class="flex w-[425px] max-w-[425px] flex-col gap-y-4">
                        <p class="gradient-text font-extrabold leading-[60px] tracking-tighter text-4xl md:text-4xl">
                            Impulsa tu negocio con nuestro talento tech de alto
                            impacto
                        </p>
                        <p class="leading-6 text-white text-base">
                            En Campuslands formamos desarrolladores que se ajustan a
                            tus proyectos. Conecta con talento listo para
                            transformar tu empresa o apoya el crecimiento de
                            nuestros nuevos líderes tech.
                        </p>
                        <button class="btn-primary max-w-[188px] h-14 px-6 flex items-center gap-x-2 z-30">
                            Contactanos
                            <img src="/img/icons/happyFace.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <img src="/img/campers/campers-home.png" alt="" class="bg-students" >
    </section>
</template>

<script setup>

</script>

<style scoped>
.bg-students {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 90%;
    max-width: 90%;
    max-height: 70%;
}

.principal {
    background-image: url('/src/assets/img/texxture.svg');
    background-position: 80% 0%;
    background-repeat: no-repeat;
    background-size: 75%;
}
</style>