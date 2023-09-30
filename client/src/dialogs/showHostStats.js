import { VisitorStatsFunctionality } from '../visitorStats/visitorStats';
import autocomplete from '../autocomplete/autocomplete';

const visitorStatsFunctionality = new VisitorStatsFunctionality();

export const showHostStatsFunction = async () => {
    await visitorStatsFunctionality.showVisitorStats((hostStats) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("hostStatsTable").rows;
                let tdArray = [];
                let chosenInput = hostStatsInput.value;

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
        let hostStatsInput = document.getElementById("myHostStatsInput");
        hostStatsInput.onkeyup = reduceTable;
        let hostStatsTable = document.getElementById("hostStatsTable");
        let hostStatsArray = [];

        const nowTime = new Date();
        const nowMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
        const nowDate = nowTime.getDate().toString() + "-" + nowMonth + "-" + nowTime.getFullYear().toString();
        let pastTime = new Date();
        pastTime.setDate(pastTime.getDate() - 30);
        const pastMonth = (nowTime.getMonth()+1) < 10 ? "0" + (pastTime.getMonth()+1).toString() : (pastTime.getMonth()+1).toString();
        const pastDate = pastTime.getDate().toString() + "-" + pastMonth + "-" + pastTime.getFullYear().toString();
        const datesRangeForHostStats = document.getElementById("datesRangeForHostStats");
        datesRangeForHostStats.innerText = "טווח תאריכים מ " + pastDate + " עד " + nowDate;

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thHostID = document.createElement("th");
        const thHostName = document.createElement("th");
        const thHostPhone = document.createElement("th");
        const thHostEntrancesCount = document.createElement("th");
        thHostID.innerText = "מספר תעודת המארח";
        thHostName.innerText = "שם המארח";
        thHostPhone.innerText = "טלפון המארח";
        thHostEntrancesCount.innerText = "כמות האירוחים";
        
        trHead.appendChild(thHostID);
        trHead.appendChild(thHostName);
        trHead.appendChild(thHostPhone);
        trHead.appendChild(thHostEntrancesCount);
        hostStatsTable.appendChild(trHead);

        for (const key in hostStats) {
            const td = document.getElementById("td" + hostStats[key]["hostID"]);

            if (td !== null) {
                const hostEntrancesCount = parseInt(td.innerText);
                td.innerText = (hostEntrancesCount + 1).toString();
            }
            else {      
                const getVisitorsByHost = () => {
                    document.getElementById('loader-circle').style.visibility = 'visible';

                    const datas = {
                    };
    
                    const params = {
                        "hostID":hostStats[key]["hostID"]
                    };
    
                    //dialogHandler.setDialog(null); //There is no need to clear the tables because we might come back to them later
                    dialogHandler.setDialog("showVisitorStatsByHostID", datas, key, params);
                };

                const tr = document.createElement("tr");
                tr.id = "tr" + hostStats[key]["hostID"];
                tr.onclick = getVisitorsByHost;
                const tdHostID = document.createElement("td");
                tdHostID.setAttribute("tagName", "relevant");
                const tdHostName = document.createElement("td");
                tdHostName.setAttribute("tagName", "relevant");
                const tdHostPhone = document.createElement("td");
                const tdHostEntrancesCount = document.createElement("td");
                tdHostEntrancesCount.id = "td" + hostStats[key]["hostID"];
                tdHostID.innerText = hostStats[key]["hostID"];
                tdHostName.innerText = hostStats[key]["hostName"];
                tdHostPhone.innerText = hostStats[key]["hostPhone"];
                tdHostEntrancesCount.innerText = "1";
                
                tr.appendChild(tdHostID);
                tr.appendChild(tdHostName);
                tr.appendChild(tdHostPhone);
                tr.appendChild(tdHostEntrancesCount);
                hostStatsTable.appendChild(tr);
                hostStatsArray.push(hostStats[key]["hostID"]);
                hostStatsArray.push(hostStats[key]["hostName"]);
            }
        }

        autocomplete(document.getElementById("myHostStatsInput"), hostStatsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}