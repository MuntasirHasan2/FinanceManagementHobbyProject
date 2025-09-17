import { useState } from "react";

type props = {
    sendInputDataLogin: ( email1: string, password1: string) => void,
    sendInputDataSignup: (username1: string, email1: string, password1: string) => void,
};

export default function SignupForm(
    {  sendInputDataLogin, sendInputDataSignup }: props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignInActive, setIsSignInActive] = useState(true);
    function updateInputLogin() {
        sendInputDataLogin(email, password);
    }
    function updateInputSignup() {
        sendInputDataSignup(username, email, password);
    }
    return (
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
                        <button type="button"
                            onClick={updateInputLogin}
                            id="signin-btn">Sign In</button>
                        <div
                            className="login-member"
                            onClick={() => setIsSignInActive(!isSignInActive)}                                        >
                            I don't have an account
                        </div>
                    </div>
                </form>
                <form
                   
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
                        <button type="button"
                            onClick={updateInputSignup}
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
    );
}

