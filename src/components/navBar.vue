<template>
    <nav class="bg-transparent p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="text-white text-2xl font-bold">
                <a href="/">
                    <img src="/logoCampus.svg" alt="" height="60" class="max-h-[60px]" />
                </a>
            </div>
            <div class="hidden md:flex space-x-6">
                <a href="/emplea" class="text-white hover:text-gray-200">Emplea</a>
                <a href="/patrocina" class="text-white hover:text-gray-200">Patrocina</a>
                <a href="/joinUs" class="text-white hover:text-gray-200">Se un Camper</a>
                <a href="#" class="text-white hover:text-gray-200">Nosotros</a>
                <a href="#" class="text-white hover:text-gray-200">Comunidad</a>
            </div>
            <div class="md:hidden flex items-center">
                <button class="text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="false" class="md:hidden">
            <div class="space-y-4 px-4 py-2">
                <a href="/emplea" class="block text-white hover:text-gray-200">Emplea</a>
                <a href="/patrocina" class="block text-white hover:text-gray-200">Patrocina</a>
                <a href="/joinUs" class="block text-white hover:text-gray-200">Se un Camper</a>
                <a href="#" class="block text-white hover:text-gray-200">Nosotros</a>
                <a href="#" class="block text-white hover:text-gray-200">Comunidad</a>
            </div>
        </div>
    </nav>
</template>

<script>
</script>

<style scoped>
/* Add any custom styling here if needed */
</style>
