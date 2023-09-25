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
        const th0800 = document.createElement("th");
        const th0830 = document.createElement("th");
        const th0900 = document.createElement("th");
        const th0930 = document.createElement("th");
        const th1000 = document.createElement("th");
        thDay.innerText = "יום";
        th0700.innerText = "07:00-07:30";
        th0730.innerText = "07:30-08:00";
        th0800.innerText = "08:00-08:30";
        th0830.innerText = "08:30-09:00";
        th0900.innerText = "09:00-09:30";
        th0930.innerText = "09:30-10:00";
        th1000.innerText = "10:00-10:30";
        trHead.appendChild(thDay);
        trHead.appendChild(th0700);
        trHead.appendChild(th0730);
        trHead.appendChild(th0800);
        trHead.appendChild(th0830);
        trHead.appendChild(th0900);
        trHead.appendChild(th0930);
        trHead.appendChild(th1000);
        entranceStatsTable.appendChild(trHead);

        const tr0 = document.createElement("tr");
        const tdSunday = document.createElement("td");
        const td0_0700 = document.createElement("td");
        const td0_0730 = document.createElement("td");
        const td0_0800 = document.createElement("td");
        const td0_0830 = document.createElement("td");
        const td0_0900 = document.createElement("td");
        const td0_0930 = document.createElement("td");
        const td0_1000 = document.createElement("td");
        td0_0700.id = "td0_07:00-07:30";
        td0_0730.id = "td0_07:30-08:00";
        td0_0800.id = "td0_08:00-08:30";
        td0_0830.id = "td0_08:30-09:00";
        td0_0900.id = "td0_09:00-09:30";
        td0_0930.id = "td0_09:30-10:00";
        td0_1000.id = "td0_10:00-10:30";
        tdSunday.innerText = "יום ראשון";
        td0_0700.innerText = "0";
        td0_0730.innerText = "0";
        td0_0800.innerText = "0";
        td0_0830.innerText = "0";
        td0_0900.innerText = "0";
        td0_0930.innerText = "0";
        td0_1000.innerText = "0";
        tr0.appendChild(tdSunday);
        tr0.appendChild(td0_0700);
        tr0.appendChild(td0_0730);
        tr0.appendChild(td0_0800);
		tr0.appendChild(td0_0830);
		tr0.appendChild(td0_0900);
		tr0.appendChild(td0_0930);
		tr0.appendChild(td0_1000);
        const tr1 = document.createElement("tr");
        const tdMonday = document.createElement("td");
        const td1_0700 = document.createElement("td");
        const td1_0730 = document.createElement("td");
        const td1_0800 = document.createElement("td");
		const td1_0830 = document.createElement("td");
		const td1_0900 = document.createElement("td");
		const td1_0930 = document.createElement("td");
		const td1_1000 = document.createElement("td");
        td1_0700.id = "td1_07:00-07:30";
        td1_0730.id = "td1_07:30-08:00";
        td1_0800.id = "td0_08:00-08:30";
		td1_0830.id = "td0_08:30-09:00";
		td1_0900.id = "td0_09:00-09:30";
		td1_0930.id = "td0_09:30-10:00";
		td1_1000.id = "td0_10:00-10:30";
        tdMonday.innerText = "יום שני";
        td1_0700.innerText = "0";
        td1_0730.innerText = "0";
        td1_0800.innerText = "0";
		td1_0830.innerText = "0";
		td1_0900.innerText = "0";
		td1_0930.innerText = "0";
		td1_1000.innerText = "0";
        tr1.appendChild(tdMonday);
        tr1.appendChild(td1_0700);
        tr1.appendChild(td1_0730);
        tr1.appendChild(td1_0800);
		tr1.appendChild(td1_0830);
		tr1.appendChild(td1_0900);
		tr1.appendChild(td1_0930);
		tr1.appendChild(td1_1000);
        const tr2 = document.createElement("tr");
        const tdTuesday = document.createElement("td");
        const td2_0700 = document.createElement("td");
        const td2_0730 = document.createElement("td");
        const td2_0800 = document.createElement("td");
		const td2_0830 = document.createElement("td");
		const td2_0900 = document.createElement("td");
		const td2_0930 = document.createElement("td");
		const td2_1000 = document.createElement("td");
        td2_0700.id = "td2_07:00-07:30";
        td2_0730.id = "td2_07:30-08:00";
        td2_0800.id = "td0_08:00-08:30";
		td2_0830.id = "td0_08:30-09:00";
		td2_0900.id = "td0_09:00-09:30";
		td2_0930.id = "td0_09:30-10:00";
		td2_1000.id = "td0_10:00-10:30";
        tdTuesday.innerText = "יום שלישי";
        td2_0700.innerText = "0";
        td2_0730.innerText = "0";
        td2_0800.innerText = "0";
		td2_0830.innerText = "0";
		td2_0900.innerText = "0";
		td2_0930.innerText = "0";
		td2_1000.innerText = "0";
        tr2.appendChild(tdTuesday);
        tr2.appendChild(td2_0700);
        tr2.appendChild(td2_0730);
        tr2.appendChild(td2_0800);
		tr2.appendChild(td2_0830);
		tr2.appendChild(td2_0900);
		tr2.appendChild(td2_0930);
		tr2.appendChild(td2_1000);
        const tr3 = document.createElement("tr");
        const tdWednsday = document.createElement("td");
        const td3_0700 = document.createElement("td");
        const td3_0730 = document.createElement("td");
        const td3_0800 = document.createElement("td");
		const td3_0830 = document.createElement("td");
		const td3_0900 = document.createElement("td");
		const td3_0930 = document.createElement("td");
		const td3_1000 = document.createElement("td");
        td3_0700.id = "td3_07:00-07:30";
        td3_0730.id = "td3_07:30-08:00";
        td3_0800.id = "td0_08:00-08:30";
		td3_0830.id = "td0_08:30-09:00";
		td3_0900.id = "td0_09:00-09:30";
		td3_0930.id = "td0_09:30-10:00";
		td3_1000.id = "td0_10:00-10:30";
        tdWednsday.innerText = "יום רביעי";
        td3_0700.innerText = "0";
        td3_0730.innerText = "0";
        td3_0800.innerText = "0";
		td3_0830.innerText = "0";
		td3_0900.innerText = "0";
		td3_0930.innerText = "0";
		td3_1000.innerText = "0";
        tr3.appendChild(tdWednsday);
        tr3.appendChild(td3_0700);
        tr3.appendChild(td3_0730);
        tr3.appendChild(td3_0800);
		tr3.appendChild(td3_0830);
		tr3.appendChild(td3_0900);
		tr3.appendChild(td3_0930);
		tr3.appendChild(td3_1000);
        const tr4 = document.createElement("tr");
        const tdThursday = document.createElement("td");
        const td4_0700 = document.createElement("td");
        const td4_0730 = document.createElement("td");
        const td4_0800 = document.createElement("td");
		const td4_0830 = document.createElement("td");
		const td4_0900 = document.createElement("td");
		const td4_0930 = document.createElement("td");
		const td4_1000 = document.createElement("td");	
        td4_0700.id = "td4_07:00-07:30";
        td4_0730.id = "td4_07:30-08:00";
        td4_0800.id = "td0_08:00-08:30";
		td4_0830.id = "td0_08:30-09:00";
		td4_0900.id = "td0_09:00-09:30";
		td4_0930.id = "td0_09:30-10:00";
		td4_1000.id = "td0_10:00-10:30";	
        tdThursday.innerText = "יום חמישי";
        td4_0700.innerText = "0";
        td4_0730.innerText = "0";
        td4_0800.innerText = "0";
		td4_0830.innerText = "0";
		td4_0900.innerText = "0";
		td4_0930.innerText = "0";
		td4_1000.innerText = "0";
        tr4.appendChild(tdThursday);
        tr4.appendChild(td4_0700);
        tr4.appendChild(td4_0730);
        tr4.appendChild(td4_0800);
		tr4.appendChild(td4_0830);
		tr4.appendChild(td4_0900);
		tr4.appendChild(td4_0930);
		tr4.appendChild(td4_1000);
        
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