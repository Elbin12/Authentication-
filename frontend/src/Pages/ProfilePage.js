import React, { Fragment } from "react";
import Profile from "../Components/Profile/profile";
import Navbar from "../Components/Navbar/Navbar";

function ProfilePage(){
    return (
        <Fragment>
            <Navbar />  
            <Profile/>
        </Fragment>
    )
}

export default ProfilePage