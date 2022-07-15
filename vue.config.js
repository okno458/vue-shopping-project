module.exports = {
    //vue项目在打包以后代码都是加密的，如果运行是报错，输出的错误信息无法得知是哪一行代码报错
    //有了map文件就可以像未加密的代码一样，准确的输出是哪一行代码有错
    //如果项目不需要，可以在vue.config.js下配置 productionSouceMap:false,就可以去掉map文件
    // productionSouceMap:false,
    //关闭eslint
    lintOnSave:false,
    //配置代理解决跨域问题
    devServer:{
        proxy:{
            '/api':{
                //target：获取数据服务器的ip地址，数据来源于哪台服务器，就写它的ip地址 
                // target:'http://39.98.123.211',
                target:'http://gmall-h5-api.atguigu.cn',
                // pathRewrite:''
            }
        }
    }
}
