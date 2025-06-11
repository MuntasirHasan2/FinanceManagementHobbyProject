
import './Navbar.css';
import { Link, useLocation, useNavigate } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';

type props = {
    isDark: boolean;
    updateDarkMode: (value: boolean) => void;
    isLoggedIn: boolean;
}

export default function Navbar({ isDark, updateDarkMode,isLoggedIn }: props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [local_username] = useLocalStorage('username');
    useEffect(() => {
        checkIfLogIn();
    }, [])
    useEffect(() => {
        checkIfLogIn();
    }, [isLoggedIn])
    const [isSignIn, setIsSignIn] = useState(false);
    const [username, setUsername] = useState("");
    function changeTheme() {
        updateDarkMode(!isDark);
    }
    function checkIfLogIn() {

        console.log("local username", local_username);
        if (local_username != undefined) {
            setIsSignIn(true);
            if (local_username) {

            setUsername(local_username.toString());
            }
        } else {
            setIsSignIn(false);
            setUsername("");
        }
        
    }

    function Signout() {

        deleteFromStorage('username');
        deleteFromStorage('userid');
        setIsSignIn(false);
        navigate("/");
    }
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
      <>
          <div className="nav-container">
              <div className="nav-items">
                  <div className="nav-logo">Finance Management</div>
                  <div className="nav-links">
                      <div>
                          <Link className={location.pathname == "/" ? "active-link" : ""}
                              to="/">Home</Link>
                      </div>
                      <div>
                          <span className={isSignIn ? "hidden" : ""}>
                          <Link className={location.pathname == "/demo" ? "active-link" : ""}
                                  to="/demo">Guest Demo</Link>
                          </span>
                          <span className={isSignIn ? "" : "hidden"}>
                              <Link className={location.pathname == "userpage" ? "active-link" : ""}
                                  to="/userpage">Welcome {username }</Link>
                              
                          </span>
                      </div>
                      <div>
                          <span className={isSignIn ? "hidden":"" }>
                              <Link className={location.pathname == "/signin" ? "active-link" : ""}
                                  to="/signin">Sign In</Link>
                          </span>
                          <span className={isSignIn ? "" : "hidden"}
                              onClick={Signout }>
                            Sign Out
                          </span>
                      </div>
                      <div onClick={changeTheme} className="dark-mode-icon">
                          <span className={isDark ? "hidden" : ""}><IoMdMoon /></span>
                          <span className={isDark ? "" : "hidden"} style={{ color: 'yellow' }}><IoMdSunny /></span>
                      </div>
                  </div>
              </div>
              
              <div className="mobile-view">
                  <div className="icon-hamburger" onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}> <RxHamburgerMenu /></div>
                  <div className={isMobileMenuActive ? "nav-links-mobile" :"hidden-menu-mobile"}>
                      <div>
                          <Link className={location.pathname == "/" ? "active-link" : ""}
                              to="/">Home</Link>
                      </div>
                      <div>
                          <span className={isSignIn ? "hidden" : ""}>
                              <Link className={location.pathname == "/demo" ? "active-link" : ""}
                                  to="/demo">Guest Demo</Link>
                          </span>
                          <span className={isSignIn ? "" : "hidden"}>
                              <Link className={location.pathname == "userpage" ? "active-link" : ""}
                                  to="/userpage">Welcome {username}</Link>

                          </span>
                      </div>
                      <div>
                          <Link className={location.pathname == "/signin" ? "active-link" : ""}
                              to="/signin">Sign In</Link>
                      </div>
                      <div onClick={changeTheme} className="dark-mode-icon">
                          <span className={isDark ? "hidden" : ""} ><IoMdMoon /></span>
                          <span className={isDark ? "" : "hidden"} style={{ color: 'yellow' }}><IoMdSunny /></span>
                      </div>
                  </div>
                 
              </div>
          </div>
      </>
  );
}

