import './Navbar.css';
import { Link, useLocation, useNavigate } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
type props = {
    isDark: boolean;
    updateDarkMode: Function;
    isLoggedIn: boolean;
}

export default function Navbar({ isDark, updateDarkMode,isLoggedIn }: props) {
    const location = useLocation();
    const navigate = useNavigate();
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
        const cookies = new Cookies();
        const userId = cookies.get('userid')
        const temp_username = cookies.get('username');
        console.log("user id ", userId);
        if (userId != undefined) {
            setIsSignIn(true);
            setUsername(temp_username.toString());
        } else {
            setIsSignIn(false);
            setUsername("");
        }
        
    }

    function Signout() {
        const cookies = new Cookies();
        cookies.remove('userid');
        cookies.remove('username');
        checkIfLogIn();
       
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
                          <Link className={location.pathname == "/demo" ? "active-link" : ""}
                              to="/demo">Guest Demo</Link>
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

