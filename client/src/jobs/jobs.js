import axios from "axios";
import { UsersFunctionality } from "../users/users";
import { apiURL } from "../../config";

const usersFunctionality = new UsersFunctionality();

export class JobsFunctionality {
    showJobs = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post(`${apiURL}/jobs/getJobs`)
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

        await axios.post(`${apiURL}/jobs/newJob`, {key, userRoleForJob})
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

        await axios.post(`${apiURL}/jobs/editJob`, {roleToUpdate, key})
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
        
        await axios.post(`${apiURL}/jobs/deleteJob`, {key})
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
       
        await axios.post(`${apiURL}/jobs/getRolesDescriptions`)
            .then(res => {
                if (res.status === 200)
                {
                    const rolesDescriptions = res.data;
                    const inputElement = document.getElementById("userRoleForUsers");
                    const rolesElement = document.getElementById("rolesDatalistForJob");
                    const roles = Object.values(rolesDescriptions);

                    inputElement.addEventListener('focus', () => {
                        rolesElement.classList.remove('hidden');
                    });

                    document.addEventListener('click', (event) => {
                        if (!event.composedPath().includes(inputElement.parentElement)) {
                            rolesElement.classList.add('hidden');
                        }
                    });

                    const selectOption = (event) => {
                        inputElement.value = event.target.textContent;
                        rolesElement.classList.add('hidden');
                    };

                    const roleElements = roles.map(role => {
                        const listOption = document.createElement("div");
                        listOption.className = 'role';
                        listOption.textContent = role["value"];
                        listOption.addEventListener('click', selectOption);

                        return listOption;
                    });

                    rolesElement.textContent = '';
                    rolesElement.append(...roleElements);
                } 
            })
            .catch(err=>{
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}