import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, login } from "../api/auth";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (data) => {
    await login(data);
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="loginId_register">ログインID</label>
        <input
          id="loginId_register"
          type="text"
          {...register("loginId", { required: true })}
        />
        <p> {errors.loginId && "文字が入力されていません"}</p>
        <label htmlFor="password_register">パスワード</label>
        <input
          id="password_register"
          type="password"
          {...register("password", { required: true })}
        />
        <p> {errors.password && "文字が入力されていません"}</p>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};
