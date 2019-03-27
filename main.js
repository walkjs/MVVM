import { Vue } from './js/Vue.js';

new Vue({
    el: '#app',
    data: {
        number: 0,
        number1: 0,
        number2: 0
    },
    methods: {
        doClick: function () {
            this.number ++;
            this.number1 += 2;
            this.number2 += 3;
        }
    }
});
