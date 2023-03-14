import { SecurityFunctionality } from './security';

const securityFunctionality = new SecurityFunctionality();

export const showNewSecurityFunction = () => {
    document.getElementById("securityIDForSecurity").onkeyup = async (e) => {
            if (e.key === "Enter") {
                const securityDisclaimerID = document.getElementById("securityIDForSecurity").value;
                const securityDisclaimer = await securityFunctionality.getSecurityDisclaimerByID(securityDisclaimerID);
        
                if (JSON.stringify(securityDisclaimer) === "{}") {
                    alert("אין משתמש מנוע כניסה עם תעודה זו");
                }
                else {
                    const key = Object.keys(securityDisclaimer)[0];
                    dialogHandler.keyToUpdate = key;
                    document.getElementById("securityReasonForSecurity").value = securityDisclaimer[key]["reason"];
                }
        }
    };
    
    document.getElementById("showNewSecuritySubmitButton").onclick = async () => {
        if (document.getElementById("securityIDForSecurity").value === "" ||
            document.getElementById("securityReasonForSecurity").value === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            const securityIDForSecurity = document.getElementById("securityIDForSecurity").value;
            const securityDisclaimer = await securityFunctionality.getSecurityDisclaimerByID(securityIDForSecurity);
    
            if (dialogHandler.keyToUpdate)
            {
                securityFunctionality.editSecurity((request) => {    
                    document.getElementById("showNewSecurityCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון הערת האבטחה"); });
            }
            else
            {
                securityFunctionality.newSecurity((request) => {    
                    document.getElementById("showNewSecurityCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
            }
        }        
    };
}