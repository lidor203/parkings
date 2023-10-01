import { VisitorStatsFunctionality } from '../visitorStats/visitorStats';
import autocomplete from '../autocomplete/autocomplete';

const visitorStatsByHostIDFunctionality = new VisitorStatsFunctionality();

export const showVisitorStatsByHostIDFunction = async (hostID) => {
    await visitorStatsByHostIDFunctionality.showVisitorStatsByHostID(hostID, (visitorStatsByHostID) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("visitorStatsByHostIDTable").rows;
                let tdArray = [];
                let chosenInput = visitorStatsByHostIDInput.value;

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
        let visitorStatsByHostIDInput = document.getElementById("myVisitorStatsByHostIDInput");
        visitorStatsByHostIDInput.onkeyup = reduceTable;
        let visitorStatsByHostIDTable = document.getElementById("visitorStatsByHostIDTable");
        let visitorStatsByHostIDArray = [];

        const nowTime = new Date();
        const nowMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
        const nowDate = nowTime.getDate().toString() + "-" + nowMonth + "-" + nowTime.getFullYear().toString();
        let pastTime = new Date();
        pastTime.setDate(pastTime.getDate() - 30);
        const pastMonth = (nowTime.getMonth()+1) < 10 ? "0" + (pastTime.getMonth()+1).toString() : (pastTime.getMonth()+1).toString();
        const pastDate = pastTime.getDate().toString() + "-" + pastMonth + "-" + pastTime.getFullYear().toString();
        const datesRangeForVisitorStatsByHostID = document.getElementById("datesRangeForVisitorStats");
        datesRangeForVisitorStatsByHostID.innerText = "טווח תאריכים מ " + pastDate + " עד " + nowDate;

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
        visitorStatsByHostIDTable.appendChild(trHead);

        if (JSON.stringify(visitorStatsByHostID) === "{}") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", 4);
            td.innerText = "אין נתוני מבקרים";
            tr.appendChild(td);
            visitorStatsByHostIDTable.appendChild(tr);
        }
        else {
            for (const key in visitorStatsByHostID) {
                const td = document.getElementById("td" + visitorStatsByHostID[key]["visitorID"]);

                if (td !== null) {
                    const visitorEntrancesCount = parseInt(td.innerText);
                    td.innerText = (visitorEntrancesCount + 1).toString();
                }
                else {             
                    const tr = document.createElement("tr");
                    tr.id = "tr" + visitorStatsByHostID[key]["visitorID"];
                    const tdVisitorID = document.createElement("td");
                    tdVisitorID.setAttribute("tagName", "relevant");
                    const tdVisitorName = document.createElement("td");
                    tdVisitorName.setAttribute("tagName", "relevant");
                    const tdVisitorPhone = document.createElement("td");
                    const tdVisitorEntrancesCount = document.createElement("td");
                    tdVisitorEntrancesCount.id = "td" + visitorStatsByHostID[key]["visitorID"];
                    tdVisitorID.innerText = visitorStatsByHostID[key]["visitorID"];
                    tdVisitorName.innerText = visitorStatsByHostID[key]["visitorName"];
                    tdVisitorPhone.innerText = visitorStatsByHostID[key]["visitorPhone"];
                    tdVisitorEntrancesCount.innerText = "1";
                    
                    tr.appendChild(tdVisitorID);
                    tr.appendChild(tdVisitorName);
                    tr.appendChild(tdVisitorPhone);
                    tr.appendChild(tdVisitorEntrancesCount);
                    visitorStatsByHostIDTable.appendChild(tr);
                    visitorStatsByHostIDArray.push(visitorStatsByHostID[key]["visitorID"]);
                    visitorStatsByHostIDArray.push(visitorStatsByHostID[key]["visitorName"]);
                }
            }
        }
        
        autocomplete(document.getElementById("myVisitorStatsByHostIDInput"), visitorStatsByHostIDArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}