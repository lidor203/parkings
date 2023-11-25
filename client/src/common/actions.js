import { Roles } from './roles'
import { DialogMode } from "./modes";
export const actions = [
    { desc: "הבקשות שלי", role: Roles.Visitor, dialogId: DialogMode.REQUESTSBYVISITORID },
    { desc: "המשתמש שלי", role: Roles.Visitor, dialogId: DialogMode.MYUSER },
    { desc: "מגרש החניה שלי", role: Roles.Visitor, dialogId: DialogMode.BLOCKS },
    { desc: "חסימות רכבים", role: Roles.Visitor, dialogId: DialogMode.NEWBLOCK },
    { desc: "בקשה חדשה", role: Roles.Host, dialogId: DialogMode.NEWREQUEST },
    { desc: "הבקשות שלי", role: Roles.Host, dialogId: DialogMode.REQUESTSBYHOSTID },
    { desc: "המשתמש שלי", role: Roles.Host, dialogId: DialogMode.MYUSER },
    { desc: "מגרש החניה שלי", role: Roles.Host, dialogId: DialogMode.BLOCKS },
    { desc: "חסימות רכבים", role: Roles.Host, dialogId: DialogMode.NEWBLOCK },
    { desc: "משתמש חדש", role: Roles.Approver, dialogId: DialogMode.NEWUSER },
    { desc: "משתמשים", role: Roles.Approver, dialogId: DialogMode.USERS },
    { desc: "סטטיסטיקת אורחים", role: Roles.Approver, dialogId: DialogMode.VISITORSTATS },
    { desc: "בקשה חדשה", role: Roles.Approver, dialogId: DialogMode.NEWREQUEST },
    { desc: "הבקשות שלי", role: Roles.Approver, dialogId: DialogMode.REQUESTSBYHOSTID },
    { desc: "המשתמש שלי", role: Roles.Approver, dialogId: DialogMode.MYUSER },
    { desc: "מגרש החניה שלי", role: Roles.Approver, dialogId: DialogMode.BLOCKS },
    { desc: "חסימות רכבים", role: Roles.Approver, dialogId: DialogMode.NEWBLOCK },
    { desc: "כל הבקשות", role: Roles.Security, dialogId: DialogMode.REQUESTS },
    { desc: "הערת אבטחה חדשה", role: Roles.Security, dialogId: DialogMode.NEWSECURITY },
    { desc: "הערות אבטחה", role: Roles.Security, dialogId: DialogMode.SECURITY },
    { desc: "סטטיסטיקת כניסות", role: Roles.Security, dialogId: DialogMode.ENTRANCESTATS },
    { desc: "סטטיסטיקת מארחים", role: Roles.Security, dialogId: DialogMode.HOSTSTATS },
    { desc: "המשתמש שלי", role: Roles.Security, dialogId: DialogMode.MYUSER },
    { desc: "מגרש החניה שלי", role: Roles.Security, dialogId: DialogMode.BLOCKS },
    { desc: "חסימות רכבים", role: Roles.Security, dialogId: DialogMode.NEWBLOCK },
    //    { desc: "סיווגים", role: Roles.Bam, dialogId: DialogMode.BAM },
    //    { desc: "סיווג חדש", role: Roles.Bam, dialogId: DialogMode.NEWBAM }//,

];