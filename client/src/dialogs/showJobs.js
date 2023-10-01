import { JobsFunctionality } from '../jobs/jobs';
import autocomplete from '../autocomplete/autocomplete';

const jobsFunctionality = new JobsFunctionality();

export const showJobsFunction = async () => {
    await jobsFunctionality.showJobs((jobs) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("jobsTable").rows;
                let tdArray = [];
                let chosenInput = jobsInput.value;
                
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
        let jobsTable = document.getElementById("jobsTable");
        let jobsArray = [];
        let jobsInput = document.getElementById("myJobsInput");
        jobsInput.onkeyup = reduceTable;

        const trHead = document.createElement("tr");
        trHead.className="header";
        const thUserID = document.createElement("th");
        const thUserName = document.createElement("th");
        const thRoleID = document.createElement("th");
        const thDots = document.createElement("th");
        thUserID.innerText = "מזהה משתמש";
        thUserName.innerText = "שם משתמש";
        thRoleID.innerText = "מזהה תפקיד";
        thDots.innerText = "";
        
        trHead.appendChild(thUserID);
        trHead.appendChild(thUserName);
        trHead.appendChild(thRoleID);
        trHead.appendChild(thDots);
        jobsTable.appendChild(trHead);

        if (JSON.stringify(jobs) === "{}") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", 4);
            td.innerText = "אין תפקידנים";
            tr.appendChild(td);
            jobsTable.appendChild(tr);
        }
        else {
            for (const key in jobs) {  
                const deleteFunc = () => jobsFunctionality.deleteJob(
                    () => { document.getElementById("tr" + jobs[key]["ID"]).remove(); },
                    () => { alert("התרחשה שגיאה במחיקת התפקידן"); },
                    key);

                    const editFunc = () => {
                        const datas = {
                            "userIDForJob":jobs[key]["ID"],
                            "userNameForJob":jobs[key]["name"],
                            "userPhoneForJob":jobs[key]["phone"],
                            "userRoleForJob":jobs[key]["role"]
                        };

                        const params = {
                            
                        };
        
                        dialogHandler.setDialog(null);
                        dialogHandler.setDialog("showNewUser", datas, key, params);
                    };

                const tr = document.createElement("tr");
                tr.id = "tr" + jobs[key]["ID"];
                const tdUserID = document.createElement("td");
                tdUserID.setAttribute("tagName", "relevant");
                const tdUserName = document.createElement("td");
                tdUserName.setAttribute("tagName", "relevant");
                const tdRoleID = document.createElement("td");           
                const tdDots = document.createElement("td");
                tdUserID.innerText = jobs[key]["ID"];           
                tdUserName.innerText = jobs[key]["name"];
                tdRoleID.innerText = jobs[key]["role"];

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
                inputRequest.id="input" + jobs[key]["ID"];
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
                
                tr.appendChild(tdUserID);
                tr.appendChild(tdUserName);
                tr.appendChild(tdRoleID);
                tr.appendChild(tdDots);
                jobsTable.appendChild(tr);
                jobsArray.push(jobs[key]["ID"]);
                jobsArray.push(jobs[key]["name"]);
            }
        }

        autocomplete(document.getElementById("myJobsInput"), jobsArray);
    },
        () => { alert("התרחשה שגיאה בשליפת בעלי התפקידים"); })
}