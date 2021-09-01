import React from "react";
import Registration from "../Components/Registration";
import Header from "../Components/Header/Header";

function RegistrationPage() {
  return (
    <>
      <Header />
      <div className="page-in-general">
        <Registration />
      </div>
    </>
  );
}

export default RegistrationPage;
