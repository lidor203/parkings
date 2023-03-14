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
                        tr.style = "visibility:inherit";
                    }
                }
                else {
                    var styleText = "";
                    for (let i = 0; i < trArray.length; i++) {
                        const tr = trArray[i];
                        styleText = "visibility:collapse";
                        if (tr.className !== "header"){
                            tdArray = tr.cells;
                            for (let j = 0; j < tdArray.length; j++) {
                                const td = tdArray[j];
                                if (td.getAttribute("tagName")) 
                                {
                                    if (td.innerHTML.toLowerCase().includes(chosenInput.toLowerCase()))
                                    {
                                        styleText = "visibility:inherit";
                                        break;
                                    }
                                    // if (e.key === "Enter") {
                                    //     if (td.innerHTML === chosenInput)
                                    //     {
                                    //         tr.style = "visibility:inherit";
                                    //         j = tdArray.length;
                                    //     }
                                    // }
                                    // if (e.key === "Backspace") {
                                    //     if (td.innerHTML.includes(chosenInput))
                                    //     {
                                    //         tr.style = "visibility:inherit";
                                    //         j = tdArray.length;
                                    //     }
                                    // }
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
        const thStatus = document.createElement("th");
        const thDots = document.createElement("th");
        thVisitorID.innerText = "מספר תעודה";
        thVisitorName.innerText = "שם האורח";
        thStatus.innerText = "סטטוס";
        thDots.innerText = "";
        thVisitorID.style = "width:25%";
        thVisitorName.style = "width:25%";
        thStatus.style = "width:15%";
        thDots.style = "width:5%";
        trHead.appendChild(thVisitorID);
        trHead.appendChild(thVisitorName);
        trHead.appendChild(thStatus);
        trHead.appendChild(thDots);
        requestsTable.appendChild(trHead);

        for (const key in requests) {             
            const deleteFunc = () => requestsFunctionality.deleteRequest(
                () => { document.getElementById("tr" + requests[key]["visitorID"]).remove(); },
                () => { alert("התרחשה שגיאה במחיקת בקשת הכניסה"); },
                key);

                const editFunc = () => {
                    const datas = {
                        "visitorName":requests[key]["visitorName"],
                        "visitorID":requests[key]["visitorID"],
                        "visitorPhone":requests[key]["visitorPhone"],
                        "carNumber":requests[key]["carNumber"],
                        "carType":requests[key]["carType"],
                        "carColor":requests[key]["carColor"],
                        "hostID":requests[key]["hostID"],
                        "hostName":requests[key]["hostName"],
                        "hostPhone":requests[key]["hostPhone"]
                    };

                    dialogHandler.setDialog(null);
                    dialogHandler.setDialog("showNewRequest", datas, key);
                };

            const tr = document.createElement("tr");
            tr.id = "tr" + requests[key]["visitorID"];
            const tdVisitorID = document.createElement("td");
            tdVisitorID.setAttribute("tagName", "relevant");
            const tdVisitorName = document.createElement("td");
            tdVisitorName.setAttribute("tagName", "relevant");
            const tdStatus = document.createElement("td");
            const tdDots = document.createElement("td");
            tdVisitorID.innerText = requests[key]["visitorID"];
            tdVisitorName.innerText = requests[key]["visitorName"];
            tdStatus.innerText = "approve for now";

            const editHref = document.createElement("a");
            editHref.className = "link";
            editHref.innerText = "ערוך";
            editHref.onclick = editFunc;
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
            tr.appendChild(tdStatus);
            tr.appendChild(tdDots);
            requestsTable.appendChild(tr);
            requestsArray.push(requests[key]["visitorID"]);
            requestsArray.push(requests[key]["visitorName"]);
        }

        autocomplete(document.getElementById("myRequestsInput"), requestsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בקשות הכניסה"); })
}