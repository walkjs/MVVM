let target = null
// 订阅器
function Dep() {
    this.sub = []
}
Dep.prototype = {
    // 将watcher添加进来
    _addSub: function (val) {
        this.sub.push(val)
    },
    // 更新视图
    _notify: function (newVal) {
        this.sub.forEach(val => {
            val.value = newVal
            val._update()
        })
    }
}
// 数据监听
let _observe = function (data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach( key => {
        let dep = new Dep()
        let val = data[key]
        _observe(val)
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                // 初始化将watcher添加进来
                target && dep._addSub(target);
                return val
            },
            set: function (newVal) {
                if (newVal !== val) {
                    val = newVal
                    // 数据变动通知更新视图
                    dep._notify(newVal)
                }

            }
        })
    })
}