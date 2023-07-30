import Cookies from "js-cookie";
import moment from "moment";

export function getCookie(cookieName){
  return Cookies.get(cookieName);
}



export const getDateAccToCalendar =(date) => {
  return moment(date).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
  });
}