/* global describe it document expect */
import Vue from 'vue';

import FetchData from './index';

describe('<FetchData />', () => {
    it('shows a custom message on success', (done) => {
        const msg = 'I am a success!';
        const vm = new Vue({
            el: document.createElement('div'),
            methods: {
                onFetch: function onFetch(uri, onSuccess) {
                    onSuccess({ data: { msg } });
                },
            },
            components: { FetchData },
            template: `
                <FetchData uri="http://fake.com" v-bind:onFetch="onFetch">
                    <template slot="successful" scope="props">
                        {{ (props.data && props.data.msg) || '' }}
                    </template>
                </FetchData> 
            `,
        });

        vm.$nextTick(() => {
            expect(vm.$el.textContent.trim()).to.equal(msg);
            done();
        });
    });

    it('shows a custom message on failure', (done) => {
        const msg = 'I am a failure!';
        const vm = new Vue({
            el: document.createElement('div'),
            methods: {
                onFetch: function onFetch(uri, onSuccess, onFailure) {
                    onFailure({ msg });
                },
            },
            components: { FetchData },
            template: `
                <FetchData uri="http://fake.com" v-bind:onFetch="onFetch">
                    <template slot="failure" scope="props">
                        {{ (props.data && props.data.msg) || '' }}
                    </template>
                </FetchData> 
            `,
        });

        vm.$nextTick(() => {
            expect(vm.$el.textContent.trim()).to.equal(msg);
            done();
        });
    });

    it('fetches on interval', (done) => {
        let pings = 0;
        const msg = 'I am a success!';
        const vm = new Vue({
            el: document.createElement('div'),
            methods: {
                onFetch: function onFetch(uri, onSuccess) {
                    pings += 1;
                    onSuccess({ data: { msg } });
                },
            },
            components: { FetchData },
            template: `
                <FetchData uri="http://fake.com" v-bind:onFetch="onFetch" v-bind:interval="1">
                    <template slot="successful" scope="props">
                        {{ (props.data && props.data.msg) || '' }}
                    </template>
                </FetchData> 
            `,
        });

        setTimeout(() => {
            vm.$nextTick(() => {
                expect(vm.$el.textContent.trim()).to.equal(msg);
                expect(pings).to.be.above(1);
                done();
            });
        }, 2);
    });

    it('is able to transform fetched data', (done) => {
        const msg = 'I am a success!';
        const transformedMsg = '!sseccus a ma I';
        const vm = new Vue({
            el: document.createElement('div'),
            methods: {
                onFetch: function onFetch(uri, onSuccess) {
                    onSuccess({ data: { msg } });
                },
                onTransform: function onTransform(data) {
                    return {
                        msg: data.msg.split('').reverse().join(''),
                    };
                },
            },
            components: { FetchData },
            template: `
                <FetchData uri="http://fake.com" v-bind:onFetch="onFetch" v-bind:onTransform="onTransform">
                    <template slot="successful" scope="props">
                        {{ (props.data && props.data.msg) || '' }}
                    </template>
                </FetchData>
            `,
        });

        vm.$nextTick(() => {
            expect(vm.$el.textContent.trim()).to.equal(transformedMsg);
            done();
        });
    });
});

