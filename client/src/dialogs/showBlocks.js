import { BlocksFunctionality } from '../blocks/blocks';
import { UsersFunctionality } from '../users/users';

const blocksFunctionality = new BlocksFunctionality();
const usersFunctionality = new UsersFunctionality();

export const getBlockedsByMe = async (blockedMap, carNumber) => {
    let meBlockTable = document.getElementById("meBlockTable");
    
    if (blockedMap === undefined) {
        const td = document.createElement("td");
        td.setAttribute('colspan', '4');
        td.innerText = "אינך חוסם אף רכב";
        const tr = document.createElement("tr");
        tr.appendChild(td);
        meBlockTable.appendChild(tr);
    }
    else {
        while (carNumber !== undefined) {
            if (carNumber !== global.userCarNumber){
                await usersFunctionality.getUserByCar((user) => {
                    for (const key in user) {  
                        const tr = document.createElement("tr");
                        const tdBlockedName = document.createElement("td");
                        const tdBlockedCarNumber = document.createElement("td");
                        const tdBlockedPhone = document.createElement("td");
                        const tdBlockedLeaveTime = document.createElement("td");
                        tdBlockedName.setAttribute("width", "25%");
                        tdBlockedCarNumber.setAttribute("width", "25%");
                        tdBlockedPhone.setAttribute("width", "25%");
                        tdBlockedLeaveTime.setAttribute("width", "25%");
                        tdBlockedName.innerText = user[key]["name"];
                        tdBlockedCarNumber.innerText = user[key]["carNumber"];
                        tdBlockedPhone.innerText = user[key]["phone"];
                        tdBlockedLeaveTime.innerText = user[key]["leaveTime"];
                        tr.appendChild(tdBlockedName);
                        tr.appendChild(tdBlockedCarNumber);
                        tr.appendChild(tdBlockedPhone);
                        tr.appendChild(tdBlockedLeaveTime);
                        meBlockTable.appendChild(tr);
                    }
                }, () => {}, carNumber);
            }
            carNumber = blockedMap.pop();
        }
    }
}

export const getMyBlockers = async (blockerMap, carNumber) => {
    let blockMeTable = document.getElementById("blockMeTable");
    
    if (blockerMap === undefined) {
        const td = document.createElement("td");
        td.setAttribute('colspan', '4');
        td.innerText = "אינך חסום על ידי אף רכב";
        const tr = document.createElement("tr");
        tr.appendChild(td);
        blockMeTable.appendChild(tr);
    }
    else {
        while (carNumber !== undefined) {
            if (carNumber !== global.userCarNumber){
                await usersFunctionality.getUserByCar((user) => {
                    for (const key in user) {  
                        const tr = document.createElement("tr");
                        const tdBlockerName = document.createElement("td");
                        const tdBlockerCarNumber = document.createElement("td");
                        const tdBlockerPhone = document.createElement("td");
                        const tdBlockerLeaveTime = document.createElement("td");
                        tdBlockerName.setAttribute("width", "25%");
                        tdBlockerCarNumber.setAttribute("width", "25%");
                        tdBlockerPhone.setAttribute("width", "25%");
                        tdBlockerLeaveTime.setAttribute("width", "25%");
                        tdBlockerName.innerText = user[key]["name"];
                        tdBlockerCarNumber.innerText = user[key]["carNumber"];
                        tdBlockerPhone.innerText = user[key]["phone"];
                        tdBlockerLeaveTime.innerText = user[key]["leaveTime"];
                        tr.appendChild(tdBlockerName);
                        tr.appendChild(tdBlockerCarNumber);
                        tr.appendChild(tdBlockerPhone);
                        tr.appendChild(tdBlockerLeaveTime);
                        blockMeTable.appendChild(tr);
                    }
                }, () => {}, carNumber);
            }
            carNumber = blockerMap.pop();
        }
    }
}

