<template>
    <div class="background">
        <section class="pt-20">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1
                        class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white"
                    >
                        StarAtlas
                    </h1>
                    <div
                        class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white animate-fade-in-down animate-count-1 animate-duration-2s fw100"
                    >
                        RougeMarket
                    </div>

                    <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        A cooperation between HEIM and S&B
                    </p>
                    <a
                        class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        href="#"
                    >
                        Get started
                        <svg
                            class="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </a>
                    <a
                        class="text-white inline-flex items-center justify-center px-5 py-3 font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                        href="#"
                    >
                        Speak to Sales
                    </a>
                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img :src="image" alt="mockup" />
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import image from '../assets/rouge_market_background_1.webp'
</script>

<style lang="scss" scoped>
.background {
    background-image: url('../assets/rouge_market_background_1.webp');
}
</style>