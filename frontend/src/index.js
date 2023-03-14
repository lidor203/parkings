import { ScreenMode } from "./common/modes";
import { LoginFunctionality } from './login/login';
import { Profile } from "./profile/profile";

const loginFunctionality = new LoginFunctionality();

let profile = null;
global.userID = null;
global.userName = null;
global.userCarNumber = null;
global.userPhone = null;
global.userRole = null;
global.userKey = null;
global.dialogHandler = null;

let currScreen = ScreenMode.LOGIN;
const screens = {
    login: document.getElementById("login"),
    register: document.getElementById("register"),
    profile: document.getElementById("profile")
}

const toggleScreens = () => {
    Object.entries(screens).forEach(screen => {
        screen[1].style.display = "none"
    })
    screens[currScreen].style.display = "inherit"
}

toggleScreens()

const gotoScreen = (screen) => {
    currScreen = screen;
    toggleScreens()
}

const gotoRegister = () => {
    gotoScreen(ScreenMode.REGISTER);
}

const gotoLogin = () => {
    gotoScreen(ScreenMode.LOGIN);
}

const login = () => {
    loginFunctionality.login((user) => {
        profile = new Profile(user);
        gotoScreen(ScreenMode.PROFILE);
    }, 
        () => { alert("שם המשתמש או הסיסמא אינם נכונים"); })
}

const register = () => {
    loginFunctionality.register((user) => {
        profile = new Profile(user);
        gotoScreen(ScreenMode.PROFILE);
    },
        () => { alert("כבר קיים משתמש בעל אותו תז/מא"); })
}

document.getElementById("loginButton").onclick = login;
document.getElementById("toLoginButton").onclick = gotoLogin;
document.getElementById("registerButton").onclick = register;
document.getElementById("toRegisterButton").onclick = gotoRegister;