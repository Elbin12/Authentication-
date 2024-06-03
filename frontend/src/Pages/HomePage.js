import React, { Fragment } from "react";
import Home from "../Components/Home/Home";
import Navbar from "../Components/Navbar/Navbar";

function HomePage(){
    return (
        <Fragment>
            <Navbar />
            <Home />
        </Fragment>
    )
}

export default HomePage