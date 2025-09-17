import './Signup.css';
import { FaSackDollar } from "react-icons/fa6";
import SignupImageSVG from '../../Components/SignupComponent/SignupBackgroundImageSVG/SignupImageSVG';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { writeStorage } from '@rehooks/local-storage';

import type { LoginRequest, LoginResponse, SignupRequest } from '../../types/AuthenticationType';
import * as Verification from "./SignupFunc";
import SignupError from "../../Components/SignupErrors/SignupError";
import SignupForm from "../../Components/SignupComponent/SignupForm/SignupForm";

type props = {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
}
export default function Signup({ isLoggedIn, setIsLoggedIn }: props) {

    const navigate = useNavigate();

    function UpdateInputSignup(username1 : string, email1 : string, password1 :string)
    {
        createAccount(username1, email1, password1);
    }

    function UpdateInputLogin(email1 : string, password1 :string)
    {
        Login(email1, password1);
    }
    function setCookie(data: LoginResponse) 
    {
        const cookies = new Cookies();
        cookies.set('userid', data.UserId, { path: '/' });
        cookies.set('username', data.Username, { path: '/' });
        writeStorage('userid', data.UserId);
        writeStorage('username', data.Username);

        setIsLoggedIn(!isLoggedIn);
        navigate("/userpage");
    }

    async function Login(email : string , password : string) {
        let x : number = 0;
       // event.preventDefault();
       console.log("Email 2 : ", email);
       console.log("Password : ", password);
        if(x == 0)
            return;
        if (!Verification.LogInVerification(email, password)) {
            return;
        }

        //const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/user/LogInAsync";
        const url: string = "https://localhost:50530/user/LogInAsync";
        const loginData: LoginRequest = {
            email: email,
            password: password,
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            }
            );

            if (response.ok) {
                const data: LoginResponse = await response.json();
                if (data.Message == "Incorrect") {
                    const invalid_mail_credential_toast = document.getElementById("invalid_mail_credential");
                    if (invalid_mail_credential_toast) {
                        invalid_mail_credential_toast.classList.add("error-active");

                        setTimeout(() => {
                            invalid_mail_credential_toast.classList.remove("error-active");
                        }, 3000)
                    }
                    return;
                }
                setCookie(data);

            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: unknown) {
            if(error instanceof Error)
                console.log("Error :", error.message);
        }

    }

    async function createAccount(username1 : string, email1 : string, password1 :  string) {

        const submitted_toast = document.getElementById("submitted_toast");
        if (submitted_toast) {
            submitted_toast.classList.add("error-active");

            setTimeout(() => {
                submitted_toast.classList.remove("error-active");
            }, 3000)
        }

        const signup_btn = document.getElementById("signup-btn");
        if (signup_btn) {
            signup_btn.style.pointerEvents = 'none';
            setTimeout(() => {
                signup_btn.style.pointerEvents = 'auto';
            }, 3000)
        }

        if (!Verification.Verification(email1, username1, password1)) {
            return;
        }

        const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/user/CreateAccountAsync";
        // const url: string = "https://localhost:7083/user/CreateAccountAsync";
        try {

            const loginData: SignupRequest = {
                Username: username1,
                Email: email1,
                Password: password1,
            }
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            }
            );

            if (response.ok) {
                const data = await response.json();

                if (data["message"] == "Email already exists") {

                    const mail_exist = document.getElementById("mail_exist");

                    if (mail_exist) {
                        mail_exist.classList.add("error-active");

                        setTimeout(() => {
                            mail_exist.classList.remove("error-active");
                        }, 3000)

                    }
                } else {
                    setCookie(data);
                }
            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }

    }
    return (
        <>
            <div className="signup-container">
                <div className="container">
                    <div
                        className="Errors"
                    >
                        <SignupError/>
                    </div>

                    <div
                        className="form-signup">
                        <div
                            className="panel"
                            style={{ borderRadius: '10px 0 0 10px' }}>
                            <div
                                className="dollar-icon">
                                <FaSackDollar />
                            </div>
                            <div
                                className="panel-content">

                                <div
                                    className="panel-title">
                                    <div className="title-text">

                                        Welcome to Finance Management
                                    </div>
                                </div>
                                <div
                                    className="panel-subtitle">
                                    Manage your expenses with our System
                                </div>
                                <div
                                    className="panel-icon">
                                    <div>
                                        <SignupImageSVG />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="form-content" style={{ borderRadius: '0 10px 10px 0' }}>

                            <SignupForm 
                            sendInputDataLogin = {UpdateInputLogin} 
                            sendInputDataSignup={UpdateInputSignup}/> 

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}