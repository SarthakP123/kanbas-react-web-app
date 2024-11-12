import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="p-3" style={{ width: "200px", backgroundColor: "#f8f9fa" }}>
        <AccountNavigation />
      </div>

      <div className="flex-grow-1 p-3">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />}
          />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
