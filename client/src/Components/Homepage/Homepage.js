import React from "react";
import { useHistory } from "react-router";
import LandingPageSVG from "../../Assets/LandingPageSVG";

const Homepage = () => {
    const history = useHistory();
    return (
        <div className="container p-3 p-sm-5 my-5 page">
            <div className="row gap-5">
                <div className="col-sm mx-auto my-sm-auto w-75">
                    <LandingPageSVG />
                </div>
                <div className="col-sm d-flex flex-column justify-content-between align-self-stretch">
                    {/* <div className=""> */}
                        <div>
                            <h1 className="display-1" style={{fontWeight: 800}}>Make Habits on the go</h1>
                            <a rel="noreferrer" href="https://www.producthunt.com/posts/tracker?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tracker" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349488&theme=dark" alt="Tracker - Simple&#0032;tracker&#0032;for&#0032;your&#0032;habits&#0044;&#0032;exercises&#0032;and&#0032;tasks&#0046; | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" /></a>
                        </div>
                        <button className="btn align-self-start normalbtn fs-4 fs-sm-3 my-3" onClick={() =>  history.push('/register')}>Get Started</button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
};


export default Homepage;