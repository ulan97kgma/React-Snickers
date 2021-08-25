import React from "react";
import { useHistory } from "react-router-dom";
import "./Auth.css";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  handleSignUp,
  passwordError,
  handleLogin,
  hasAccount,
  setHasAccount,
  user,
}) => {
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      await handleLogin();
      history.push("/");
    } catch {
      return alert("Заполните верно формы");
    }
  };

  const handleRegist = async () => {
    try {
      await handleSignUp();
      history.push("/");
    } catch {
      return alert("Заполните верно формы");
    }
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Имя пользователя</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Пароль</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button
                variant="contained"
                color="secondary"
                onClick={handleSignIn}
              >
                Войти
              </button>

              <p>
                Нет учетной записи?
                <button onClick={() => setHasAccount(!hasAccount)}>
                  Зарегистрироваться
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                variant="contained"
                color="secondary"
                onClick={handleRegist}
              >
                Регистрация
              </button>

              <p>
                Уже есть аккаунт?
                <button onClick={() => setHasAccount(!hasAccount)}>
                  Войти
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
