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
import moment from "moment";
import { checkLogin } from "../http/ApiService";

export function getCookie(cookieName){
  // console.log('av cook ',Cookies.get());
  return Cookies.get(cookieName);
}


// export function isLoggedIn(){

//   let loginStatus =  new Promise((resolve, reject) => {
//     async function check(){
//       let resultObj = await checkLogin();
//       if(resultObj.status !==  200){
//         // setLoginState(false);
//         // resetUserState();
//         // return false;
//         reject(false);
//       }
//       // return true;
//       resolve(true);
//     }
//     check();
//   });
//   loginStatus.then(
//     () => 
//   )
// }
export const loginStatus =  new Promise((resolve, reject) => {
  async function check(){
    let resultObj = await checkLogin();
    if(resultObj.status !==  200){
      // setLoginState(false);
      // resetUserState();
      // return false;
      reject(false);
    }
    // return true;
    resolve(true);
  }
  check();
});

export const getDateAccToCalendar =(date) => {
  return moment(date).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
  });
}