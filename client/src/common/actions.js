import { Roles } from './roles'
import { DialogMode } from "./modes";
export const actions = [
    { desc: "הבקשות שלי", role: Roles.Simple, dialogId: DialogMode.REQUESTSBYHOSTID },
    { desc: "כל הבקשות", role: Roles.Security, dialogId: DialogMode.REQUESTS },
    { desc: "בקשה חדשה", role: Roles.Simple, dialogId: DialogMode.NEWREQUEST },
    { desc: "משתמשים", role: Roles.Approver, dialogId: DialogMode.USERS },
    { desc: "משתמש חדש", role: Roles.Approver, dialogId: DialogMode.NEWUSER },
//    { desc: "תפקידים", role: Roles.Roles, dialogId: DialogMode.ROLES },
//    { desc: "תפקיד חדש", role: Roles.Roles, dialogId: DialogMode.NEWROLE },
//    { desc: "בעלי תפקידים", role: Roles.Security, dialogId: DialogMode.JOBS },
//    { desc: "בעל תפקיד חדש", role: Roles.Security, dialogId: DialogMode.NEWJOB },
    { desc: "סיווגים", role: Roles.Bam, dialogId: DialogMode.BAM },
    { desc: "סיווג חדש", role: Roles.Bam, dialogId: DialogMode.NEWBAM },
    { desc: "הערות אבטחה", role: Roles.Security, dialogId: DialogMode.SECURITY },
    { desc: "הערת אבטחה חדשה", role: Roles.Security, dialogId: DialogMode.NEWSECURITY },
    { desc: "מגרש החניה שלי", role: Roles.Visitor, dialogId: DialogMode.BLOCKS },
    { desc: "חסימות רכבים", role: Roles.Visitor, dialogId: DialogMode.NEWBLOCK },
];