import { Roles } from '../common/roles';
import { RequestsFunctionality } from '../requests/requests';
import autocomplete from '../autocomplete/autocomplete';

const requestsFunctionality = new RequestsFunctionality();

export const showRequestsByVisitorIDFunction = async () => {
    await requestsFunctionality.showRequestsByVisitorID((requests) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("requestsByVisitorIDTable").rows;
                let tdArray = [];
                let chosenInput = requestsInput.value;

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
        let requestsInput = document.getElementById("myRequestsByVisitorIDInput");
        requestsInput.onkeyup = reduceTable;
        let requestsTable = document.getElementById("requestsByVisitorIDTable");
        let requestsArray = [];

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thVisitorID = document.createElement("th");
        const thVisitorName = document.createElement("th");
        const thHostID = document.createElement("th");
        const thHostName = document.createElement("th");
        const thRequesterID = document.createElement("th");
        const thRequesterName = document.createElement("th");
        thVisitorID.innerText = "מספר תעודת האורח";
        thVisitorName.innerText = "שם האורח";
        thHostID.innerText = "מספר תעודת המארח";
        thHostName.innerText = "שם המארח";
        thRequesterID.innerText = "מספר תעודת המאשר";
        thRequesterName.innerText = "שם המאשר";
        
        trHead.appendChild(thVisitorID);
        trHead.appendChild(thVisitorName);
        trHead.appendChild(thHostID);
        trHead.appendChild(thHostName);
        trHead.appendChild(thRequesterID);
        trHead.appendChild(thRequesterName);
        requestsTable.appendChild(trHead);

        if (requests.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerText = "אין בקשות כניסה שנפתחו עבורך";
            tr.appendChild(td);
            requestsTable.appendChild(tr);
        }
        else {
            for (const key in requests) {             
                const tr = document.createElement("tr");
                tr.id = "tr" + requests[key]["visitorID"];
                const tdVisitorID = document.createElement("td");
                tdVisitorID.setAttribute("tagName", "relevant");
                const tdVisitorName = document.createElement("td");
                tdVisitorName.setAttribute("tagName", "relevant");
                const tdHostID = document.createElement("td");
                const tdHostName = document.createElement("td");
                const tdRequesterID = document.createElement("td");
                const tdRequesterName = document.createElement("td");
                tdVisitorID.innerText = requests[key]["visitorID"];
                tdVisitorName.innerText = requests[key]["visitorName"];
                tdHostID.innerText = requests[key]["hostID"];
                tdHostName.innerText = requests[key]["hostName"];
                tdRequesterID.innerText = requests[key]["requesterID"];
                tdRequesterName.innerText = requests[key]["requesterName"];

                tr.appendChild(tdVisitorID);
                tr.appendChild(tdVisitorName);
                tr.appendChild(tdHostID);
                tr.appendChild(tdHostName);
                tr.appendChild(tdRequesterID);
                tr.appendChild(tdRequesterName);       
                
                requestsTable.appendChild(tr);
                requestsArray.push(requests[key]["visitorID"]);
                requestsArray.push(requests[key]["visitorName"]);
            }
        }

        autocomplete(document.getElementById("myRequestsByVisitorIDInput"), requestsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}