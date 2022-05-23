import moment from "moment";

export const parseDate = (date,format='YYYY-MM-DD') => moment(date).format(format);

export const progressCounter = (habits) => (habits.filter(each => each.status !== false).length / habits.length).toFixed(3);

export const progressClassname= (each) => {
    if(moment(parseDate(each.date)).isBefore(parseDate(new Date()))){
        if(!each.status){
            return "danger";
        }
    }
    return each.status ? "success": "dark";
}