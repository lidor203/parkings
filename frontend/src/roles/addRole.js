import { RolesFunctionality } from './roles';

const rolesFunctionality = new RolesFunctionality();

export const showNewRoleFunction = () => {
    document.getElementById("showNewRoleSubmitButton").onclick = () => {
        if (document.getElementById("roleIDForRole").value === "") {
        alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            if (dialogHandler.keyToUpdate)
            {
                rolesFunctionality.editRole((request) => {    
                    document.getElementById("showNewRoleCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון התפקיד"); });
            }
            else
            {
                rolesFunctionality.newRole((request) => {    
                    document.getElementById("showNewRoleCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
            }
        }
    };
}