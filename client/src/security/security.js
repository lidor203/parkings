import axios from "axios";
import { apiURL } from "../../config";

export class SecurityFunctionality {
    showSecurity = async (hanldeSuccess, handleFailure) => {
        //document.getElementById('loader-circle').style.visibility = 'visible';
        
        await axios.post(`${apiURL}/security/getSecurity`)
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    getSecurityDisclaimerByID = async (ID) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        var securityDisclaimer = undefined;
        await axios.post(`${apiURL}/security/getSecurityDisclaimerByID`, { ID })
            .then(res => {
                if (res.status === 200) {
                    securityDisclaimer = (res.data);
                }
            })
            .catch(err => {})
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');

            return(securityDisclaimer);
    }

    newSecurity = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const IDToCreate = document.getElementById("securityIDForSecurity").value;
        const reasonToCreate = document.getElementById("securityReasonForSecurity").value;

        await axios.post(`${apiURL}/security/newSecurity`, { IDToCreate, reasonToCreate })
            .then(async res => {
                if (res.status === 200)
                {
                    alert(res.data);
                    await this.deleteRequest(IDToCreate);
                    hanldeSuccess();
                } 
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    editSecurity = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const disclaimedNameToUpadte = document.getElementById("securityNameForSecurity").value;
        const disclaimedReasonToUpdate = document.getElementById("securityReasonForSecurity").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post(`${apiURL}/security/editSecurity`, { disclaimedNameToUpadte, disclaimedReasonToUpdate, key})
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

    deleteRequest = async (visitorID) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post(`${apiURL}/requests/getRequestByVisitorID`, {visitorID})
        .then(async res => {
            if (res.status === 200) {
                if (JSON.stringify(res.data) !== "{}") {
                    const visitorRequestToDelete = res.data;
                    const key = Object.keys(visitorRequestToDelete)[0];
                
                    await axios.post(`${apiURL}/requests/deleteRequestByVisitorID`, { key })
                    .then(res => {
                        if (res.status === 200)
                        {
                            alert("למשתמש הייתה בקשת כניסה בפועל. הבקשה נמחקה בהצלחה!");
                        } 
                    })
                    .catch(err=>{
                    })
                    .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
                } 
            }
        })
        .catch(err=>{
        })
        .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    deleteSecurity = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post(`${apiURL}/security/deleteSecurity`, {key})
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