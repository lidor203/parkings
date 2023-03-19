import axios from "axios";
import { apiURL } from "../../config";

export class BlocksFunctionality {
    showBlocks = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const res = await axios.post(`${apiURL}/blocks/getBlocks`)
        
        if (res.status === 200){
            const blockerMap = new Map();
            const blockedMap = new Map();

            for (const key in res.data) { 
                blockerMap.set(res.data[key]["blockerCarNumber"], []);
                blockedMap.set(res.data[key]["blockedCarNumber"], []);
            }

            for (const key in res.data) {              
                blockerMap.get(res.data[key]["blockerCarNumber"]).push(res.data[key]["blockedCarNumber"]);
                blockedMap.get(res.data[key]["blockedCarNumber"]).push(res.data[key]["blockerCarNumber"]);
            }

            await hanldeSuccess(blockerMap, blockedMap);
        }

        document.getElementById('loader-circle').style.visibility = 'hidden';
    }

    newBlock = async (hanldeSuccess, handleFailure) => {
        let blockerCarNumber = document.getElementById("blockerCarNumber").value;
        let blockedCarNumber = document.getElementById("blockedCarNumber").value;
        let messege = "";
        let additionalMessege = "\n החסימה נוצרה בהצלחה!";
        
        if (blockerCarNumber === "" || blockedCarNumber === "") {
            alert("כל שדות החובה חייבים להיות מלאים על מנת לבצע את הבקשה");
        }
        else if (blockerCarNumber === blockedCarNumber) {
            alert("רכב לא יכול לחסום את עצמו");
        }
        else {
            document.getElementById('loader-circle').style.visibility = 'visible';

            await axios.post(`${apiURL}/blocks/getBlocks`)
            .then(async res => {
                const blockerMap = new Map();

                for (const key in res.data) { 
                    blockerMap.set(res.data[key]["blockerCarNumber"], []);
                }

                for (const key in res.data) {              
                    blockerMap.get(res.data[key]["blockerCarNumber"]).push(res.data[key]["blockedCarNumber"]);
                }              
                
                await axios.post(`${apiURL}/blocks/newBlock`, {blockerCarNumber, blockedCarNumber})
                .then(async res => {
                    messege = res.data + "\n";

                    const blockedCars = blockerMap.get(blockedCarNumber);
                    blockedCarNumber = undefined;

                    if (blockedCars !== undefined) {
                        blockedCarNumber = blockedCars.pop();
                        additionalMessege = "\n החסימות נוצרו בהצלחה!";
                    }

                    while (blockedCarNumber !== undefined) {
                        await axios.post(`${apiURL}/blocks/newBlock`, {blockerCarNumber, blockedCarNumber})
                        .then(async res => {
                            messege = messege + res.data + "\n";
                        })
                        .catch(() => { alert("משהו השתבש בשמירת החסימה. נסה שוב"); })
                        .finally();

                        blockedCarNumber = blockedCars.pop();
                    }

                    messege = messege + additionalMessege;

                    if (res.status === 200)
                    {
                        alert(messege);
                    }
                    
                    hanldeSuccess();
                })
                .catch(() => { alert("משהו השתבש בשמירת החסימה. נסה שוב"); })
                .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
            })
            .catch(() => { alert("משהו השתבש בשמירת החסימה. נסה שוב"); })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
        }
    }
}