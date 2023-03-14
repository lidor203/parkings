import { BamFunctionality } from './bam';

const bamFunctionality = new BamFunctionality();

export const showNewBamFunction = () => {
    document.getElementById("userIDForBam").onkeyup = async (e) => {
            if (e.key === "Enter") {
                const userIDForBam = document.getElementById("userIDForBam").value;
                const user = await bamFunctionality.getUserBamByID(() => {}, userIDForBam);
        
                if (JSON.stringify(user) === "{}") {
                    alert("אין משתמש עם תעודה זו");
                }
                else {
                    const key = Object.keys(user)[0];
                    dialogHandler.keyToUpdate = key;
                    document.getElementById("userNameForBam").value = user[key]["name"];
                    document.getElementById("userStatusForBam").value = user[key]["bamStatus"];
                    document.getElementById("userValidDateForBam").value = user[key]["validDate"];
                }
        }
    };

    document.getElementById("showNewBamSubmitButton").onclick = async () => {
        if (document.getElementById("userIDForBam").value === "" ||
            document.getElementById("userStatusForBam").value === "" ||
            document.getElementById("userValidDateForBam").value === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else {
            const userIDForBam = document.getElementById("userIDForBam").value;
            const user = await bamFunctionality.getUserBamByID(() => {}, userIDForBam);

            if (JSON.stringify(user) === "{}") {
                alert("אין משתמש עם תעודה זו");
            }
            else {
                if (dialogHandler.keyToUpdate)
                {
                    bamFunctionality.editBam((request) => {    
                        document.getElementById("showNewBamCloseButton").click();
                    },
                    () => { alert("התרחשה שגיאה בעדכון הבקשה"); });
                }
                else
                {
                    bamFunctionality.newBam((request) => {    
                        document.getElementById("showNewBamCloseButton").click();
                    },
                    () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
                }
            } 

        }
    };
}