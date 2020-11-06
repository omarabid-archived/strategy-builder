import * as React from "react";
import { Link } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const Header = (props: RouteComponentProps) => (
<header className="navbar">
    <div className="container justify-content-between">
        <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/images/logo.svg" alt="" loading="lazy"/>
            <div>
                <span>derive</span><span>alpha</span>
            </div>
        </Link>

        <div className="menu-toggle">
            <input type="checkbox" id="css-toggle" />
            <div className="bars toggle-open">
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <span className="toggle-open">menu</span>
            <div className="bars toggle-close">
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <span className="toggle-close">close</span>
            <div className="submenu-toggle">

                <nav id="full-dropdown" className="submenu collapse">

                    <div className="container justify-content-between">
                        <Link className="navbar-brand inverse-colors d-flex align-items-center" to="/">
                            <img src="/images/logo-white.svg" alt="" loading="lazy"/>
                            <div>
                                <span>derive</span><span>alpha</span>
                            </div>
                        </Link>
                    </div>

                    <div className="container justify-content-end align-items-start header-menu">

                        <div className="menu-item">

                            <a href="#">Tools</a>
                            <ul className="sub-menu">
                                <li className="menu-item"><a href="#dfd">Strategy Builder</a></li>
                                <li className="menu-item"><a href="#dfdd">Options Value</a></li>
                            </ul>

                        </div>

                        <div className="menu-item">

                            <a href="#">About</a>
                            <ul className="sub-menu">
                                <li className="menu-item"><Link to="/about">About</Link></li>
                                <li className="menu-item"><Link to="/terms-of-service">Terms of Service</Link></li>
                                <li className="menu-item"><Link to="/privacy-policy">Privacy Policy</Link></li>
                            </ul>

                        </div>

                    </div>

                </nav>

            </div>
        </div>
    </div>
</header>
);

export default Header;
