
import { Observe } from './Observer.js';
import { Compile } from './Compiler.js';
export class Vue {
    constructor(options) {
        this.$el = document.querySelectorAll(options.el)[0];
        this.$data = options.data;
        this.$methods = options.methods;

        this._init();
    }
    _init() {
        const observe = new Observe();
        const compile = new Compile();
        observe._observe(this.$data);
        compile._compile(this.$el, this);
    }
}