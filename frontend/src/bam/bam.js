import axios from "axios";

export class BamFunctionality {
    showBam = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post("http://localhost:8000/bam/getBam")
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    getUserBamByID = async (handleFailure, ID) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        var userBam = undefined;
        await axios.post("http://localhost:8000/bam/getUserBamByID", { ID })
            .then(res => {
                if (res.status === 200) {
                    userBam = (res.data);
                }
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');

            return(userBam);
    }

    newBam = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userIDForBam = document.getElementById("userIDForBam").value;
        const userNameForBam = document.getElementById("userNameForBam").value;
        const userStatusForBam = document.getElementById("userStatusForBam").value;
        const userValidDateForBam = document.getElementById("userValidDateForBam").value;

        await axios.post("http://localhost:8000/bam/newBam", {userIDForBam, userNameForBam, userStatusForBam, userValidDateForBam})
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

    editBam = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userStatusForBam = document.getElementById("userStatusForBam").value;
        const userValidDateForBam = document.getElementById("userValidDateForBam").value;
        
        const key = dialogHandler.keyToUpdate;

        await axios.post("http://localhost:8000/bam/editBam", {userStatusForBam, userValidDateForBam, key})
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

    deleteBam = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post("http://localhost:8000/bam/deleteBam", {key})
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