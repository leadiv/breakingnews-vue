<template>
    <div class="banner">
        <div class="banner__title">{{ strTitle }}</div>
        <div class="banner__body" v-html="htmlContent"></div>
    </div>
</template>

<script>
export default {
    name: 'banner',
    props: {
        strTitle: {
            type: String,
            required: true,
        },
        htmlContent: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
    .banner {
        padding: .625rem;
    }

    .banner__title {
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: .5rem;
    }
</style>
