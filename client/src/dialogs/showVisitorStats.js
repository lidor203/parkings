import { VisitorStatsFunctionality } from '../visitorStats/visitorStats';
import autocomplete from '../autocomplete/autocomplete';

const visitorStatsFunctionality = new VisitorStatsFunctionality();

export const showVisitorStatsFunction = async () => {
    await visitorStatsFunctionality.showVisitorStats((visitorStats) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("visitorStatsTable").rows;
                let tdArray = [];
                let chosenInput = visitorStatsInput.value;

                if (chosenInput === "") {
                    for (let i = 0; i < trArray.length; i++) {
                        const tr = trArray[i];
                        tr.style = "display: table-row";
                    }
                }
                else {
                    var styleText = "";
                    for (let i = 0; i < trArray.length; i++) {
                        const tr = trArray[i];
                        styleText = "display: none";
                        if (tr.className !== "header"){
                            tdArray = tr.cells;
                            for (let j = 0; j < tdArray.length; j++) {
                                const td = tdArray[j];
                                if (td.getAttribute("tagName")) 
                                {
                                    if (td.innerHTML.toLowerCase().includes(chosenInput.toLowerCase()))
                                    {
                                        styleText = "display: table-row";
                                        break;
                                    }
                                }
                            }

                            tr.style = styleText;
                        }
                    }
                }
            }
        };
        let visitorStatsInput = document.getElementById("myVisitorStatsInput");
        visitorStatsInput.onkeyup = reduceTable;
        let visitorStatsTable = document.getElementById("visitorStatsTable");
        let visitorStatsArray = [];

        const nowTime = new Date();
        const nowMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
        const nowDate = nowTime.getDate().toString() + "-" + nowMonth + "-" + nowTime.getFullYear().toString();
        let pastTime = new Date();
        pastTime.setDate(pastTime.getDate() - 30);
        const pastMonth = (nowTime.getMonth()+1) < 10 ? "0" + (pastTime.getMonth()+1).toString() : (pastTime.getMonth()+1).toString();
        const pastDate = pastTime.getDate().toString() + "-" + pastMonth + "-" + pastTime.getFullYear().toString();
        const datesRangeForVisitorStats = document.getElementById("datesRangeForVisitorStats");
        datesRangeForVisitorStats.innerText = "טווח תאריכים מ " + pastDate + " עד ה" + nowDate;

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thVisitorID = document.createElement("th");
        const thVisitorName = document.createElement("th");
        const thVisitorPhone = document.createElement("th");
        const thVisitorEntrancesCount = document.createElement("th");
        thVisitorID.innerText = "מספר תעודת האורח";
        thVisitorName.innerText = "שם האורח";
        thVisitorPhone.innerText = "טלפון האורח";
        thVisitorEntrancesCount.innerText = "כמות כניסות";
        
        trHead.appendChild(thVisitorID);
        trHead.appendChild(thVisitorName);
        trHead.appendChild(thVisitorPhone);
        trHead.appendChild(thVisitorEntrancesCount);
        visitorStatsTable.appendChild(trHead);

        if (JSON.stringify(visitorStats) === "{}") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", 4);
            td.innerText = "אין נתוני מבקרים";
            tr.appendChild(td);
            visitorStatsTable.appendChild(tr);
        }
        else {
            for (const key in visitorStats) {
                const td = document.getElementById("td" + visitorStats[key]["visitorID"]);

                if (td !== null) {
                    const visitorEntrancesCount = parseInt(td.innerText);
                    td.innerText = (visitorEntrancesCount + 1).toString();
                }
                else {             
                    const tr = document.createElement("tr");
                    tr.id = "tr" + visitorStats[key]["visitorID"];
                    const tdVisitorID = document.createElement("td");
                    tdVisitorID.setAttribute("tagName", "relevant");
                    const tdVisitorName = document.createElement("td");
                    tdVisitorName.setAttribute("tagName", "relevant");
                    const tdVisitorPhone = document.createElement("td");
                    const tdVisitorEntrancesCount = document.createElement("td");
                    tdVisitorEntrancesCount.id = "td" + visitorStats[key]["visitorID"];
                    tdVisitorID.innerText = visitorStats[key]["visitorID"];
                    tdVisitorName.innerText = visitorStats[key]["visitorName"];
                    tdVisitorPhone.innerText = visitorStats[key]["visitorPhone"];
                    tdVisitorEntrancesCount.innerText = "1";
                    
                    tr.appendChild(tdVisitorID);
                    tr.appendChild(tdVisitorName);
                    tr.appendChild(tdVisitorPhone);
                    tr.appendChild(tdVisitorEntrancesCount);
                    visitorStatsTable.appendChild(tr);
                    visitorStatsArray.push(visitorStats[key]["visitorID"]);
                    visitorStatsArray.push(visitorStats[key]["visitorName"]);
                }
            }
        }
        
        autocomplete(document.getElementById("myVisitorStatsInput"), visitorStatsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}