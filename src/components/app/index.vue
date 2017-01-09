<template>
    <fetch-data v-bind:uri="api" v-bind:interval="interval">
        <template slot="successful" scope="props">
            <breaking-news v-bind:htmlContent="props.data.content" v-bind:id="props.data.id">
                <banner v-bind:strTitle="props.data.title" v-bind:htmlContent="props.data.content" />
            </breaking-news>
        </template>
    </fetch-data>
</template>

<script>
import Banner from '../banner';
import BreakingNews from '../breaking-news';
import FetchData from '../fetch-data';

export default {
    name: 'app',
    props: {
        api: {
            type: String,
            required: true,
        },
        interval: {
            type: Number,
            default: 120000,
        },
    },
    components: {
        Banner,
        BreakingNews,
        FetchData,
    },
};
</script>

<style scoped>
    * {
        font-family: sans-serif;
        box-sizing: border-box;
    }
</style>
