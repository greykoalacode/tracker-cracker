// export function getCookie(cookieName) {
//     var cookieArr = document.cookie.split(";");
//     for (var i = 0; i < cookieArr.length; i++) {
//       var cookiePair = cookieArr[i].split("=");
//       if (cookieName === cookiePair[0].trim()) {
//         return decodeURIComponent(cookiePair[1]);
//       }
//     }
//     return null;
//   }

import Cookies from "js-cookie";
import { checkLogin } from "../http/ApiService";

export function getCookie(cookieName){
  // console.log('av cook ',Cookies.get());
  return Cookies.get(cookieName);
}
export function isLoggedIn(){
  async function check(){
    let resultObj = await checkLogin();
    if(resultObj.status !==  200){
      // setLoginState(false);
      // resetUserState();
      return false;
    }
    return true;
  }
  return check();
}

