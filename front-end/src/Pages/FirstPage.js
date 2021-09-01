import React from "react";
import Header from "../Components/Header/Header";
import RegistrationPage from "./RegistrationPage";
import LogInPage from "./LogInPage";
import { Link } from "react-router-dom";
function FirstPage() {
  return (
    <div className="page-in-general">
      <Header />
      <p className="greeting">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ratione
        consequatur, saepe soluta, modi beatae labore quasi necessitatibus
        eligendi ad quo officiis aspernatur eveniet unde repudiandae laborum
        exercitationem impedit! Voluptate.
      </p>
      <Link to="/registration">
        <p className="">Зарегистрироваться</p>
        {RegistrationPage}
      </Link>
      <Link to="/login">
        <p className="">Войти</p>
        {LogInPage}
      </Link>
    </div>
  );
}

export default FirstPage;
