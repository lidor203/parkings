import axios from "axios";
import { UsersFunctionality } from "../users/users";

const usersFunctionality = new UsersFunctionality();

export class JobsFunctionality {
    showJobs = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post("http://localhost:8000/jobs/getJobs")
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    newJob = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userIDForJob = document.getElementById("userIDForJob").value;
        const user = await usersFunctionality.getUserByID(() => {}, userIDForJob);
        
        if (user === undefined) {
            alert("המשתמש אינו קיים ולכן לא ניתן להגדיר לו תפקיד");
        }
        else {
        const key = Object.keys(user)[0];
        const userRoleForJob = document.getElementById("userRoleForJob").value;

        await axios.post("http://localhost:8000/jobs/newJob", {key, userRoleForJob})
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

    editJob = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const roleToUpdate = document.getElementById("userRoleForJob").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post("http://localhost:8000/jobs/editJob", {roleToUpdate, key})
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

    deleteJob = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        await axios.post("http://localhost:8000/jobs/deleteJob", {key})
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
    
    getRolesDescriptions = async () => {
        document.getElementById('loader-circle').style.visibility = 'visible';
       
        await axios.post("http://localhost:8000/jobs/getRolesDescriptions")
            .then(res => {
                if (res.status === 200)
                {
                    const rolesDescriptions = res.data;
                    const rolesList = document.getElementById("rolesList");
                    const keys = Object.keys(rolesDescriptions);

                    for (let i = 0; i < keys.length; i++) {
                        const listOption = document.createElement("option");
                        listOption.value = rolesDescriptions[keys[i]]["value"];
                        rolesList.appendChild(listOption);
                    }
                } 
            })
            .catch(err=>{
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}