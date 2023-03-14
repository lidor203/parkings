import { BamFunctionality } from '../bam/bam';

const bamFunctionality = new BamFunctionality();

export const showBamFunction = async () => {
    await bamFunctionality.showBam((bam) => {
        const reduceTable = (e) => {
            if ((e.key === "Enter") || (e.key === "Backspace")) {
                let trArray = document.getElementById("bamTable").rows;
                let tdArray = [];
                let chosenInput = bamInput.value;

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
        let bamInput = document.getElementById("myBamInput");
        bamInput.onkeyup = reduceTable;
        let bamTable = document.getElementById("bamTable");
        let bamArray = [];

        const trHead = document.createElement("tr");
        trHead.className = "header";
        const thUserID = document.createElement("th");
        const thUserName = document.createElement("th");
        const thBamStatus = document.createElement("th");
        const thDots = document.createElement("th");
        const thValidDate = document.createElement("th"); 
        thUserID.innerText = "מזהה משתמש";
        thUserName.innerText = "שם משתמש";
        thBamStatus.innerText = "סיווג";
        thValidDate.innerHTML = "תאריך תפוגה";
        thDots.innerText = "";
        thUserID.style="width:20%";
        thUserName.style = "width:20%";
        thBamStatus.style="width:20%";
        thValidDate.style="width:20%";
        thDots.style = "width:5%";
        trHead.appendChild(thUserID);
        trHead.appendChild(thUserName);
        trHead.appendChild(thBamStatus);
        trHead.appendChild(thValidDate);
        trHead.appendChild(thDots);
        bamTable.appendChild(trHead);

        for (const key in bam) {
            const deleteFunc = () => bamFunctionality.deleteBam(
                () => { document.getElementById("tr" + bam[key]["ID"]).remove(); },
                () => { alert("התרחשה שגיאה במחיקת הסיווג"); },
                key);

                const editFunc = () => {
                    const datas = {
                        "userIDForBam":bam[key]["ID"],
                        "userNameForBam":bam[key]["name"],
                        "userStatusForBam":bam[key]["bamStatus"],
                        "userValidDateForBam":bam[key]["validDate"]
                    };

                    dialogHandler.setDialog(null);
                    dialogHandler.setDialog("showNewBam", datas, key);
                };

            const tr = document.createElement("tr");
            tr.id = "tr" + bam[key]["ID"];
            const tdUserID = document.createElement("td");
            tdUserID.setAttribute("tagName", "relevant");
            const tdUserName = document.createElement("td");
            tdUserName.setAttribute("tagName", "relevant");
            const tdBamStatus = document.createElement("td");   
            const tdValidDate = document.createElement("td");          
            const tdDots = document.createElement("td");
            tdUserID.innerText = bam[key]["ID"];           
            tdUserName.innerText = bam[key]["name"];
            tdBamStatus.innerText = bam[key]["bamStatus"];
            tdValidDate.innerText = bam[key]["validDate"];

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
            inputRequest.id="input" + bam[key]["ID"];
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
            tr.appendChild(tdBamStatus);
            tr.appendChild(tdValidDate);
            tr.appendChild(tdDots);
            bamTable.appendChild(tr);
            bamArray.push(bam[key]["ID"]);
            bamArray.push(bam[key]["name"]);
        }

        autocomplete(document.getElementById("myBamInput"), bamArray);
    },
        () => { alert("התרחשה שגיאה בשליפת סיווג המשתמשים"); })
}