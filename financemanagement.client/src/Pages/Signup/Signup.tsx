import { useState } from "react";
import './Signup.css';
import { FaSackDollar } from "react-icons/fa6";
import SignupImageSVG from '../../Components/SignupComponent/SignupBackgroundImageSVG/SignupImageSVG';
import SubmitErrorToast from '../../Components/SignupComponent/SubmitErrorToast';
import SubmittingToast from '../../Components/SignupComponent/SubmittingToast';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { writeStorage } from '@rehooks/local-storage';

import type { LoginRequest, LoginResponse, SignupRequest } from '../../types/AuthenticationType';
import * as Verification from "./SignupFunc";

type props = {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
}
export default function Signup({ isLoggedIn, setIsLoggedIn }: props) {

    const [isSignInActive, setIsSignInActive] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function setCookie(data: LoginResponse) {
        const cookies = new Cookies();
        cookies.set('userid', data.UserId, { path: '/' });
        cookies.set('username', data.Username, { path: '/' });
        writeStorage('userid', data.UserId);
        writeStorage('username', data.Username);

        setIsLoggedIn(!isLoggedIn);
        navigate("/userpage");
    }

    async function Login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
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
        } catch (error: any) {
            console.log("Error :", error.message);
        }

    }

    async function createAccount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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

        if (!Verification.Verification(email, username, password)) {
            return;
        }

        const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/user/CreateAccountAsync";
        // const url: string = "https://localhost:7083/user/CreateAccountAsync";
        try {

            const loginData: SignupRequest = {
                Username: username,
                Email: email,
                Password: password,
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
                        <div
                            className="Errors-list">

                            <div className="mail-exist" id="submitted_toast">
                                <SubmittingToast />
                            </div>
                            <div className="mail-exist" id="mail_exist">
                                <SubmitErrorToast message={"Email already exists!!!!"} />
                            </div>
                            <div className="mail-exist" id="Field_empty_error">
                                <SubmitErrorToast message={"Fill in all fields"} />
                            </div>
                            <div className="mail-exist" id="invalid_mail_format_toast">
                                <SubmitErrorToast message={"Invalid email format!"} />
                            </div>
                            <div className="mail-exist" id="invalid_mail_credential">
                                <SubmitErrorToast message={"Email and password does not match"} />
                            </div>
                        </div>
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
                                        {/*    <IoBarChartSharp />*/}
                                    </div>

                                </div>

                            </div>
                        </div>



                        <div
                            className="form-content" style={{ borderRadius: '0 10px 10px 0' }}>
                            <div className="form-container" >
                                <div
                                    className="signin-decision">
                                    <div className={isSignInActive ? "active-signin" : ""}
                                        onClick={() => setIsSignInActive(!isSignInActive)}
                                    >
                                        Sign In
                                    </div>
                                    or
                                    <div className={isSignInActive ? "" : "active-signin"}
                                        onClick={() => setIsSignInActive(!isSignInActive)}>
                                        Sign Up
                                    </div>
                                </div>


                                <div
                                    className="form-fields">
                                    <form
                                        method="get" onSubmit={Login}
                                        className={isSignInActive ? "signincontainer active" : "signincontainer"}
                                        id="signin"
                                    >


                                        <div>
                                            <div className="label">
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div>
                                                <input type="text" name="email" value={email} placeholder="Enter your email" autoComplete="false"
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <span className="email_format_error" id="email_format_error">Invalid email</span>
                                        </div>

                                        <div>
                                            <div className="label">
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <input type="password" name="password" value={password} placeholder="Enter your Password" autoComplete="false"
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div
                                            className="signup-loginmember">
                                            <button type="submit" id="signin-btn">Sign In</button>
                                            <div
                                                className="login-member"
                                                onClick={() => setIsSignInActive(!isSignInActive)}                                        >
                                                I don't have an account
                                            </div>
                                        </div>
                                    </form>
                                    <form
                                        method="post" onSubmit={createAccount}
                                        className={isSignInActive ? "signincontainer" : "signincontainer active"}
                                    >
                                        <div>
                                            <div className="label">
                                                <label htmlFor="username">FULL NAME</label>
                                            </div>
                                            <input type="text" name="username" value={username} placeholder="Enter your full name" autoComplete="false"
                                                onChange={(e) => setUsername(e.target.value)} />
                                        </div>

                                        <div>
                                            <div className="label">
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div>
                                                <input type="text" name="email" value={email} placeholder="Enter your email" autoComplete="false"
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>

                                            <span
                                                className="email_format_error"
                                                id="signup_email_format_error">Invalid email format</span>

                                        </div>

                                        <div>
                                            <div className="label">
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <input type="password" name="password" value={password} placeholder="Enter your Password" autoComplete="false"
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div
                                            className="signup-loginmember">
                                            <button type="submit"
                                                id="signup-btn">Sign up</button>
                                            <div
                                                className="login-member"
                                                onClick={() => setIsSignInActive(!isSignInActive)}                                        >
                                                I'm already a member
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>




                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}