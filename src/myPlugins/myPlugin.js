//vue自定义插件对外暴露的一定是对象
let myPlugin = {}
myPlugin.install = function (){
    console.log('调用')
}
export default myPlugin;