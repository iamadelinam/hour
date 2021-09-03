import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HOST from "../api";

function putUser(login, password) {
  return fetch(`${HOST}/login`, {
    body: JSON.stringify({
      mail: login,
      password: password,
    }),
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
}

function LogingIn() {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  function logIn(event) {
    setLogin(event.target.value);
  }

  function enterPassword(event) {
    setPassword(event.target.value);
  }

  function logInUser() {
    setError(undefined);
    putUser(login, password).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("token", data.token);
        history.push("/home");
      }
    });
  }

  return (
    <div className="reg-or-log">
      <p className="texts">Авторизитроваться</p>
      <input
        className="inputs"
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={logIn}
        required
      />
      <input
        className="inputs"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={enterPassword}
        required
      />
      <button className="reg-or-log-buttons" onClick={logInUser}>
        Войти
      </button>
      {error && <p style={{ color: "red" }}>Неверный логин или пароль</p>}
    </div>
  );
}

export default LogingIn;