export const showBlocksFunction = async () => {
    await blocksFunctionality.showBlocks(async (blockerMap, blockedMap) => {
        let nowTime = new Date();
        document.getElementById("leaveTime").value = nowTime.getHours().toString().padStart(2,'0') + ":" + nowTime.getMinutes().toString().padStart(2,'0');
        document.getElementById("leftNowButton").onclick = blocksFunctionality.deleteBlock;

        const changeLeaveTime = async () => {
            const newLeaveTime = document.getElementById("leaveTime").value;
            const newLeaveTimeHours = parseInt(String(newLeaveTime).split(':')[0]);
            const newLeaveTimeMinutes = parseInt(String(newLeaveTime).split(':')[1]);
            if (newLeaveTime === "") {
                alert("אי אפשר לעדכן זמן עזיבה ריק או לא שלם");
            }
            else if ((newLeaveTimeHours < new Date().getHours()) || 
                     ((newLeaveTimeHours === new Date().getHours()) && (newLeaveTimeMinutes < new Date().getMinutes()))) {
                alert("אי אפשר לעדכן זמן עזיבה בעבר");
            }
            else {
                await usersFunctionality.changeLeaveTime(newLeaveTime, global.userKey)
                .then(async () => {
                    if (res.status === 200)
                    {
                        const blockedUserPhone = global.userPhone;                   
                        await axios.post(`${apiURL}/blocks/changeAlarmMessegesToNewTime`, { blockedUserPhone, newLeaveTime })
                        .then()
                        .catch()
                        .finally(global.leaveTime = newLeaveTime);
                    }
                })
                .catch()
                .finally();
            }
        };

        document.getElementById("updateParkingDetailsButton").onclick = changeLeaveTime;
        let meBlockTable = document.getElementById("meBlockTable");

        const trBlockedHead = document.createElement("tr");
        trBlockedHead.className="header";
        const thBlockedName = document.createElement("th");
        const thBlockedCarNumber = document.createElement("th");
        const thBlockedPhone = document.createElement("th");
        const thBlockedLeaveTime = document.createElement("th");
        thBlockedName.innerText = "שם החסום";
        thBlockedCarNumber.innerText = "מספר הרכב של החסום";
        thBlockedPhone.innerText = "מספר פלאפון של החסום";
        thBlockedLeaveTime.innerText = "שעת היציאה של החסום";
        thBlockedName.setAttribute("width", "25%");
        thBlockedCarNumber.setAttribute("width", "25%");
        thBlockedPhone.setAttribute("width", "25%");
        thBlockedLeaveTime.setAttribute("width", "25%");
        trBlockedHead.appendChild(thBlockedName);
        trBlockedHead.appendChild(thBlockedCarNumber);
        trBlockedHead.appendChild(thBlockedPhone);
        trBlockedHead.appendChild(thBlockedLeaveTime);
        meBlockTable.appendChild(trBlockedHead);

        await getBlockedsByMe(blockerMap.get(global.userCarNumber), global.userCarNumber);

        let blockMeTable = document.getElementById("blockMeTable");

        const trBlockerHead = document.createElement("tr");
        trBlockerHead.className="header";
        const thBlockerName = document.createElement("th");
        const thBlockerCarNumber = document.createElement("th");
        const thBlockerPhone = document.createElement("th");
        const thBlockerLeaveTime = document.createElement("th");
        thBlockerName.innerText = "שם החוסם";
        thBlockerCarNumber.innerText = "מספר הרכב של החוסם";
        thBlockerPhone.innerText = "מספר פלאפון של החוסם";
        thBlockerLeaveTime.innerText = "שעת היציאה של החוסם";
        thBlockerName.setAttribute("width", "25%");
        thBlockerCarNumber.setAttribute("width", "25%");
        thBlockerPhone.setAttribute("width", "25%");
        thBlockerLeaveTime.setAttribute("width", "25%");
        trBlockerHead.appendChild(thBlockerName);
        trBlockerHead.appendChild(thBlockerCarNumber);
        trBlockerHead.appendChild(thBlockerPhone);
        trBlockerHead.appendChild(thBlockerLeaveTime);
        blockMeTable.appendChild(trBlockerHead);

        await getMyBlockers(blockedMap.get(global.userCarNumber), global.userCarNumber);
    },
        () => { alert("התרחשה שגיאה בשליפת החוסמים/חסומים"); })
}