import { SecurityFunctionality } from '../security/security';
import autocomplete from '../autocomplete/autocomplete';

const securityFunctionality = new SecurityFunctionality();

export const showSecurityFunction = async () => {
    await securityFunctionality.showSecurity((security) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("securityTable").rows;
                let tdArray = [];
                let chosenInput = securityInput.value;

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

        let securityInput = document.getElementById("mySecurityInput");
        securityInput.onkeyup = reduceTable;
        let securityTable = document.getElementById("securityTable");
        let securityArray = [];

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thDisclaimedID = document.createElement("th");
        const thDisclaimedName = document.createElement("th");
        const thDisclaimedReason = document.createElement("th");
        const thDisclaimedDate = document.createElement("th");
        const thDots = document.createElement("th");
        thDisclaimedID.innerText = "מזהה";
        thDisclaimedName.innerText = "שם";
        thDisclaimedReason.innerText = "סיבה";
        thDisclaimedDate.innerText = "תאריך";
        thDots.innerText = "";
 
        trHead.appendChild(thDisclaimedID);
        trHead.appendChild(thDisclaimedName);
        trHead.appendChild(thDisclaimedReason);
        trHead.appendChild(thDisclaimedDate);
        trHead.appendChild(thDots);
        securityTable.appendChild(trHead);

        if (JSON.stringify(security) === "{}") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", 7);
            td.innerText = "אין הערות אבטחה פעילות";
            tr.appendChild(td);
            securityTable.appendChild(tr);
        }
        else {
            for (const key in security) {  
                const deleteFunc = () => securityFunctionality.deleteSecurity(
                    () => {document.getElementById("tr" + security[key]["ID"]).remove(); },
                    () => { alert("התרחשה שגיאה במחיקת הערת האבטחה"); },
                    key);

                const editFunc = () => {
                    const datas = {
                        "securityIDForSecurity": security[key]["ID"],
                        "securityNameForSecurity": security[key]["name"],
                        "securityReasonForSecurity" : security[key]["reason"]
                    };

                    const params = {
                        
                    };

                    dialogHandler.setDialog(null);
                    dialogHandler.setDialog("showNewSecurity", datas, key, params);
                };

                const tr = document.createElement("tr");
                tr.id = "tr" + security[key]["ID"];
                const tdDisclaimedID = document.createElement("td");
                tdDisclaimedID.setAttribute("tagName", "relevant");
                const tdDisclaimedName = document.createElement("td");
                tdDisclaimedName.setAttribute("tagName", "relavent");
                const tdDisclaimedReason = document.createElement("td");
                tdDisclaimedReason.setAttribute("tagName", "relevant");
                const tdDisclaimedDate = document.createElement("td");
                const tdDots = document.createElement("td");
                tdDisclaimedID.innerText = security[key]["ID"];
                tdDisclaimedName.innerText = security[key]["name"];
                tdDisclaimedReason.innerText = security[key]["reason"];
                tdDisclaimedDate.innerText = security[key]["date"];

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
                inputRequest.id="input" + security[key]["ID"];
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

                tr.appendChild(tdDisclaimedID);
                tr.appendChild(tdDisclaimedName);
                tr.appendChild(tdDisclaimedReason);
                tr.appendChild(tdDisclaimedDate);
                tr.appendChild(tdDots);
                securityTable.appendChild(tr);
                securityArray.push(security[key]["ID"]);
                securityArray.push(security[key]["name"]);
                securityArray.push(security[key]["reason"]);
            }
        }
        
        autocomplete(document.getElementById("mySecurityInput"), securityArray);
    },
        () => { alert("התרחשה שגיאה בשליפת חסומי הביטחון"); })
}