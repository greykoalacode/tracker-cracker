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
                        <h1 className="display-1" style={{fontWeight: 800}}>Make Habits on the go</h1>
                        <button className="btn align-self-start normalbtn fs-4 fs-sm-3 my-3" onClick={() =>  history.push('/register')}>Get Started</button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
};


export default Homepage;