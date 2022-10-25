<template>
    <div class="flex flex-col static place-items-center">
        <div class="avatar">
            <div class="w-12 rounded">
                <img class="rounded-md" :src="img_url" alt="asset_image" />
            </div>
        </div>
        <div class="absolute pt-8">
            <div class="bg-black p-1 rounded-md">{{ symbol }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    symbol: { type: String, default: 'SOME' },
    img_url: {
        type: String,
        default:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.NoU3q4AEZO6bFNhD4RerAQHaE9%26pid%3DApi&f=1',
    },
})
</script>

<style scoped></style>
