import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, login } from "../api/index";

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
        <label htmlFor="email_register">Eメール</label>
        <input
          id="email_register"
          type="email"
          {...register("mail", { required: true })}
        />
        <p> {errors.mail && "文字が入力されていません"}</p>
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
