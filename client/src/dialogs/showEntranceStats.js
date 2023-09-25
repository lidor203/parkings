import { EntranceStatsFunctionality } from '../entranceStats/entranceStats';

const entranceStatsFunctionality = new EntranceStatsFunctionality();

export const showEntranceStatsFunction = async () => {
    await entranceStatsFunctionality.showEntranceStats((entranceStats) => {
        const timeSlotsNumber = 2;
        const nowTime = new Date();
        const nowMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
        const nowDate = nowTime.getDate().toString() + "-" + nowMonth + "-" + nowTime.getFullYear().toString();
        const nowDay = nowTime.getDay();
        let pastTime = new Date();
        pastTime.setDate(pastTime.getDate() - 30);
        const pastMonth = (nowTime.getMonth()+1) < 10 ? "0" + (pastTime.getMonth()+1).toString() : (pastTime.getMonth()+1).toString();
        const pastDate = pastTime.getDate().toString() + "-" + pastMonth + "-" + pastTime.getFullYear().toString();
        const datesRangeForVisitorStats = document.getElementById("datesRangeForEntranceStats");
        datesRangeForVisitorStats.innerText = "טווח תאריכים מ " + pastDate + " עד " + nowDate;

        let entranceStatsTable = document.getElementById("entranceStatsTable");

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thDay = document.createElement("th");
        const th0700 = document.createElement("th");
        const th0730 = document.createElement("th");
        thDay.innerText = "יום";
        th0700.innerText = "07:00-07:30";
        th0730.innerText = "07:30-08:00";
        trHead.appendChild(thDay);
        trHead.appendChild(th0700);
        trHead.appendChild(th0730);
        entranceStatsTable.appendChild(trHead);

        const tr0 = document.createElement("tr");
        const tdSunday = document.createElement("td");
        const td0_0700 = document.createElement("td");
        const td0_0730 = document.createElement("td");
        td0_0700.id = "td0_07:00-07:30";
        td0_0730.id = "td0_07:30-08:00";
        tdSunday.innerText = "יום ראשון";
        td0_0700.innerText = "0";
        td0_0730.innerText = "0";
        tr0.appendChild(tdSunday);
        tr0.appendChild(td0_0700);
        tr0.appendChild(td0_0730);
        const tr1 = document.createElement("tr");
        const tdMonday = document.createElement("td");
        const td1_0700 = document.createElement("td");
        const td1_0730 = document.createElement("td");
        td1_0700.id = "td1_07:00-07:30";
        td1_0730.id = "td1_07:30-08:00";
        tdMonday.innerText = "יום שני";
        td1_0700.innerText = "0";
        td1_0730.innerText = "0";
        tr1.appendChild(tdMonday);
        tr1.appendChild(td1_0700);
        tr1.appendChild(td1_0730);
        const tr2 = document.createElement("tr");
        const tdTuesday = document.createElement("td");
        const td2_0700 = document.createElement("td");
        const td2_0730 = document.createElement("td");
        td2_0700.id = "td2_07:00-07:30";
        td2_0730.id = "td2_07:30-08:00";
        tdTuesday.innerText = "יום שלישי";
        td2_0700.innerText = "0";
        td2_0730.innerText = "0";
        tr2.appendChild(tdTuesday);
        tr2.appendChild(td2_0700);
        tr2.appendChild(td2_0730);
        const tr3 = document.createElement("tr");
        const tdWednsday = document.createElement("td");
        const td3_0700 = document.createElement("td");
        const td3_0730 = document.createElement("td");
        td3_0700.id = "td3_07:00-07:30";
        td3_0730.id = "td3_07:30-08:00";
        tdWednsday.innerText = "יום רביעי";
        td3_0700.innerText = "0";
        td3_0730.innerText = "0";
        tr3.appendChild(tdWednsday);
        tr3.appendChild(td3_0700);
        tr3.appendChild(td3_0730);
        const tr4 = document.createElement("tr");
        const tdThursday = document.createElement("td");
        const td4_0700 = document.createElement("td");
        const td4_0730 = document.createElement("td");
        tdThursday.innerText = "יום חמישי";
        td4_0700.innerText = "0";
        td4_0730.innerText = "0";
        td4_0700.id = "td4_07:00-07:30";
        td4_0730.id = "td4_07:30-08:00";
        tr4.appendChild(tdThursday);
        tr4.appendChild(td4_0700);
        tr4.appendChild(td4_0730);
        entranceStatsTable.appendChild(tr0);
        entranceStatsTable.appendChild(tr1);
        entranceStatsTable.appendChild(tr2);
        entranceStatsTable.appendChild(tr3);
        entranceStatsTable.appendChild(tr4);

        for (const key in entranceStats) {
            let timeRange = entranceStats[key]["entranceTime"];
            let timeHour = parseInt(timeRange.split(':')[0]);
            const timeMinute = parseInt(timeRange.split(':')[1]);

            if (timeHour < 10) {
                timeHour = "0" + timeHour;
            }

            if (timeMinute < 30) {
                timeRange = timeHour.toString() + ":00-" + timeHour.toString() + ":30";
            }
            else if(timeHour == 23) {
                timeRange = timeHour.toString() + ":30-00:00";
            }
            else {
                timeRange = timeHour.toString() + ":30-";
                if (timeHour < 9) {
                    timeRange = timeRange + "0";
                }
                
                timeRange = timeRange + (parseInt(timeHour) + 1).toString() + ":00";
            }

            const td = document.getElementById("td" + entranceStats[key]["entranceDay"] + "_" + timeRange);

            if (td !== null) {
                let entrancesCount = parseInt(td.innerText);
                entrancesCount = entrancesCount + 1;
                td.innerText = (entrancesCount).toString();

                if (entrancesCount > 0) {
                    td.setAttribute("bgcolor", "green");
                }
            }            
        }
      },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}