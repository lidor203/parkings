import axios from "axios";
import { SecurityFunctionality } from "../security/security";
import { apiURL } from "../../config";

const securityFunctionality = new SecurityFunctionality();

export class RequestsFunctionality {
    showRequests = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post(`${apiURL}/requests/getRequests`)
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
        await axios.post(`${apiURL}/requests/getRequestsByHostID`, { hostID })
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

        const requesterID = global.userID;
        const requesterName = global.userName;
        const visitorID = document.getElementById("visitorID").value;
        const disclaimedPersonID = await securityFunctionality.getSecurityDisclaimerByID(visitorID);

        if (JSON.stringify(disclaimedPersonID) !== "{}") {
            alert("בקשת הכניסה נשללה מכיוון שהאורח מנוע כניסה!");
        }
        else {
            await axios.post(`${apiURL}/requests/getRequestByVisitorID`, {visitorID})
            .then(async res => {
                if (JSON.stringify(res.data) !== "{}")
                {
                    alert("כבר קיימת בקשת כניסה עבור המשתמש!");
                    hanldeSuccess();
                } 
                else {
                    const visitorName = document.getElementById("visitorName").value;
                    const visitorPhone = document.getElementById("visitorPhone").value;
                    const hostID = document.getElementById("hostID").value;
                    const hostName = document.getElementById("hostName").value;
                    const hostPhone = document.getElementById("hostPhone").value;
        
                    await axios.post(`${apiURL}/requests/newRequest`, {requesterID, requesterName, visitorID, visitorName, visitorPhone, hostID, hostName, hostPhone })
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
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
        }        
    }

    deleteRequest = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post(`${apiURL}/requests/deleteRequest`, {key})
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

        const requesterID = global.userID;
        const requesterName = global.userName;
        const visitorName = document.getElementById("visitorName").value;
        const visitorID = document.getElementById("visitorID").value;
        const visitorPhone = document.getElementById("visitorPhone").value;
        const hostID = document.getElementById("hostID").value;
        const hostName = document.getElementById("hostName").value;
        const hostPhone = document.getElementById("hostPhone").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post(`${apiURL}/requests/editRequest`, {requesterID, requesterName, visitorID, visitorName, visitorPhone, hostID, hostName, hostPhone, key })
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

    editRequestByHostID = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const requesterID = global.userID;
        const requesterName = global.userName;
        const visitorName = document.getElementById("visitorNameByHostID").value;
        const visitorID = document.getElementById("visitorIDByHostID").value;
        const visitorPhone = document.getElementById("visitorPhoneByHostID").value;
        const hostID = document.getElementById("hostIDByHostID").value;
        const hostName = document.getElementById("hostNameByHostID").value;
        const hostPhone = document.getElementById("hostPhoneByHostID").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post(`${apiURL}/requests/editRequest`, {requesterID, requesterName, visitorID, visitorName, visitorPhone, hostID, hostName, hostPhone, key })
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