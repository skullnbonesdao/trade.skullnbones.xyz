<template>
    <div class="background">
        <section class="pt-20">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="place-self-center lg:col-span-7 rounded-lg">
                    <h1
                        class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-gray-100 dark:text-gray-300"
                    >
                        StarAtlas
                    </h1>
                    <div
                        class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-100 dark:text-gray-300 animate-fade-in-down animate-count-1 animate-duration-2s fw100"
                    >
                        RogueMarket
                    </div>

                    <p
                        class="max-w-2xl mb-6 font-light text-gray-100 lg:mb-8 md:text-lg lg:text-xl text-gray-100 dark:text-gray-300"
                    >
                        A cooperation between HEIM and S&B
                    </p>
                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex animate-pulse animate-duration-5s shadow-2xl">
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
    background-repeat: no-repeat, repeat;
    background-size: cover;
}
</style>
