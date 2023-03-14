import { UsersFunctionality } from './users';

const usersFunctionality = new UsersFunctionality();

export const showNewUserFunction = () => {
    document.getElementById("showNewUserSubmitButton").onclick = () => {
        if (document.getElementById("userIDForUsers").value === "" ||
            document.getElementById("userNameForUsers").value === "" ||
            document.getElementById("userPhoneForUsers").value === "" ||
            document.getElementById("userRoleForUsers").value === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            if (dialogHandler.keyToUpdate)
            {
                usersFunctionality.editUser((request) => {    
                    document.getElementById("showNewUserCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון המשתמש"); });
            }
            else
            {
                usersFunctionality.newUser((request) => {    
                    document.getElementById("showNewUserCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
            }
        }
    };
}