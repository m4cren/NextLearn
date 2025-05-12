"use client";
import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
const Signup = () => {
    const [registerLogin, setRegisterLogin] = useState<string>("register");
    return (
        <main className="h-screen">
            {registerLogin === "register" ? (
                <Register setRegisterLogin={setRegisterLogin} />
            ) : (
                <Login setRegisterLogin={setRegisterLogin} />
            )}
        </main>
    );
};

export default Signup;
