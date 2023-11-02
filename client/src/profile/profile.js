import { Roles } from '../common/roles'
import { actions } from '../common/actions'
import { DialogHandler } from '../dialogs/DialogHandler';
import { UsersFunctionality } from '../users/users';

const usersFunctionality = new UsersFunctionality();

export class Profile {   
    getUserActions = () => {
        if (global.userRole === Roles.Visitor) {
            return actions.filter(action =>
                action.role == Roles.Visitor);
        }
        else {
            usersFunctionality.getRolesDescriptions();
            return actions.filter(action =>
                action.role == global.userRole || 
                action.role == Roles.Visitor ||
                action.role == Roles.Simple ||
                action.role == Roles.Approver || 
                action.role == Roles.Security //|| 
                ////action.role == Roles.Bam
        );}
    }

    createAction({ desc, dialogId }) {
        var action = document.createElement("div");
        action.className = "dialogOpener";
        action.id = dialogId + "Button";
        action.innerText = desc;
        return action;
    }

    constructor(user) {
        for (const key in user) {  
            global.userID = user[key]["ID"];
            global.userName = user[key]["name"];
            global.userCarNumber = user[key]["carNumber"];
            global.userPhone = user[key]["phone"];
            global.userRole = user[key]["role"];
            global.userLeaveTime = user[key]["leaveTime"];
            global.userTimeToAlert = user[key]["timeToAlert"];
            global.userKey = key;
        }

        document.getElementById("name").innerText = "שם: " + global.userName + "\n תפקיד: " + global.userRole;

        const actionsElement = document.getElementById("actions");
        const permittedActions = this.getUserActions();

        actionsElement.textContent = '';
        permittedActions.forEach(action => {
            actionsElement.appendChild(this.createAction(action));
        });

        global.dialogHandler = new DialogHandler(permittedActions);
    }
}