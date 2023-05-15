import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IAuth } from "../interfaces";
import { useAppDispatch } from "../hooks";
import { authActions } from "../redux";
import React from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IAuth>();

  const login: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login(user));
    //Внутри функции вызваем  dispatch и передаем в него asynkThank login с данными пользователя в аккаунт которого хоти войти.
    //Далее после отправки запросса на авторизацию. Создаем логику если запрос был успешен то в  ответ веренться requestStatus
    // "fulfilled", если зпрос не рузультативный то вернеться "rejected"
    //Из самого dispatch используем meta и из нее можно вытянуть requestStatus (с результатом запроса)
    if (requestStatus === "fulfilled") {
      navigate("/cars");
      //ЕСли запрос был успешен то делаем навигацию на страницу с Cars
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <input
        type="text"
        placeholder={"username"}
        {...register("username", { required: true })}
      />
      <input
        type="text"
        placeholder={"password"}
        {...register("password", { required: true })}
      />
      <button disabled={!isValid}>Login</button>
    </form>
  );
};

export { LoginForm };
