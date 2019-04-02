
const express = require('express')
const path = require('path')
const app = express()

//提供静态文件服务
app.use(express.static(path.resolve(__dirname , '../')))


let port = 1234
app.listen(port , function () {
    console.log(`连接成功,请访问http://localhost:${port}`)
});