import { RequestsFunctionality } from './requests';

const requestFunctionality = new RequestsFunctionality();

export const showNewRequestFunction = () => {
    document.getElementById("showNewRequestSubmitButton").onclick = () => {
        if (document.getElementById("visitorName").value === "" ||
        document.getElementById("visitorID").value === "" ||
        document.getElementById("visitorPhone").value === "" ||
        document.getElementById("hostID").value === "" ||
        document.getElementById("hostName").value === "" ||
        document.getElementById("hostPhone").value === "") {
        alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            if (dialogHandler.keyToUpdate)
            {
                requestFunctionality.editRequest((request) => {    
                    document.getElementById("showNewRequestCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון הבקשה"); });
            }
            else
            {
                requestFunctionality.newRequest((request) => {    
                    document.getElementById("showNewRequestCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
            }
        }
    };
}

export const showNewRequestByHostIDFunction = () => {
    document.getElementById("showNewRequestByHostIDSubmitButton").onclick = () => {
        if (document.getElementById("visitorNameByHostID").value === "" ||
        document.getElementById("visitorIDByHostID").value === "" ||
        document.getElementById("visitorPhoneByHostID").value === "" ||
        document.getElementById("hostIDByHostID").value === "" ||
        document.getElementById("hostNameByHostID").value === "" ||
        document.getElementById("hostPhoneByHostID").value === "") {
        alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            if (dialogHandler.keyToUpdate)
            {
                requestFunctionality.editRequestByHostID((request) => {    
                    document.getElementById("showNewRequestByHostIDCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון הבקשה"); });
            }
            else
            {
                requestFunctionality.newRequest((request) => {    
                    document.getElementById("showNewRequestByHostIDCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
            }
        }
    };
}