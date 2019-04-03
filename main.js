import { Vue } from './js/Vue.js';

new Vue({
    el: '#app',
    data: {
        number: 0,
        obj: {
            a: 1
        },
    },
    created(){
        console.log(document.getElementById('app').innerHTML)
        console.log(this.number)
    },
    mounted(){
        console.log(document.getElementById('app').innerHTML)
        console.log(this.number)
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
