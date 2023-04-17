import axios from "axios";
import { Roles } from "../common/roles";
import { apiURL } from "../../config";
import  Joi  from "joi";

export class LoginFunctionality {
    login = async (hanldeSuccess, handleFailure) => {
        document.getElementById('loader-circle').style.visibility = 'visible';
        
        const ID = document.getElementById("inputLoginId").value;
        await axios.post(`${apiURL}/first/login`, { ID })
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
        const carNumber = document.getElementById("inputRegisterCarNumber").value;
        const leaveTime = document.getElementById("inputRegisterLeaveTime").value;
        const timeToAlert = document.getElementById("inputRegisterTimeToAlert").value;
             
        const IDValidation = Joi.string().pattern(/^[0-9]{9}$/);
        const phoneValidation = Joi.string().pattern(/^\+972[0-9]{9}$/);

        let error = IDValidation.validate(ID);
        
        if (error["error"]) {
            console.log(error)
            alert('תעודת הזהות חייבת להיות בתבנית של 9 ספרות');
            return;
        }

        error = phoneValidation.validate(phone);

        if (error["error"]) {
            console.log(error)
            alert('מספר הטלפון חייב להיות בתבנית +972 ולאחר מכן 9 ספרות');
            return;
        }
        
        document.getElementById('loader-circle').style.visibility = 'visible';
        await axios.post(`${apiURL}/first/register`, { ID, fullName, phone, carNumber, leaveTime, timeToAlert })
            .then(res => {
                if (res.status === 200) {
                    alert(res.data);
                    const user = JSON.parse(`{"key":{"ID":\"${ID}\", "name":\"${fullName}\", "phone":\"${phone}\", "carNumber":\"${carNumber}\", "leaveTime":\"${leaveTime}\", "role":\"${Roles.Visitor}\", "timeToAlert":\"${timeToAlert}\"}}`);
                    hanldeSuccess(user);
                }
            })
            .catch(err=>{
                handleFailure();
            })
            .finally(() => document.getElementById('loader-circle').style.visibility = 'hidden' );
    }
}