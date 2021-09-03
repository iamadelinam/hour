import React from "react";
import Header from "../Components/Header/Header";
import RegistrationPage from "./RegistrationPage";
import LogInPage from "./LogInPage";
import { useHistory } from "react-router-dom";

function FirstPage() {
  const history = useHistory();

  const signIn = () => {
    history.push("/registration");
  };

  const logIn = () => {
    history.push("/login");
  };

  return (
    <div className="page-in-general">
      <Header />
      <div className="greeting">
        <p className="greeting-text-t">
          Для того, чтобы стать профессионалом, в современном мире важно учиться
          и совершенствовать свои знания всю жизнь.
        </p>
        <p className="greeting-text-t">
          Приложение <b> H O U R S </b>, поможет вам следить за прогрессом в
          обучении любому навыку.{" "}
        </p>
        <p className="greeting-text">
          Создайте категорию{" "}
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/747/747310.png"
            alt="кат."
          />{" "}
          (то, чем вы занимаетесь){" "}
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/545/545682.png"
            alt=">"
          />{" "}
          отметьте время{" "}
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/66/66163.png"
            alt="время"
          />{" "}
          которое вы посвятили этому делу{" "}
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/545/545682.png"
            alt=">"
          />{" "}
          посмотрите статистику при клике на иконку{" "}
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/876/876225.png"
            alt="стат"
          />
        </p>
        <p className="greeting-text-t">Давайте начнём!</p>
      </div>
      <p onClick={signIn} className="sign-in">
        Зарегистрироваться
      </p>
      {RegistrationPage}

      <p onClick={logIn} className="log-in">
        Войти
      </p>
      {LogInPage}
    </div>
  );
}

export default FirstPage;
