import Vue from 'vue';
import App from './components/app';

const props = {
    api: process.env.API_URL,
    interval: parseInt(process.env.API_INTERVAL, 10),
};

/* eslint-disable no-new */
new Vue({
    el: '#app-goes-here',
    render: h => h(App, { props }),
});
