import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User, login } from "../api/auth";

const StyledLoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  background-color: var(--pale-background-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 18px;
  justify-content: center;
  position: relative;
`;

const StyledForm = styled.form`
  align-items: center;
  align-self: stretch;
  background-color: #fff;
  border: 0.2px solid;
  border-color: #000;
  border-radius: 5px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 22px;
  justify-content: center;
  padding: 30px 25px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 400px;

  & h2 {
    align-self: stretch;
    color: #000;
    font-size: 1.2rem;
    position: relative;
    margin: 10px 0 0;
  }

  & a {
    color: var(--link-color);
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

const StyledInputBox = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 9px;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  flex: 0 0 auto;
  width: 100%;

  & label {
    align-self: stretch;
    color: #000;
    position: relative;
  }

  & input {
    align-self: stretch;
    background-color: #fff;
    border: 0.5px solid;
    border-color: #000;
    border-radius: 7px;
    height: 28px;
    position: relative;
    width: 100%;
    padding: 0 12px;
  }
`;

const StyledLoginButton = styled.button`
  align-items: center;
  background-color: var(--button-default-color);
  border: 0;
  border-radius: 26px;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  padding: 8px 23px;
  position: relative;
  font-size: 1.2rem;
  color: #000;
  white-space: nowrap;
`;

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
    <StyledLoginContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>ATRS アトラス ログイン画面</h2>
        <StyledInputBox>
          <StyledInput>
            <label htmlFor="loginId_register">ログインID</label>
            <input
              id="loginId_register"
              type="text"
              {...register("loginId", { required: true })}
            />
            <p> {errors.loginId && "文字が入力されていません"}</p>
          </StyledInput>
          <StyledInput>
            <label htmlFor="password_register">パスワード</label>
            <input
              id="password_register"
              type="password"
              {...register("password", { required: true })}
            />
            <p> {errors.password && "文字が入力されていません"}</p>
          </StyledInput>
        </StyledInputBox>
        <StyledLoginButton type="submit">ログイン</StyledLoginButton>
        <a href="">パスワードをお忘れの方</a>
      </StyledForm>
    </StyledLoginContainer>
  );
};
