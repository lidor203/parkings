import axios from "axios";
import { apiURL } from "../../config";

export class UsersFunctionality {
    showUsers = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        await axios.post(`${apiURL}/users/getUsers`)
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err => {
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden');
    }

    showMyUser = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const ID = global.userID;
        await axios.post(`${apiURL}/users/getUserByID`, { ID })
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
        const userCarNumberToCreate = document.getElementById("userCarNumberForUsers").value;
        const userLeaveTimeToCreate = document.getElementById("userLeaveTimeForUsers").value;

        await axios.post(`${apiURL}/users/newUser`, { userIDToCreate, userNameToCreate, userPhoneToCreate, userTimeToAlertToCreate, userRoleToCreate, userCarNumberToCreate, userLeaveTimeToCreate })
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
        const userLeaveTimeToUpdate = document.getElementById("userLeaveTimeForUsers").value;
        const userTimeToAlertToUpdate = document.getElementById("userTimeToAlertForUsers").value;
        const userRoleToUpdate = document.getElementById("userRoleForUsers").value;
        const userCarNumberToUpdate = document.getElementById("userCarNumberForUsers").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post(`${apiURL}/users/editUser`, { userIDToUpdate, userNameToUpdate, userPhoneToUpdate,userLeaveTimeToUpdate, userTimeToAlertToUpdate, userRoleToUpdate, userCarNumberToUpdate, key })
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

    editMyUser = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const userIDToUpdate = document.getElementById("userIDForMyUser").value;
        const userNameToUpdate = document.getElementById("userNameForMyUser").value;
        const userPhoneToUpdate = document.getElementById("userPhoneForMyUser").value;
        const userLeaveTimeToUpdate = document.getElementById("userLeaveTimeForMyUser").value;
        const userTimeToAlertToUpdate = document.getElementById("userTimeToAlertForMyUser").value;
        const userRoleToUpdate = document.getElementById("userRoleForMyUser").value;
        const userCarNumberToUpdate = document.getElementById("userCarNumberForMyUser").value;
        const key = dialogHandler.keyToUpdate;

        await axios.post(`${apiURL}/users/editUser`, { userIDToUpdate, userNameToUpdate, userPhoneToUpdate, userLeaveTimeToUpdate, userTimeToAlertToUpdate, userRoleToUpdate, userCarNumberToUpdate, key })
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
        
        await axios.post(`${apiURL}/users/deleteUser`, { key })
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
        const res = await axios.post(`${apiURL}/users/getUserByCar`, { carNumber })
        if (res.status === 200) {
            hanldeSuccess(res.data);
        }
    
        document.getElementById('loader-circle').style.visibility = 'hidden';
    }

    getUserByID = async (handleFailure, ID) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        var user = undefined;
        await axios.post(`${apiURL}/users/getUserByID`, { ID })
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

        await axios.post(`${apiURL}/users/changeLeaveTime`, { userLeaveTime, key })
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
       
        await axios.post(`${apiURL}/jobs/getRolesDescriptions`)
            .then(res => {
                if (res.status === 200)
                {
                    const rolesDescriptions = res.data;
                    const inputElement = document.getElementById("userRoleForUsers");
                    const rolesElement = document.getElementById("rolesDatalistForUsers");
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