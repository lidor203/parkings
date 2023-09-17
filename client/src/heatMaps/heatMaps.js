import axios from "axios";
import { apiURL } from "../../config";

export class HeatMapsFunctionality {
    showHeatMap = async (hanldeSuccess, _handleFailure) => {
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
}