/* global describe, it, expect, document */
import Vue from 'vue';
import Banner from './index';

describe('<Banner />', () => {
    it('can handle html content in the body of the banner', () => {
        const htmlContent = '<a href="#">This <strong>banner</strong> has a link</a>';
        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return {
                    htmlContent,
                };
            },
            components: { Banner },
            template: '<Banner strTitle="Test banner" v-bind:htmlContent="htmlContent" />',
        });

        expect(vm.$el.querySelector('.banner__body').innerHTML).to.equal(htmlContent);
    });

    it('does not mutate its props', () => {
        const htmlContent = '<a href="#">This <strong>banner</strong> has a link</a>';
        const strTitle = 'Test banner';
        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return {
                    strTitle,
                    htmlContent,
                };
            },
            components: { Banner },
            template: '<Banner v-bind:strTitle="strTitle" v-bind:htmlContent="htmlContent" />',
        });

        expect(vm.$el.querySelector('.banner__body').innerHTML).to.equal(htmlContent);
        expect(vm.$el.querySelector('.banner__title').textContent).to.equal(strTitle);
    });
});
