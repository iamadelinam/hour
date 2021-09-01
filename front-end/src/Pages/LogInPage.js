import React from "react";
import LogingIn from "../Components/LogingIn";
import Header from "../Components/Header/Header";

function LogInPage() {
  return (
    <>
      <Header />
      <div className="page-in-general">
        <LogingIn />
      </div>
    </>
  );
}

export default LogInPage;
