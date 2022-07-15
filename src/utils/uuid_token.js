import { v4 as uuidv4 } from 'uuid';
//生成随机字符串，且每次执行不发生变化，游客身份还需要持久存储
export const getUUID = () => {
   //先从本地存储中获取uuid
   let uuid_token = localStorage.getItem('UUIDTOKEN');
   if(!uuid_token){
      //生成游客身份
      uuid_token =  uuidv4();
      //本地存储一次
      localStorage.setItem('UUIDTOKEN', uuid_token);
   }  
   return uuid_token;
}