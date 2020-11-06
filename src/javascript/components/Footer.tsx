import * as React from "react";
import { RouteComponentProps } from "@reach/router";

const Footer = (props: RouteComponentProps) => (
<footer class="navbar">
    <div class="container d-flex justify-content-between">
            <div>
                <a class="navbar-brand inverse-colors d-flex align-items-center" href="#">
                    <img src="/images/logo-white.svg" alt="" loading="lazy"/>
                    <div>
                        <span>derive</span><span>alpha</span>
                    </div>
                </a>
            </div>
    </div>
    <div class="container copyright-text d-flex justify-content-between">
                <div class=""> 
                    <p class="text-sm-left"><i class="fa fa-copyright"></i> 2020 Derive Alpha. All Rights Reserved.</p>
                </div>
                <div class=""> 
                    <p class="text-sm-right">
                    <span>Designed &amp; developed by</span> <a href="#">abidcorp</a>
                    </p>
                </div>
    </div>
</footer>
);

export default Footer;
