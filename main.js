import { Vue } from './js/Vue.js';

new Vue({
    el: '#app',
    data: {
        number: 0,
        obj: {
            a: 1
        },
    },
    methods: {
        doClick: function () {
            this.obj.a ++;
            this.number ++;
            this.print('触发了函数间的调用')
        },
        print: function (str) {
            console.log(str)
        }
    }
});
