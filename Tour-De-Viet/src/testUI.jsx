import React, { Fragment } from "react";
import LoginPopUp from "./headerComponent/LoginPopUp";

export default function TestUI() {
    return (
        <Fragment>
            <div className="bg w-screen h-screen">
            <LoginPopUp/>
            </div>
        </Fragment>
    )
}