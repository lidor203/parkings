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
                        const tdBlockerID = document.createElement("td");
                        const tdBlockerName = document.createElement("td");
                        const tdBlockerPhone = document.createElement("td");
                        const tdBlockerCarNumber = document.createElement("td");
                        tdBlockerID.innerText = user[key]["ID"];
                        tdBlockerName.innerText = user[key]["name"];
                        tdBlockerPhone.innerText = user[key]["phone"];
                        tdBlockerCarNumber.innerText = user[key]["carNumber"];
                        tr.appendChild(tdBlockerID);
                        tr.appendChild(tdBlockerName);
                        tr.appendChild(tdBlockerPhone);
                        tr.appendChild(tdBlockerCarNumber);
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
        const changeLeaveTime = () => {
            const leaveTime = document.getElementById("leaveTime").value;
            const leaveTimeHours = parseInt(String(leaveTime).split(':')[0]);
            const leaveTimeMinutes = parseInt(String(leaveTime).split(':')[1]);
            if (leaveTime === "") {
                alert("אי אפשר לעדכן זמן עזיבה ריק או לא שלם");
            }
            else if ((leaveTimeHours < new Date().getHours()) || 
                     ((leaveTimeHours === new Date().getHours()) && (leaveTimeMinutes < new Date().getMinutes()))) {
                alert("אי אפשר לעדכן זמן עזיבה בעבר");
            }
            else {
                usersFunctionality.changeLeaveTime(leaveTime, global.userKey);
            }
        };

        const changeLeaveTimeToNow = () => {
            const currentDate = new Date();
            const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
            usersFunctionality.changeLeaveTime(currentTime, global.userKey);
        };
        
        document.getElementById("updateParkingDetailsButton").onclick = changeLeaveTime;
        document.getElementById("leaveNowButton").onclick = changeLeaveTimeToNow;

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
        
        trBlockedHead.appendChild(thBlockedName);
        trBlockedHead.appendChild(thBlockedCarNumber);
        trBlockedHead.appendChild(thBlockedPhone);
        trBlockedHead.appendChild(thBlockedLeaveTime);
        meBlockTable.appendChild(trBlockedHead);

        await getBlockedsByMe(blockerMap.get(global.userCarNumber), global.userCarNumber);

        let blockMeTable = document.getElementById("blockMeTable");

        const trBlockerHead = document.createElement("tr");
        trBlockerHead.className="header";
        const thBlockerID = document.createElement("th");
        const thBlockerName = document.createElement("th");
        const thBlockerPhone = document.createElement("th");
        const thBlockerCarNumber = document.createElement("th");
        thBlockerID.innerText = "מספר תעודה של החוסם";
        thBlockerName.innerText = "שם החוסם";
        thBlockerPhone.innerText = "מספר פלאפון של החוסם";
        thBlockerCarNumber.innerText = "מספר הרכב של החוסם";
        
        trBlockerHead.appendChild(thBlockerID);
        trBlockerHead.appendChild(thBlockerName);
        trBlockerHead.appendChild(thBlockerPhone);
        trBlockerHead.appendChild(thBlockerCarNumber);
        blockMeTable.appendChild(trBlockerHead);

        await getMyBlockers(blockedMap.get(global.userCarNumber), global.userCarNumber);
    },
        () => { alert("התרחשה שגיאה בשליפת החוסמים/חסומים"); })
}