import { RolesFunctionality } from '../roles/roles';
import autocomplete from '../autocomplete/autocomplete';

const rolesFunctionality = new RolesFunctionality();

export const showRolesFunction = async () => {
    await rolesFunctionality.showRoles((roles) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("rolesTable").rows;
                let tdArray = [];
                let chosenInput = rolesInput.value;
                
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
        let rolesInput = document.getElementById("myRolesInput");
        rolesInput.onkeyup = reduceTable;
        let rolesTable = document.getElementById("rolesTable");
        let rolesArray = [];

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thRoleID = document.createElement("th");
        const thRoleName = document.createElement("th");
        const thDots = document.createElement("th");
        thRoleID.innerText = "מזהה תפקיד";
        thRoleName.innerText = "תיאור תפקיד";
        thDots.innerText = "";
        
        trHead.appendChild(thRoleID);
        trHead.appendChild(thRoleName);
        trHead.appendChild(thDots);
        rolesTable.appendChild(trHead);

        for (const key in roles) {  
            const deleteFunc = () => rolesFunctionality.deleteRole(
                () => { document.getElementById("tr" + roles[key]["ID"]).remove(); },
                () => { alert("התרחשה שגיאה במחיקת התפקיד"); },
                key);

                const editFunc = () => {
                    const datas = {
                        "roleIDForRole":roles[key]["ID"],
                        "roleValueForRole":roles[key]["value"]
                    };

                    const params = {
                        
                    };
    
                    dialogHandler.setDialog(null);
                    dialogHandler.setDialog("showNewUser", datas, key, params);
                };

            const tr = document.createElement("tr");
            tr.id = "tr" + roles[key]["ID"];
            const tdRoleID = document.createElement("td");
            const tdRoleName = document.createElement("td");
            tdRoleName.setAttribute("tagName", "relevant");
            const tdDots = document.createElement("td");
            tdRoleID.innerText = roles[key]["ID"];
            tdRoleName.innerText = roles[key]["value"];

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
            inputRequest.id="input" + roles[key]["ID"];
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

            tr.appendChild(tdRoleID);
            tr.appendChild(tdRoleName);
            tr.appendChild(tdDots);
            rolesTable.appendChild(tr);
            rolesArray.push(roles[key]["value"]);
        }

        autocomplete(document.getElementById("myRolesInput"), rolesArray);
    },
        () => { alert("התרחשה שגיאה בשליפת התפקידים האפשריים"); })
}