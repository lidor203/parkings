import axios from "axios";
import { apiURL } from "../../config";

export const getBlockedTimeToLeave = (carNumber) => {
    axios.post(`${apiURL}/blocks/getBlocks`)
    .then(res => {
        const blockerMap = new Map();
        if (res.status === 200){
            for (const key in res.data) { 
                blockerMap.set(res.data[key]["blockerCarNumber"], []);
            }

            for (const key in res.data) {              
                blockerMap.get(res.data[key]["blockerCarNumber"]).push(res.data[key]["blockedCarNumber"]);
            }
        
            console.log(blockerMap);
            const blockedCars = blockerMap.get(carNumber);
            if (blockedCars !== undefined) {
                while (carNumber !== undefined) {
                    if (carNumber !== global.userCarNumber){
                        axios.post(`${apiURL}/users/getUserByCar`, { carNumber })
                        .then(res => {
                            if (res.status === 200) {
                                const user = res.data;
                                for (const key in user) {  
                                    // should be insert to an alarm for the SMS
                                    //alert(user[key]["name"] + " (" + user[key]["phone"] + ") רוצה לצאת עם רכב" + user[key]["carNumber"] + " בשעה " + user[key]["leaveTime"]);
                                    //alert(global.userPhone);
                                }
                            }
                        })
                        .catch()
                        .finally();
                    }

                    carNumber = blockedCars.pop();
                }
            }
        }
    })
    .catch()
    .finally();
}