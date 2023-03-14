import { JobsFunctionality } from './jobs';
import { UsersFunctionality } from "../users/users";

const usersFunctionality = new UsersFunctionality();
const jobsFunctionality = new JobsFunctionality();

export const showNewJobFunction = () => {
    document.getElementById("userIDForJob").onkeyup = async (e) => {
            if (e.key === "Enter") {
                const userIDForJob = document.getElementById("userIDForJob").value;
                const user = await usersFunctionality.getUserByID(() => {}, userIDForJob);

                if (JSON.stringify(user) === "{}") {
                    alert("אין משתמש עם תעודה זו");
                }
                else {
                    const key = Object.keys(user)[0];
                    document.getElementById("userNameForJob").value = user[key]["name"];
                    document.getElementById("userPhoneForJob").value = user[key]["phone"];
                    document.getElementById("userRoleForJob").value = user[key]["role"];
                }
        }
    };

    document.getElementById("showNewJobSubmitButton").onclick = async () => {
        if (document.getElementById("userIDForJob").value === "" ||
            document.getElementById("userRoleForJob").value === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            const userIDForJob = document.getElementById("userIDForJob").value;
            const user = await usersFunctionality.getUserByID(() => {}, userIDForJob);

            if (JSON.stringify(user) === "{}") {
                alert("אין משתמש עם תעודה זו");
            }
            else {
                if (dialogHandler.keyToUpdate)
                {
                    jobsFunctionality.editJob((request) => {    
                        document.getElementById("showNewJobCloseButton").click();
                    },
                    () => { alert("התרחשה שגיאה בעדכון הבקשה"); });
                }
                else
                {
                    jobsFunctionality.newJob((request) => {    
                        document.getElementById("showNewJobCloseButton").click();
                    },
                    () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
                }
            }
        }
    };
}