import { UsersFunctionality } from '../users/users';
import autocomplete from '../autocomplete/autocomplete';

const usersFunctionality = new UsersFunctionality();

export const showUsersFunction = async () => {
    await usersFunctionality.showUsers((users) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("usersTable").rows;
                let tdArray = [];
                let chosenInput = usersInput.value;
                
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
        let usersInput = document.getElementById("myUsersInput");
        usersInput.onkeyup = reduceTable;
        let usersTable = document.getElementById("usersTable");
        let usersArray = [];

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thID = document.createElement("th");
        const thName = document.createElement("th");
        const thPhone = document.createElement("th");
        const thTimeToAlert = document.createElement("th");
        const thRole = document.createElement("th");
        const thDots = document.createElement("th");
        thID.innerText = "מספר תעודה";
        thName.innerText = "שם המשתמש";
        thPhone.innerText = "מספר פלאפון";
        thTimeToAlert.innerText = "זמן התראה מראש";
        thRole.innerText = "תפקיד";
        thDots.innerText = "";
        thID.style="width:18%";
        thName.style = "width:18%";
        thPhone.style = "width:18%";
        thTimeToAlert.style = "width:18%";
        thRole.style = "width:18%";
        thDots.style = "width:5%";
        trHead.appendChild(thID);
        trHead.appendChild(thName);
        trHead.appendChild(thPhone);
        trHead.appendChild(thTimeToAlert);
        trHead.appendChild(thRole);
        trHead.appendChild(thDots);
        usersTable.appendChild(trHead);

        for (const key in users) {  
            const deleteFunc = () => usersFunctionality.deleteUser(
                () => {document.getElementById("tr" + users[key]["ID"]).remove(); },
                () => { alert("התרחשה שגיאה במחיקת המשתמש"); },
                key);

                const editFunc = () => {
                    const datas = {
                        "userIDForUsers":users[key]["ID"],
                        "userNameForUsers":users[key]["name"],
                        "userPhoneForUsers":users[key]["phone"],
                        "userTimeToAlertForUsers":users[key]["timeToAlert"],
                        "userRoleForUsers":users[key]["role"]
                    };

                    dialogHandler.setDialog(null);
                    dialogHandler.setDialog("showNewUser", datas, key);
                };

            const tr = document.createElement("tr");
            tr.id = "tr" + users[key]["ID"];
            const tdID = document.createElement("td");
            tdID.setAttribute("tagName", "relevant");
            const tdName = document.createElement("td");
            tdName.setAttribute("tagName", "relevant");
            const tdPhone = document.createElement("td");
            const tdTimeToAlert = document.createElement("td");
            const tdRole = document.createElement("td");
            const tdDots = document.createElement("td");
            tdID.innerText = users[key]["ID"];
            tdName.innerText = users[key]["name"];
            tdPhone.innerText = users[key]["phone"];
            tdTimeToAlert.innerText = users[key]["timeToAlert"];
            tdRole.innerText = users[key]["role"];

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
            inputRequest.id="input" + users[key]["ID"];
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

            tr.appendChild(tdID);
            tr.appendChild(tdName);
            tr.appendChild(tdPhone);
            tr.appendChild(tdTimeToAlert);
            tr.appendChild(tdRole);
            tr.appendChild(tdDots);
            usersTable.appendChild(tr);
            usersArray.push(users[key]["ID"]);
            usersArray.push(users[key]["name"]);
        }

        autocomplete(document.getElementById("myUsersInput"), usersArray);
    },
        () => { alert("התרחשה שגיאה בשליפת המשתמשים"); })
}