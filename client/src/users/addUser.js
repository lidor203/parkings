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

export const showNewMyUserFunction = () => {
    document.getElementById("showNewMyUserSubmitButton").onclick = () => {
        if (document.getElementById("userIDForMyUser").value === "" ||
            document.getElementById("userNameForMyUser").value === "" ||
            document.getElementById("userPhoneForMyUser").value === "" ||
            document.getElementById("userRoleForMyUser").value === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            if (dialogHandler.keyToUpdate)
            {
                usersFunctionality.editMyUser((request) => {    
                    document.getElementById("showNewMyUserCloseButton").click();
                },
                () => { alert("התרחשה שגיאה בעדכון המשתמש"); });
            }
            else
            {
                alert("התרחשה שגיאה בשמירת הבקשה");  
                document.getElementById("showNewMyUserCloseButton").click();
            }
        }
    };
}