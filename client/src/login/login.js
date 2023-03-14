import axios from "axios";
import { Roles } from "../common/roles";
import { apiURL } from "../../config";
import Joi from "joi";

export class LoginFunctionality {
    login = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        const ID = document.getElementById("inputLoginId").value;
        const password = document.getElementById("inputLoginPassword").value;
        await axios.post(`${apiURL}/first/login`, { ID, password })
            .then(res => {
                if (res.status === 200) hanldeSuccess(res.data);
            })
            .catch(err=>{
                console.log(err);
                handleFailure();
            }).finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }

    register = async (hanldeSuccess, handleFailure) => {
        const ID = document.getElementById("inputRegisterId").value;
        const fullName = document.getElementById("inputRegisterName").value;
        const phone = document.getElementById("inputRegisterPhone").value;
        const password = document.getElementById("inputRegisterPassword").value;
        const carNumber = document.getElementById("inputRegisterCarNumber").value;
        const leaveTime = document.getElementById("inputRegisterLeaveTime").value;
             
        const phoneValidation = Joi.string().pattern(/^\+972[0-9]{9}$/);
        const { error } = phoneValidation.validate(phone);
        
        if (error) {
            alert('מספר הטלפון חייב להיות בתבנית +972 ולאחר מכן 9 ספרות');

            return;
        }
        
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post(`${apiURL}/first/register`, { ID, fullName, phone, password, carNumber, leaveTime })
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