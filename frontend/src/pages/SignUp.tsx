import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp, User } from "../api/auth";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (data) => {
    await signUp(data);
    navigate("/dashboard");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
        />
        <p> {errors.name && "文字が入力されていません"}</p>
        <label htmlFor="loginId_register">Eメール</label>
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
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};
