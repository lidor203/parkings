import axios from "axios";

export class SecurityFunctionality {
    showSecurity = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        await axios.post("http://localhost:8000/security/getSecurity")
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
        await axios.post("http://localhost:8000/security/getSecurityDisclaimerByID", { ID })
            .then(res => {
                if (res.status === 200) {
                    securityDisclaimer = (res.data);
                }
            })
            .catch(err => {
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');

            return(securityDisclaimer);
    }

    newSecurity = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const IDToCreate = document.getElementById("securityIDForSecurity").value;
        const reasonToCreate = document.getElementById("securityReasonForSecurity").value;

        await axios.post("http://localhost:8000/security/newSecurity", { IDToCreate, reasonToCreate })
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

        const reasonToUpdate = document.getElementById("securityReasonForSecurity").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post("http://localhost:8000/security/editSecurity", { reasonToUpdate, key})
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

        await axios.post("http://localhost:8000/requests/getRequestByVisitorID", {visitorID})
        .then(async res => {
            if (res.status === 200) {
                if (JSON.stringify(res.data) !== "{}") {
                    const visitorRequestToDelete = res.data;
                    const key = Object.keys(visitorRequestToDelete)[0];
                
                    alert(key);
                    await axios.post("http://localhost:8000/requests/deleteRequestByVisitorID", { key })
                    .then(res => {
                        if (res.status === 200)
                        {
                            alert(res.data);
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
        await axios.post("http://localhost:8000/security/deleteSecurity", {key})
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