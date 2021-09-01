import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function postNewUser(name, mail, password) {
  return fetch(`http://localhost:3333/registration`, {
    body: JSON.stringify({
      name: name,
      mail: mail,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  }).then((response) => response.json());
}

function Registration(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  function setUserName(event) {
    setName(event.target.value);
  }

  function setLogIn(event) {
    setMail(event.target.value);
  }

  function setUserPassword(event) {
    setPassword(event.target.value);
  }

  function addNewUser() {
    postNewUser(name, mail, password).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        localStorage.setItem("token", data.token);
        history.push("/home");
      }
    });
  }

  return (
    <div className="reg-or-log">
      <p className="texts">Регистрация</p>
      <p className="inputs-titles">Ваше имя:</p>
      <input
        className="inputs"
        type="text"
        placeholder="Введите имя"
        value={name}
        onChange={setUserName}
        required
      />
      <p className="inputs-titles">Ваш e-mail (логин):</p>
      <input
        className="inputs"
        type="text"
        placeholder="Введите e-mail"
        value={mail}
        onChange={setLogIn}
        required
      />
      <p className="inputs-titles">Новый пароль:</p>
      <input
        className="inputs"
        type="password"
        placeholder="Придумайте пароль"
        value={password}
        onChange={setUserPassword}
        required
      />
      <button className="reg-or-log-buttons" onClick={addNewUser}>
        Зарегистрироваться
      </button>
      {error && (
        <p style={{ color: "red" }}>
          Пользователь с такими данными уже зарегистрирован
        </p>
      )}
    </div>
  );
}

export default Registration;
