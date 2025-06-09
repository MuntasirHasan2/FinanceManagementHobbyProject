/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import './Signup.css';
//import { IoBarChartSharp } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import SignupImageSVG from '../../Components/SignupComponent/SignupBackgroundImageSVG/SignupImageSVG';
import SubmitErrorToast from '../../Components/SignupComponent/SubmitErrorToast';
import SubmittingToast from '../../Components/SignupComponent/SubmittingToast';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { writeStorage } from '@rehooks/local-storage';

type loginData = {
    username?: string;
    email: string;
    password: string;
}
type props = {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
}
export default function Signup({isLoggedIn, setIsLoggedIn } : props) {

    const [isSignInActive, setIsSignInActive] = useState(true);


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    async function Login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const submitted_toast = document.getElementById("submitted_toast");
        if (submitted_toast) {
            submitted_toast.classList.add("error-active");

            setTimeout(() => {
                submitted_toast.classList.remove("error-active");
            }, 3000)
        }
        const signup_email_format_error = document.getElementById("email_format_error");
        if (signup_email_format_error) {
            if (!email.includes("@")) {
                signup_email_format_error.classList.add('show');

                const invalid_mail_format_toast = document.getElementById("invalid_mail_format_toast");
                if (invalid_mail_format_toast) {
                    invalid_mail_format_toast.classList.add("error-active");

                    setTimeout(() => {
                        invalid_mail_format_toast.classList.remove("error-active");
                    }, 3000)
                }
                return;


            } else {
                signup_email_format_error.classList.remove('show');

            }
        }
        const url: string = "https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/user/LogInAsync";
        //const url: string = "https://localhost:50530/user/LogInAsync";
        const loginData: loginData = {
            //username: username,
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
            //const data = response.json();
            console.log("Reponse : ", response);
            if (response.ok) {
                const data = await response.json();
                console.log("oka");
                console.log(data);
                const cookies = new Cookies();
                cookies.set('userid', data.id, { path: '/' });
                cookies.set('username', data.username, { path: '/' });
                writeStorage('userid', data.id);
                writeStorage('username', data.username);
                console.log(cookies.get('userid'));
                console.log(cookies.get('username'));
                setIsLoggedIn(!isLoggedIn);
                navigate("/userpage");

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

        if (email == "" || password == "" || username == "") {
            const empty_field_error = document.getElementById("Field_empty_error");
            if (empty_field_error) {
                empty_field_error.classList.add("error-active");

                setTimeout(() => {
                    empty_field_error.classList.remove("error-active");
                }, 3000)
            }
            return;
        }

        const signup_email_format_error = document.getElementById("signup_email_format_error");
        if (signup_email_format_error) {
            if (!email.includes("@")) {
                signup_email_format_error.classList.add('show');

                const invalid_mail_format_toast = document.getElementById("invalid_mail_format_toast");
                if (invalid_mail_format_toast) {
                    invalid_mail_format_toast.classList.add("error-active");

                    setTimeout(() => {
                        invalid_mail_format_toast.classList.remove("error-active");
                    }, 3000)
                }
                return;


            } else {
                signup_email_format_error.classList.remove('show');

            }
        }


        const url: string = "https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/user/CreateAccountAsync";
        // const url: string = "https://localhost:7083/user/CreateAccountAsync";
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //const LoginData : any = {
            //    username: username,
            //    email: email,
            //    password:password
            //}

            const loginData: loginData = {
                username: username,
                email: email,
                password: password,
            }
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
                //body: formData,
            }
            );
            //const data = response.json();

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
                    console.log(data);
                    const cookies = new Cookies();
                    cookies.set('userid', data.id, { path: '/' });
                    cookies.set('username', data.username, { path: '/' });
                    console.log(cookies.get('userid'));
                    console.log(cookies.get('username'));
                    setIsLoggedIn(!isLoggedIn);
                    writeStorage('userid', data.id);
                    writeStorage('username', data.username);
                    navigate("/userpage");
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
                                    <SignupImageSVG/>
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
                                                <label  htmlFor="email">Email</label>
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