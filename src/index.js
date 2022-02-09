import Vue from 'vue';

import client from './client.vue';

new Vue({
    el: '#app',
    render: h => h(client)
});