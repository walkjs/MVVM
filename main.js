import { Vue } from './js/Vue.js';

new Vue({
    el: '#app',
    data: {
        number: 0,
        obj: {
            a: 1
        }
    },
    methods: {
        doClick: function () {
            this.obj.a ++;
            this.number ++;
        }
    }
});
