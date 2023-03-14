import axios from "axios";
import { Roles } from "../common/roles";

export class LoginFunctionality {
    login = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        const ID = document.getElementById("inputLoginId").value;
        const password = document.getElementById("inputLoginPassword").value;
        await axios.post("http://localhost:8000/first/login", { ID, password })
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                console.log(err);
                handleFailure();
            }).finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    register = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';

        const ID = document.getElementById("inputRegisterId").value;
        const fullName = document.getElementById("inputRegisterName").value;
        const phone = document.getElementById("inputRegisterPhone").value;
        const password = document.getElementById("inputRegisterPassword").value;
        const carNumber = document.getElementById("inputRegisterCarNumber").value;
        const leaveTime = document.getElementById("inputRegisterLeaveTime").value;
              
        await axios.post("http://localhost:8000/first/register", { ID, fullName, phone, password, carNumber, leaveTime })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                    const user = JSON.parse(`{"key":{"ID":\"${ID}\", "name":\"${fullName}\", "phone":\"${phone}\", "password":\"${password}\", "carNumber":\"${carNumber}\", "leaveTime":\"${leaveTime}\", "role":\"${Roles.Visitor}\"}}`);
                    hanldeSuccess(user);
                }
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}