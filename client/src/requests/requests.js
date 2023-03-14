import axios from "axios";
import { SecurityFunctionality } from "../security/security";

const securityFunctionality = new SecurityFunctionality();

export class RequestsFunctionality {
    showRequests = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        const hostID = global.userID;
        await axios.post("http://localhost:8000/requests/getRequests")
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
    
    showRequestsByHostID = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        const hostID = global.userID;
        await axios.post("http://localhost:8000/requests/getRequestsByHostID", { hostID })
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    newRequest = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const ID = global.userID;
        const disclaimedPersonID = await securityFunctionality.getSecurityDisclaimerByID(() => {}, ID);

        if (JSON.stringify(disclaimedPersonID) !== "{}") {
            alert("האורח מנוע כניסה");
        }
        else {
            const visitorName = document.getElementById("visitorName").value;
            const visitorID = document.getElementById("visitorID").value;
            const visitorPhone = document.getElementById("visitorPhone").value;
            const hostID = document.getElementById("hostID").value;
            const hostName = document.getElementById("hostName").value;
            const hostPhone = document.getElementById("hostPhone").value;

            await axios.post("http://localhost:8000/requests/newRequest", {ID, visitorName, visitorID, visitorPhone, hostID, hostName, hostPhone })
                .then(res => {
                    if (res.status === 200)
                    {
                        alert(res.data);
                        hanldeSuccess();
                    } 
                })
                .catch(err=>{
                    handleFailure();
                })
                .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
        }        
    }

    deleteRequest = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post("http://localhost:8000/requests/deleteRequest", {key})
            .then(res => {
                if (res.status === 200)
                {
                    alert(res.data);
                    hanldeSuccess();
                } 
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    editRequest = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const ID = global.userID;
        const visitorName = document.getElementById("visitorName").value;
        const visitorID = document.getElementById("visitorID").value;
        const visitorPhone = document.getElementById("visitorPhone").value;
        const hostID = document.getElementById("hostID").value;
        const hostName = document.getElementById("hostName").value;
        const hostPhone = document.getElementById("hostPhone").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post("http://localhost:8000/requests/editRequest", {userID, visitorName, visitorID, visitorPhone, hostID, hostName, hostPhone, key })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                    hanldeSuccess();
                }
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}