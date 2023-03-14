import { showUsersFunction } from './showUsers';
import { showRequestsFunction } from './showRequests';
import { showRequestsByHostIDFunction } from './showRequestsByHostID';
import { showRolesFunction } from './showRoles';
import { showJobsFunction } from './showJobs';
import { showBamFunction } from './showBam';
import { showSecurityFunction } from './showSecurity';
import { showBlocksFunction } from './showBlocks';
import { showNewRequestFunction } from '../requests/addRequest';
import { showNewJobFunction } from '../jobs/addJob';
import { showNewBamFunction } from '../bam/addBam';
import { showNewRoleFunction } from '../roles/addRole';
import { showNewSecurityFunction } from '../security/addSecurity';
import { showNewUserFunction } from '../users/addUser';
import { showNewBlockFunction } from '../blocks/addBlock';

let checkBoxButton = null;

const buttonPressed = e => {
    if (e.target.className === "toggler"){
        if (checkBoxButton && checkBoxButton.id !== e.target.id){
            checkBoxButton.checked = false;
        }

        checkBoxButton = e.target;
    }
    else if (checkBoxButton && e.target.id !== checkBoxButton.id && e.target.className !== "ul" && e.target.className !== "menu"){
            checkBoxButton.checked = false;
    }
  }

addEventListener('click', buttonPressed);

const showUsers = showUsersFunction;
const showRequests = showRequestsFunction;
const showRequestsByHostID = showRequestsByHostIDFunction;
const showRoles = showRolesFunction;
const showJobs = showJobsFunction;
const showBam = showBamFunction;
const showSecurity = showSecurityFunction;
const showBlocks = showBlocksFunction;
const showNewRequest = showNewRequestFunction;
const showNewJob = showNewJobFunction;
const showNewBam = showNewBamFunction;
const showNewRole = showNewRoleFunction;
const showNewSecurity = showNewSecurityFunction;
const showNewUser = showNewUserFunction;
const showNewBlock = showNewBlockFunction;

export class DialogHandler {
    dialogMode = null;
    requestDialog = null;
    keyToUpdate = null;

    setDialog = async (mode, datas, key) => {
        if (mode == null) {
            const tables = document.getElementsByClassName("table");
            for (let i = 0; i < tables.length; i++) {
                tables[i].innerHTML = "";
            }
            
            const inputs = document.getElementsByClassName("textInput");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = null;
            }

            this.keyToUpdate = null;
            document.getElementById(this.dialogMode + "Dialog").classList.remove('open');
            document.getElementById('loader-circle').style.visibility = 'hidden';
        }
        else {
            var code = mode + "()";
            await eval(code);

            document.getElementById(mode + "Dialog").classList.add('open');           

            for (const key in datas) {
                document.getElementById(key).value = datas[key];
            }

            if (key){
                this.keyToUpdate = key;
            }
        }
        this.dialogMode = mode;
    }
    
    closeDialog = () => { this.setDialog(null) };

    shouldExit = (e) => {
        if (e.key === "Escape") {
            this.closeDialog();
        }
    }

    constructor(actions) {
        document.onkeydown = this.shouldExit;

        actions.forEach(({ dialogId }) => {
            const dialogButton = document.getElementById(dialogId + "Button");
            dialogButton.onclick = () => {
                this.setDialog(dialogId, {}, null);
            }

            const buttons = document.getElementsByClassName("closeDialogButton");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = this.closeDialog;
            }
        });
    }
}