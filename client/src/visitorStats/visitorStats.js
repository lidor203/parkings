import axios from "axios";
import { apiURL } from "../../config";

export class VisitorStatsFunctionality {
    showVisitorStats = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post(`${apiURL}/visitorStats/getVisitorStats`)
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}