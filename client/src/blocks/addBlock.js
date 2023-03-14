import { BlocksFunctionality } from './blocks';

const blocksFunctionality = new BlocksFunctionality();

export const showNewBlockFunction = () => {
    document.getElementById("showNewBlockSubmitButton").onclick = () => {
        if (dialogHandler.keyToUpdate)
        {
            blocksFunctionality.editBlock((request) => {    
                document.getElementById("showNewBlockCloseButton").click();
            },
            () => { alert("התרחשה שגיאה בעדכון הבקשה"); });
        }
        else
        {
            blocksFunctionality.newBlock((request) => {    
                document.getElementById("showNewBlockCloseButton").click();
            },
            () => { alert("התרחשה שגיאה בשמירת הבקשה"); });
        }
    };
}