//存储token 对外暴露一个函数
export const setToken = (token) => {
    localStorage.setItem('TOKEN',token)
}
//获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN');
}
//删除token
export const removeToken = () => {
    return localStorage.removeItem('TOKEN');
}