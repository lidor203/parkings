import axios from "axios";

export class UsersFunctionality {
    showUsers = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        await axios.post("http://localhost:8000/users/getUsers")
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    newUser = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userIDToCreate = document.getElementById("userIDForUsers").value;
        const userNameToCreate = document.getElementById("userNameForUsers").value;
        const userPhoneToCreate = document.getElementById("userPhoneForUsers").value;
        const userTimeToAlertToCreate = document.getElementById("userTimeToAlertForUsers").value;
        const userRoleToCreate = document.getElementById("userRoleForUsers").value;
        const userCarNumberToCreate = "";
        const userLeaveTimeCreate = "";
        const userPasswordToCreate = "1";

        await axios.post("http://localhost:8000/users/newUser", { userIDToCreate, userNameToCreate, userPhoneToCreate, userTimeToAlertToCreate, userRoleToCreate, userCarNumberToCreate, userLeaveTimeCreate, userPasswordToCreate })
        .then(res => {
            if (res.status === 200) {
                alert(res.data);
                hanldeSuccess();
            }
        })
        .catch(err => {
            handleFailure();
        })
        .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    editUser = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userIDToUpdate = document.getElementById("userIDForUsers").value;
        const userNameToUpdate = document.getElementById("userNameForUsers").value;
        const userPhoneToUpdate = document.getElementById("userPhoneForUsers").value;
        const userTimeToAlertToUpdate = document.getElementById("userTimeToAlertForUsers").value;
        const userRoleToUpdate = document.getElementById("userRoleForUsers").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post("http://localhost:8000/users/editUser", { userIDToUpdate, userNameToUpdate, userPhoneToUpdate, userTimeToAlertToUpdate, userRoleToUpdate, key })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                    hanldeSuccess();
                }
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    deleteUser = async (hanldeSuccess, handleFailure, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post("http://localhost:8000/users/deleteUser", { key })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                    hanldeSuccess();
                }
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    getUserByCar = async (hanldeSuccess, handleFailure, carNumber) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post("http://localhost:8000/users/getUserByCar", { carNumber })
            .then(res => {
                if (res.status === 200) {
                    hanldeSuccess(res.data);
                }
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    getUserByID = async (handleFailure, ID) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        var user = undefined;
        await axios.post("http://localhost:8000/users/getUserByID", { ID })
            .then(res => {
                if (res.status === 200) {
                    user = (res.data);
                }
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');

            return(user);
    }

    changeLeaveTime = async (userLeaveTime, key) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        await axios.post("http://localhost:8000/users/changeLeaveTime", { userLeaveTime, key })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                }
            })
            .catch(err => {
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
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