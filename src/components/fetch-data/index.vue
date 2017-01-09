<template>
    <div>
        <slot v-if="isSuccessful" name="successful" v-bind:data="dataPayload"></slot>
        <slot v-else name="failure" v-bind:data="dataPayload"></slot>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'fetchData',
    props: {
        uri: {
            type: String,
            required: true,
        },
        interval: {
            type: Number,
        },
        onTransform: {
            type: Function,
        },
        onFetch: {
            type: Function,
        },
    },
    mounted: function mounted() {
        this.fetchOnInterval();
        this.$data.timer = null;
    },
    beforeDestory: function beforeDestory() {
        clearTimeout(this.timer);
    },
    data: function data() {
        return {
            dataPayload: null,
            hasFailed: false,
        };
    },
    methods: {
        fetch: function fetch() {
            if (this.onFetch) {
                this.onFetch(this.uri, this.success, this.failure);
            } else {
                axios(this.uri).then(this.success).catch(this.failure);
            }
        },
        fetchOnInterval: function fetchOnInterval() {
            this.fetch();
            if (this.interval) {
                clearTimeout(this.timer);
                this.timer = setTimeout(this.fetchOnInterval, this.interval);
            }
        },
        success: function success(data) {
            this.dataPayload = this.hasTransform ? this.onTransform(data.data) : data.data;
            this.hasFailed = false;
        },
        failure: function failure(data) {
            this.dataPayload = data;
            this.hasFailed = true;
        },
    },
    computed: {
        hasTransform: function hasTransform() {
            return typeof this.onTransform === 'function';
        },
        isSuccessful: function isSuccessful() {
            return this.dataPayload !== null && !this.hasFailed;
        },
    },
};
</script>
