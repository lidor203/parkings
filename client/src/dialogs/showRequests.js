import { RequestsFunctionality } from '../requests/requests';
import autocomplete from '../autocomplete/autocomplete';

const requestsFunctionality = new RequestsFunctionality();

export const showRequestsFunction = async () => {
    await requestsFunctionality.showRequests((requests) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("requestsTable").rows;
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
        let requestsInput = document.getElementById("myRequestsInput");
        requestsInput.onkeyup = reduceTable;
        let requestsTable = document.getElementById("requestsTable");
        let requestsArray = [];

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thVisitorID = document.createElement("th");
        const thVisitorName = document.createElement("th");
        const thHostID = document.createElement("th");
        const thHostName = document.createElement("th");
        const thRequesterID = document.createElement("th");
        const thRequesterName = document.createElement("th");
        const thDots = document.createElement("th");
        thVisitorID.innerText = "מספר תעודת האורח";
        thVisitorName.innerText = "שם האורח";
        thHostID.innerText = "מספר תעודת המארח";
        thHostName.innerText = "שם המארח";
        thRequesterID.innerText = "מספר תעודת המאשר";
        thRequesterName.innerText = "שם המאשר";
        thDots.innerText = "";
        
        trHead.appendChild(thVisitorID);
        trHead.appendChild(thVisitorName);
        trHead.appendChild(thHostID);
        trHead.appendChild(thHostName);
        trHead.appendChild(thRequesterID);
        trHead.appendChild(thRequesterName);
        trHead.appendChild(thDots);
        requestsTable.appendChild(trHead);

        if (JSON.stringify(requests) === "{}") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", 7);
            td.innerText = "אין בקשות כניסה פעילות";
            tr.appendChild(td);
            requestsTable.appendChild(tr);
        }
        else {
            for (const key in requests) {             
                const deleteFunc = () => {
                    requestsFunctionality.deleteRequest(
                    () => { document.getElementById("tr" + requests[key]["visitorID"]).remove(); },
                    () => { alert("התרחשה שגיאה במחיקת בקשת הכניסה"); },
                    key);
                }

                const insertFunc = () => {
                    const requesterIDForInsert = requests[key]["requesterID"];
                    const requesterNameForInsert = requests[key]["requesterName"];
                    const hostIDForInsert = requests[key]["hostID"];
                    const hostNameForInsert = requests[key]["hostName"];
                    const hostPhoneForInsert = requests[key]["hostPhone"];
                    const visitorIDForInsert = requests[key]["visitorID"];
                    const visitorNameForInsert = requests[key]["visitorName"];
                    const visitorPhoneForInsert = requests[key]["visitorPhone"];

                    requestsFunctionality.insertRequest(requesterIDForInsert, requesterNameForInsert, 
                                                        hostIDForInsert, hostNameForInsert, 
                                                        hostPhoneForInsert, visitorIDForInsert,
                                                        visitorNameForInsert, visitorPhoneForInsert,
                    () => { requestsFunctionality.deleteRequest(
                            () => { document.getElementById("tr" + requests[key]["visitorID"]).remove(); },
                            () => { alert("התרחשה שגיאה במחיקת בקשת הכניסה"); },
                            key); },
                    () => { alert("התרחשה שגיאה בשמירת בקשת הכניסה לארכיון"); });
                }

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
                const tdDots = document.createElement("td");
                tdVisitorID.innerText = requests[key]["visitorID"];
                tdVisitorName.innerText = requests[key]["visitorName"];
                tdHostID.innerText = requests[key]["hostID"];
                tdHostName.innerText = requests[key]["hostName"];
                tdRequesterID.innerText = requests[key]["requesterID"];
                tdRequesterName.innerText = requests[key]["requesterName"];

                const editHref = document.createElement("a");
                editHref.className = "link";
                editHref.innerText = "הכנס";
                editHref.onclick = insertFunc;
                const deleteHref = document.createElement("a");
                deleteHref.className = "link";
                deleteHref.innerText = "מחק";
                deleteHref.onclick = deleteFunc;
                const editLi = document.createElement("li");
                const deleteLi = document.createElement("li");
                const ulul = document.createElement("ul");
                ulul.className = "ul";
                const menuDiv = document.createElement("div");
                menuDiv.className = "menu";
                const emptyDiv = document.createElement("div");
                const dotsDiv = document.createElement("div");
                dotsDiv.className = "dots";
                const inputRequest = document.createElement("input");
                inputRequest.id="input" + requests[key]["requestID"];
                inputRequest.type = "checkbox";
                inputRequest.className = "toggler";
                const menuWrapDiv = document.createElement("div");
                menuWrapDiv.id = "menu-wrap";
                const containerDiv = document.createElement("div");
                containerDiv.id = "container";
                
                editLi.appendChild(editHref);
                deleteLi.appendChild(deleteHref);
                ulul.appendChild(editLi);
                ulul.appendChild(deleteLi);
                menuDiv.appendChild(ulul);
                dotsDiv.appendChild(emptyDiv);
                menuWrapDiv.appendChild(inputRequest);
                menuWrapDiv.appendChild(dotsDiv);
                menuWrapDiv.appendChild(menuDiv);
                containerDiv.appendChild(menuWrapDiv);
                tdDots.appendChild(containerDiv);

                tr.appendChild(tdVisitorID);
                tr.appendChild(tdVisitorName);
                tr.appendChild(tdHostID);
                tr.appendChild(tdHostName);
                tr.appendChild(tdRequesterID);
                tr.appendChild(tdRequesterName);       
                tr.appendChild(tdDots);
                requestsTable.appendChild(tr);
                requestsArray.push(requests[key]["visitorID"]);
                requestsArray.push(requests[key]["visitorName"]);
            }
        }

        autocomplete(document.getElementById("myRequestsInput"), requestsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}