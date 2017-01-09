<template>
    <section class="breaking-news" v-if="hasBreakingNews" v-bind:class="objClassnames">
        <a v-if="hasOneLink" v-bind:href="strFirstLink" class="breaking-news__content">
            <slot></slot>
        </a>
        <div v-else class="breaking-news__content">
            <slot></slot>
        </div>
        <button aria-label="close" class="breaking-news__close" v-on:click="fnDismissBanner"></button>
    </section>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'breakingNews',
    props: {
        htmlContent: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data: function data() {
        return {
            hasBeenDismissed: false,
            currentBannerId: this.id,
        };
    },
    beforeMount: function created() {
        if (!this.hasNewBanner) {
            this.hasBeenDismissed = true;
        }
    },
    beforeUpdate: function beforeUpdate() {
        if (this.hasBeenDismissed && this.currentBannerId !== this.id) {
            this.hasBeenDismissed = false;
            this.currentBannerId = this.id;
        }
    },
    methods: {
        fnDismissBanner: function fnDismissBanner() {
            Cookies.set('closeBreakingNews', this.id);
            this.hasBeenDismissed = true;
        },
    },
    computed: {
        hasNewBanner: function hasNewBanner() {
            return typeof this.id === 'string' && Cookies.get('closeBreakingNews') !== this.id;
        },
        objClassnames: function objClassnames() {
            return {
                'breaking-news--has-one-link': this.hasOneLink,
            };
        },
        hasBreakingNews: function hasBreakingNews() {
            return this.htmlContent !== '' && !this.hasBeenDismissed;
        },
        hasOneLink: function hasOneLink() {
            return (this.htmlContent.split('</a>').length - 1) === 1;
        },
        strFirstLink: function strFirstLink() {
            return this.hasOneLink ? /href=("|')([^"']+)/.exec(this.htmlContent)[2] : '';
        },
    },
};
</script>

<style>
    .breaking-news a {
        color: inherit;
        text-decoration: none;
    }
</style>

<style scoped>
    .breaking-news {
        background-color: #c00;
        color: white;
        display: flex;
        align-items: flex-start;
    }
    .breaking-news--has-one-link {
        cursor: pointer;
    }
    .breaking-news__content {
        flex: 1 0;
    }
    .breaking-news__close {
        flex: 0 1;
        padding: 1.25rem;
        position: relative;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    .breaking-news__close:before,
    .breaking-news__close:after {
        content: "";
        height: .1em;
        left: -.125rem;
        margin: 0 auto;
        position: absolute;
        right: -.125rem;
        top: calc(50% - 1px);
        width: .9375rem;
        background: #fefefe;
    }
    .breaking-news__close:before {
        transform: rotate(45deg);
    }
    .breaking-news__close:after {
        transform: rotate(-45deg);
    }
</style>
