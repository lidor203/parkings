import { EntranceStatsFunctionality } from '../entranceStats/entranceStats';

const entranceStatsFunctionality = new EntranceStatsFunctionality();

export const showEntranceStatsFunction = async () => {
    await entranceStatsFunctionality.showEntranceStats((entranceStats) => {
        const nowTime = new Date();
        const nowMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
        const nowDate = nowTime.getDate().toString() + "-" + nowMonth + "-" + nowTime.getFullYear().toString();
        let pastTime = new Date();
        pastTime.setDate(pastTime.getDate() - 30);
        const pastMonth = (nowTime.getMonth()+1) < 10 ? "0" + (pastTime.getMonth()+1).toString() : (pastTime.getMonth()+1).toString();
        const pastDate = pastTime.getDate().toString() + "-" + pastMonth + "-" + pastTime.getFullYear().toString();
        const datesRangeForVisitorStats = document.getElementById("datesRangeForEntranceStats");
        datesRangeForVisitorStats.innerText = "טווח תאריכים מה " + pastDate + " עד ה " + nowDate;
        
        let entranceStatsTable = document.getElementById("entranceStatsTable");

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thEntranceTime = document.createElement("th");
        const thEntrancesCount = document.createElement("th");
        thEntranceTime.innerText = "זמן הכניסה";
        thEntrancesCount.innerText = "כמות הכניסות בזמן זה";
        
        trHead.appendChild(thEntranceTime);
        trHead.appendChild(thEntrancesCount);
        entranceStatsTable.appendChild(trHead);

        for (const key in entranceStats) {
            let timeRange = entranceStats[key]["entranceTime"];
            const timeHour = parseInt(timeRange.split(':')[0]);
            const timeMinute = parseInt(timeRange.split(':')[1]);

            if (timeMinute < 30) {
                timeRange = timeHour.toString() + ":00 - " + timeHour.toString() + ":30";
            }
            else if(timeHour == 23) {
                timeRange = timeHour.toString() + ":30 - 00:00";
            }
            else {
                timeRange = timeHour.toString() + ":30 - " + (timeHour + 1).toString() + ":00";
            }

            const td = document.getElementById("td" + timeRange);

            if (td !== null) {
                const entrancesCount = parseInt(td.innerText);
                td.innerText = (entrancesCount + 1).toString();
            }
            else {             
                const tr = document.createElement("tr");
                tr.id = "tr" + timeRange;
                const tdEntranceTime = document.createElement("td");
                const tdEntranceCount = document.createElement("td");
                tdEntranceTime.innerText = timeRange;
                tdEntranceCount.id = "td" + timeRange;
                tdEntranceCount.innerText = "1";
                
                tr.appendChild(tdEntranceTime);
                tr.appendChild(tdEntranceCount);
                entranceStatsTable.appendChild(tr);
            }
        }
      },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}