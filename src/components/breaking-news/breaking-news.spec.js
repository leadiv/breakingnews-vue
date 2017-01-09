/* global describe it document expect beforeEach */
import Vue from 'vue';
import Cookies from 'js-cookie';

import BreakingNews from './index';

beforeEach(() => {
    Cookies.set('closeBreakingNews', '');
});

describe('<BreakingNews />', () => {
    it('empty banner renders nothing', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            components: { BreakingNews },
            template: '<BreakingNews id="123456b" htmlContent="" />',
        });

        expect(vm.$children[0].hasBreakingNews).to.equal(false);
        expect(vm.$el.textContent).to.equal('');
    });

    it('banner renders properly with no links', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            components: { BreakingNews },
            template: '<BreakingNews id="123456b" htmlContent="This is some banner text" />',
        });

        expect(vm.$children[0].hasBreakingNews).to.equal(true);
        expect(vm.$children[0].hasOneLink).to.equal(false);
        expect(vm.$el.querySelectorAll('div.breaking-news__content').length).to.equal(1);
    });

    it('banner renders properly with one link', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return {
                    htmlContent: 'This is <a href="#">some</a> banner text.',
                };
            },
            components: { BreakingNews },
            template: '<BreakingNews id="123456b" v-bind:htmlContent="htmlContent" />',
        });

        expect(vm.$children[0].hasOneLink).to.equal(true);
        expect(vm.$children[0].strFirstLink).to.equal('#');
        expect(vm.$el.querySelectorAll('a.breaking-news__content[href="#"]').length).to.equal(1);
    });

    it('banner renders properly with multiple links', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return {
                    htmlContent: 'This is <a href="#">some</a> banner <a href="#">text</a>.',
                };
            },
            components: { BreakingNews },
            template: '<BreakingNews id="123456b" v-bind:htmlContent="htmlContent" />',
        });

        expect(vm.$children[0].hasOneLink).to.equal(false);
        expect(vm.$el.querySelectorAll('div.breaking-news__content').length).to.equal(1);
    });

    it('dismissing the banner hides it from the user', (done) => {
        const vm = new Vue({
            el: document.createElement('div'),
            components: { BreakingNews },
            template: '<BreakingNews id="123456b" htmlContent="This is some banner text." />',
        });

        expect(vm.$children[0].hasBreakingNews).to.equal(true);
        vm.$el.querySelector('.breaking-news__close').click();
        vm.$nextTick(() => {
            expect(vm.$children[0].hasBreakingNews).to.equal(false);
            expect(vm.$el.textContent).to.equal('');
            done();
        });
    });

    it('dismissing the banner properly sets the cookie value', () => {
        const id = 'abcdef2';
        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return { id };
            },
            components: { BreakingNews },
            template: '<BreakingNews v-bind:id="id" htmlContent="This is some banner text." />',
        });

        vm.$el.querySelector('.breaking-news__close').click();
        expect(Cookies.get('closeBreakingNews')).to.equal(id);
    });

    it('does not show the same banner if previously dismissed', () => {
        const id = '23l4jir';

        Cookies.set('closeBreakingNews', id);
        expect(Cookies.get('closeBreakingNews')).to.equal(id);

        const vm = new Vue({
            el: document.createElement('div'),
            data: function state() {
                return { id };
            },
            components: { BreakingNews },
            template: '<BreakingNews v-bind:id="id" htmlContent="This is some banner text." />',
        });

        expect(vm.$children[0].hasBreakingNews).to.equal(false);
        expect(vm.$el.textContent).to.equal('');
    });

    it('shows new banner after previously dismissing a different banner', () => {
        const id = '23l4jir';

        Cookies.set('closeBreakingNews', id);
        expect(Cookies.get('closeBreakingNews')).to.equal(id);

        const vm = new Vue({
            el: document.createElement('div'),
            components: { BreakingNews },
            template: '<BreakingNews id="fehlis3" htmlContent="This is some banner text." />',
        });

        expect(vm.$children[0].hasBreakingNews).to.equal(true);
        expect(vm.$el.querySelectorAll('div.breaking-news__content').length).to.equal(1);
    });
});
