
function Vue(options) {
    this.$el = document.querySelectorAll(options.el)[0]
    this.$data = options.data
    this.$methods = options.methods
    this._init()
}
Vue.prototype = {
    _init: function () {
        _observe(this.$data)
        _compile(this.$el, this)

    }
}